#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include "shared_mem.h"
#include "thread_status.h"

ProgInfo *prog_info;
SharedMessage *shared_messages;
ThreadStruct *threads;

void print_single(int thread_type, int status, int i);
void print_group_by_status(int thread_type);
void print_all();
void print_by_type(int thread_type);
void print_lines();

char *STATUSES[] = {"ACTIVE", "BLOCKED", "ASLEEP"};
char *TYPES[] = {"READER", "WRITER", "SELFISH WRITER"};

void main()
{

    // Get address of the common program info.
    char *pgi_block = attach_shm_block(PGI_FILENAME, sizeof(ProgInfo));
    prog_info = (ProgInfo *)((void *)pgi_block);

    // Get the address of the shared memory block
    char *msgs_block = attach_shm_block(SHM_FILENAME, sizeof(SharedMessage) * prog_info->total_lines);
    shared_messages = (SharedMessage *)((void *)msgs_block);

    char *th = attach_shm_block(THR_FILENAME, sizeof(ThreadStruct) * 20);
    threads = (ThreadStruct *)((void *)th);
    int option = 1;

    while (option)
    {
        printf("1 - Writers status\n2 - Readers status\n3 - Selfish readers status\n4 - General status\n0 - Quit\n");
        scanf("%d", &option);
        switch (option)
        {
        case 1:
            print_group_by_status(WRITER);
            break;
        case 2:
            print_group_by_status(READER);
            break;
        case 3:
            print_group_by_status(SELFISH_READER);
            break;
        case 4:
            print_lines();
            print_all();
            break;

        default:
            break;
        }
    }

    int detached_threads = detach_shm_block(THR_FILENAME);
}

void print_group_by_status(int thread_type)
{
    for (int i = 0; i < 20; i++)
    {
        print_single(thread_type, ACTIVE, i);
    }
    for (int i = 0; i < 20; i++)
    {
        print_single(thread_type, BLOCKED, i);
    }
    for (int i = 0; i < 20; i++)
    {
        print_single(thread_type, ASLEEP, i);
    }
}

void print_single(int thread_type, int status, int i)
{
    if (threads[i].thread_id != 0 && threads[i].status == status && threads[i].type == thread_type)
    {
        printf("PROCESS_ID\tPROCESS_STATUS\tPROCESS_TYPE\n");
        printf("%d\t%s\t\t%s\n\n", threads[i].thread_id, STATUSES[threads[i].status], TYPES[threads[i].type]);
    }
}

void print_all()
{
    for (int i = 0; i < 20; i++)
    {
        if (threads[i].thread_id != 0) {
            printf("PROCESS_ID\tPROCESS_STATUS\tPROCESS_TYPE\n");
            printf("%d\t%s\t\t%s\n\n", threads[i].thread_id, STATUSES[threads[i].status], TYPES[threads[i].type]);
        }
        
    }
}

void print_by_type(int thread_type)
{
    for (int i = 0; i < 20; i++)
    {
        if (threads[i].thread_id != 0 && threads[i].type == thread_type)
        {
            printf("PROCESS_ID\tPROCESS_STATUS\tPROCESS_TYPE\n");
            printf("%d\t%s\t\t%s\n\n", threads[i].thread_id, STATUSES[threads[i].status], TYPES[threads[i].type]);
        }
    }
}

void print_lines() {
    for (size_t i = 0; i < prog_info->total_lines; i++)
    {
        if (shared_messages[i].isWritten){
            printf("%d\t%s\n", shared_messages[i].writer, shared_messages[i].time);
        }
        else
        {
            printf("EMPTY\n");
        }
        
    }
    
}