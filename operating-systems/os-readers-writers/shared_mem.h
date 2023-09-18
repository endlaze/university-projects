#ifndef SHM
#define SHM_FILENAME "sh_mem"
#define PGI_FILENAME "prog_info"
#define THR_FILENAME "threads"
#define LINE_SIZE 70
#define ERROR_STATUS (-1)

// Struct for Shared Messages
typedef struct shm_message
{
    int writer;
    char time[26];
    int isWritten;
} SharedMessage;

// Struct for active threads linked list
typedef struct th_struct
{
    int thread_id;
    int type;
    int status;

} ThreadStruct;

// Struct for Program's info.
typedef struct prog_info
{
    ThreadStruct *threads;
    int total_lines;
    int simulation_active;
    int last_thread_type;
    int max_sr_reached;
    int waiting_threads;
} ProgInfo;

// Function to attach a shared memory block.
// Creates it if does not exist.
char *attach_shm_block(char *filename, int block_size);

// Function to detach a memory block.
int detach_shm_block(char *clock);

// Function to destroy a memory block.
int destroy_shm_block(char *filename);

#endif