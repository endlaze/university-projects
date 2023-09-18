// Imports
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <fcntl.h>
#include <semaphore.h>
#include <unistd.h>

#include "shared_mem.h"
#include "shared_sem.h"

// Function Prototypes
void init_semaphores();
void init_shm(int shm_lines);

int main(int argc, char *argv[])
{
    if (argc < 2)
    {
        printf("[-] Error: Too few arguments, SHM_LINES is mandatory.\n");
        exit(1);
    };

    int shm_lines = atoi(argv[1]);

    if (shm_lines < 1)
    {
        printf("[-] Error: Argument SHM_LINES must be a positive integer.\n");
        exit(1);
    };

    // Initialize shared semaphores.
    init_semaphores();

    // Initialize shared memory.
    init_shm(shm_lines);

    printf("[+] The Semaphores and Shared Memory Block were created successfully.\n");
    return 0;
};

// Semaphores initializer
void init_semaphores()
{
    sem_t *rw_sem = sem_open(RW_SEM, O_CREAT, SEM_PERMISSIONS, 1);
};

// Shared memory initializer.
void init_shm(int shm_lines)
{
    char *msgs_block = attach_shm_block(SHM_FILENAME, sizeof(SharedMessage) * shm_lines);
    SharedMessage *msgs = (SharedMessage *)((void *)msgs_block);

    for (size_t index = 0; index < shm_lines; index++)
    {
        msgs[index].isWritten = 0;
        msgs[index].writer = 0;
    };

    char *pgi_block = attach_shm_block(PGI_FILENAME, sizeof(ProgInfo));

    ProgInfo *pgi = (ProgInfo *)((void *)pgi_block);
    pgi->simulation_active = 1;
    pgi->total_lines = shm_lines;

    char *th = attach_shm_block(THR_FILENAME, sizeof(ThreadStruct) * 20);
    ThreadStruct *threads = (ThreadStruct *) ((void *) th);

    for (int i = 0; i < 20; i++)
    {
        threads[i].status = 0;
        threads[i].type = 0;
        threads[i].thread_id = 0;
    }

    int detached_shm = detach_shm_block(SHM_FILENAME);
    int detached_pgi = detach_shm_block(PGI_FILENAME);
    int detached_threads = detach_shm_block(THR_FILENAME);
};