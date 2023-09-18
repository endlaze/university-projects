
// Imports
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>
#include <time.h>
#include <semaphore.h>
#include "shared_mem.h"
#include "shared_sem.h"
#include <fcntl.h>
#include <time.h>
#include "thread_status.h"
#include "logger.h"

int sleep_time, reading_time = 0;
ProgInfo *prog_info;
SharedMessage *shared_messages;
ThreadStruct *threads;
sem_t *rw_mutex;
sem_t sread_mutex;
sem_t crit_mutex;
int max_readers_reached = 0;
int crit_readers = 0;

void init_readers(int readers_num);

int main(int argc, char *argv[])
{
    if (argc < 4)
    {
        printf("[-] Error: Too few arguments, READERS_NUM, SLEEP_TIME, READING_TIME are mandatory.\n");
        exit(1);
    };

    int readers_num = atoi(argv[1]);
    sleep_time = atoi(argv[2]);
    reading_time = atoi(argv[3]);

    if (readers_num < 1 || sleep_time < 1 || reading_time < 1)
    {
        printf("[-] Error: Arguments must be positive integers.\n");
        exit(1);
    };

    // Get address of the common semaphore.
    if ((rw_mutex = sem_open(RW_SEM, 0)) == SEM_FAILED)
    {
        perror("sem_open");
        exit(1);
    };

    // Init the semaphore for the readers.
    sem_init(&sread_mutex, 0, 1);

    // Get address of the common program info.
    char *pgi_block = attach_shm_block(PGI_FILENAME, sizeof(ProgInfo));
    prog_info = (ProgInfo *)((void *)pgi_block);

    // Get the address of the shared memory block
    char *msgs_block = attach_shm_block(SHM_FILENAME, sizeof(SharedMessage) * prog_info->total_lines);
    shared_messages = (SharedMessage *)((void *)msgs_block);

    char *th = attach_shm_block(THR_FILENAME, sizeof(ThreadStruct) * 20);
    threads = (ThreadStruct *) ((void *) th);

    printf("[+] Starting readers...\n\n");
    init_readers(readers_num);

    return 0;
};

char *build_time()
{
    time_t timer;
    char *time_buffer = malloc(26);
    struct tm *tm_info;

    timer = time(NULL);
    tm_info = localtime(&timer);

    strftime(time_buffer, 26, "%Y-%m-%d\t%H:%M:%S", tm_info);

    return (char *)time_buffer;
};

void *reader_th(void *args)
{
    int threadIndex = 0;
    int sr_count = 1;

    sem_wait(&sread_mutex);

    threadIndex = insert_new_thread(pthread_self(), SELFISH_READER);

    sem_post(&sread_mutex);

    while (prog_info->simulation_active)
    {
        change_thread_status(threadIndex, BLOCKED);

        sem_wait(rw_mutex);

        if(prog_info->max_sr_reached) {
          sem_post(rw_mutex);
        }

        change_thread_status(threadIndex, ACTIVE);

        srand(time(NULL));
        int msg_count = rand() % prog_info->total_lines;
        // Checks if the memory was written to print the message.
        if (shared_messages[msg_count].isWritten == 1 && max_readers_reached == 0)
        {
            sleep(reading_time);
            const int th_self = (int)pthread_self();

            printf("\nSELFISH_READER_ID\tLINE\tMESSAGE\n");
            printf("%d\t%d\t%d\t%s\n", th_self, msg_count, shared_messages[msg_count].writer, shared_messages[msg_count].time);

            //Writes the message to a file
            char log_msg[100];
            snprintf(log_msg, 100, "SELFISH_READER\t%d\t%d\t%d\t%s\n", th_self, msg_count, shared_messages[msg_count].writer, shared_messages[msg_count].time);
            logger (log_msg);

            shared_messages[msg_count].writer = -1;
            strcpy(shared_messages[msg_count].time , "");
            shared_messages[msg_count].isWritten = 0;
        };

        if (prog_info->last_thread_type == SELFISH_READER) {
          sr_count++;
        }
        else
        {
          sr_count = 1;
        }
        
        prog_info->last_thread_type = SELFISH_READER;

        if(sr_count > 3 && prog_info->waiting_threads) {
          prog_info->max_sr_reached = 1;
        }

        sem_post(rw_mutex);
        change_thread_status(threadIndex, ASLEEP);

        // Sleeps after reading a line.
        srand(time(NULL));
        sleep(sleep_time + (rand() % 8));
    };

    pthread_exit(NULL);
};

void init_readers(int readers_num)
{
    for (size_t i = 0; i < readers_num; i++)
    {
        pthread_t proc_thread;

        if (pthread_create(&proc_thread, NULL, reader_th, NULL) == ERROR_STATUS)
        {
            printf("[-] Error: Could not create the reader thread\n");
            exit(1);
        };
    };

    pthread_exit(NULL);
};