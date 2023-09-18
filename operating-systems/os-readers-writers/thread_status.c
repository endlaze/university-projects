#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>

#include "shared_mem.h"
#include "thread_status.h"

void change_thread_status(int thread_index, int new_status) {
  char *th = attach_shm_block(THR_FILENAME, sizeof(ThreadStruct) * 20);
  ThreadStruct *threads = (ThreadStruct *)((void *)th);
  threads[thread_index].status = new_status;
  int detached_threads = detach_shm_block(THR_FILENAME);
}

int insert_new_thread(int thread_id, int thread_type) {
  char *th = attach_shm_block(THR_FILENAME, sizeof(ThreadStruct) * 20);
  ThreadStruct *threads = (ThreadStruct *)((void *)th);
   for (int i = 0; i < 20; i++)
    {
        if(threads[i].thread_id == 0){
            threads[i].status = BLOCKED;
            threads[i].type = thread_type;
            threads[i].thread_id = thread_id;
            return i;
        }
    }
    int detached_threads = detach_shm_block(THR_FILENAME);
}