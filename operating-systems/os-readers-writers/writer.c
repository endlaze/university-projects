
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

// Globals
int sleep_time, writing_time = 0;
ProgInfo *prog_info;
SharedMessage *shared_messages;
ThreadStruct *threads;
sem_t *rw_mutex;
sem_t write_mutex;


// Function prototypes
void init_writers(int writers_num);

int main(int argc, char *argv[])
{
    if (argc < 4)
    {
        printf("[-] Error: Too few arguments, READERS_NUM, SLEEP_TIME, WRITING_TIME are mandatory.\n");
        exit(1);
    };

    int writers_num = atoi(argv[1]);
    sleep_time = atoi(argv[2]);
    writing_time = atoi(argv[3]);

    if (writers_num < 1 || sleep_time < 1 || writing_time < 1)
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

    // Get address of the common program info.
    char *pgi_block = attach_shm_block(PGI_FILENAME, sizeof(ProgInfo));
    prog_info = (ProgInfo *)((void *)pgi_block);

    // Init the semaphore for the readers.
    sem_init(&write_mutex, 0, 1);

    // Get the address of the shared memory block
    char *msgs_block = attach_shm_block(SHM_FILENAME, sizeof(SharedMessage) * prog_info->total_lines);
    shared_messages = (SharedMessage *)((void *)msgs_block);

    char *th = attach_shm_block(THR_FILENAME, sizeof(ThreadStruct) * 20);
    threads = (ThreadStruct *) ((void *) th);
    

    printf("[+] Starting writers...\n\n");
    init_writers(writers_num);

    return 0;
};

// Function to build the message's writing time.
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

void *writer_th(void *args)
{
    int msg_count = 0;
    int threadIndex = 0;

    sem_wait(&write_mutex);

    threadIndex = insert_new_thread(pthread_self(), WRITER);

    sem_post(&write_mutex);
    
    while (prog_info->simulation_active)
    {
        change_thread_status(threadIndex, BLOCKED);
        // Gets the read/write mutex.
        prog_info->waiting_threads = 1;
        if (sem_wait(rw_mutex) == -1)
        {
            perror("[-] Error: Can't enter to the critical section.");
            exit(1);
        };

        change_thread_status(threadIndex, ACTIVE);

        // Fetches the next empty line
        while ((shared_messages[msg_count].isWritten == 1) && (msg_count < prog_info->total_lines))
        {
            msg_count += 1;
        };

        // Resets the counter if the previous message was the last one in the file.
        if (msg_count == prog_info->total_lines)
        {
            msg_count = 0;
        };

        // Writes the line if it's empty.
        if (shared_messages[msg_count].isWritten == 0)
        {

            sleep(writing_time);

            // Stores the writer thread.
            shared_messages[msg_count].writer = pthread_self();

            // Stores the current time
            char *current_time = build_time();
            strcpy(shared_messages[msg_count].time, current_time);

            // Indicates that the line has been written.
            shared_messages[msg_count].isWritten = 1;

            // Prints the message on console.
            printf("\nWRITER_ID\tLINE\tDATE\t\tTIME\n");
            printf("%d\t%d\t%s\n", shared_messages[msg_count].writer, msg_count, shared_messages[msg_count].time);


            //Writes the message to a file
            char log_msg[100];
            snprintf(log_msg, 100, "WRITER\t%d\t%d\t%s\n", shared_messages[msg_count].writer, msg_count, shared_messages[msg_count].time);
            logger (log_msg);
        };

        prog_info->max_sr_reached = 0;
        prog_info->last_thread_type = WRITER;
        prog_info->waiting_threads = 0;

        // Releases the read/write mutex
        if (sem_post(rw_mutex) == -1)
        {
            perror("sem_post: mutex_sem");
            exit(1);
        };

        change_thread_status(threadIndex, ASLEEP);
        // Sleeps after writing a line.
        srand(time(NULL));
        sleep(sleep_time + (rand() % 8));
    };

    pthread_exit(NULL);
};

void init_writers(int writers_num)
{
    for (size_t i = 0; i < writers_num; i++)
    {
        pthread_t proc_thread;

        if (pthread_create(&proc_thread, NULL, writer_th, NULL) == ERROR_STATUS)
        {
            printf("Error: Could not create the writer thread\n");
            exit(1);
        };
    };

    pthread_exit(NULL);
};