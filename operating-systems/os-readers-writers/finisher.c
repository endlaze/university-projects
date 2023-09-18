// Imports
#include <stdio.h>
#include <stdlib.h>
#include <semaphore.h>
#include "shared_mem.h"
#include "shared_sem.h"
#include "logger.h"

int main()
{
    int destroyed_shm_block = destroy_shm_block(SHM_FILENAME);
    int destroyed_pgi = destroy_shm_block(PGI_FILENAME);
    int destroyed_thr = destroy_shm_block(THR_FILENAME);
    destroy_sem(RW_SEM);
    clear_logs();
    printf("\n[+] Shared Memory and Semaphores were freed-up successfully.\n");
    return 0;
};