#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>

#include "shared_mem.h"

// Function to get/create a shared memory block.
static int get_shm_block(char *filename, int block_size)
{
    key_t mem_key;

    /* 
        - Gets a key that is linked to a given filename.
        - The key is used by the programs to access the
        shared memory.
    */

    mem_key = ftok(filename, 0);

    if (mem_key == ERROR_STATUS)
    {
        return ERROR_STATUS;
    };

    /*
        - Gets the shared memory block.
        - Creates it if not exists.
    */

    return shmget(mem_key, block_size, 0644 | IPC_CREAT);
};

// Attaches the memory block to the process's memory.
char *attach_shm_block(char *filename, int block_size)
{
    // Gets the id of the shared memory block.
    int sh_block_id = get_shm_block(filename, block_size);

    if (sh_block_id == ERROR_STATUS)
    {
        printf("[-] Couldn't get the shared memory block.\n");
        exit(1);
    };

    // Maps the shared memory block into the processe's memory.
    char *block = shmat(sh_block_id, NULL, 0);

    if (block == (char *)ERROR_STATUS)
    {
        printf("[-] Couldn't map the shared memory block into the process's memory\n");
        exit(1);
    };

    return block;
};

// Detaches the shared memory block from the process's memory.
int detach_shm_block(char *block)
{
    int detached_block = shmdt(block);
    return detached_block;
};

// Destroys the shared memory block.
int destroy_shm_block(char *filename)
{
    // Gets the id of the shared memory block.
    int sh_block_id = get_shm_block(filename, 0);

    if (sh_block_id == ERROR_STATUS)
    {
        printf("[-] Couldn't get the shared memory block.\n");
        exit(1);
    };

    return shmctl(sh_block_id, IPC_RMID, NULL);
};