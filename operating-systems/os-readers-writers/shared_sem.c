
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <semaphore.h>

#include "shared_sem.h"
#include "shared_mem.h"

// Function to create a new semaphore
sem_t *create_sem(const char *sem_name, int value)
{
    sem_t *new_sem;

    if ((new_sem = sem_open(sem_name, O_CREAT, 0600, value)) == SEM_FAILED)
    {
        printf("[-] Error: Could not open the semaphore.\n");
        exit(1);
    };

    return new_sem;
};

// Function to open an existing semaphore
sem_t *open_existing_sem(const char *sem_name)
{
    sem_t *ex_sem;

    if ((ex_sem = sem_open(sem_name, 0)) == SEM_FAILED)
    {
        printf("[-] Error: Could not open the semaphore.\n");
        exit(1);
    };

    return ex_sem;
};

// Function to destroy a semaphore
void destroy_sem(const char *sem_name)
{
    sem_t *r_sem = open_existing_sem(sem_name);
    int destroyed_sem = (int)sem_close(r_sem);
    int unlinked_sem = sem_unlink(sem_name);

    if (destroyed_sem == ERROR_STATUS || unlinked_sem == ERROR_STATUS)
    {
        printf("[-] Error: Couldn't destroy the semaphore.\n");
        exit(1);
    };
};