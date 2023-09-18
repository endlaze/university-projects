#define READER 0
#define WRITER 1
#define SELFISH_READER 2
#define ACTIVE 0
#define BLOCKED 1
#define ASLEEP 2


void change_thread_status(int thread_index, int new_status);
int insert_new_thread(int thread_id, int thread_type);