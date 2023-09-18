#define RW_SEM "/rw_sem"

#define SEM_PERMISSIONS 0600

sem_t *create_sem(const char *sem_name, int initial_value);
sem_t *open_existing_sem(const char *sem_name);
void destroy_sem(const char *sem_name);