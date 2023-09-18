all: initializer.c finisher.c shared_mem.c shared_sem.c writer.c
	gcc initializer.c shared_mem.c shared_sem.c logger.c -o initializer.o -pthread
	gcc finisher.c shared_mem.c shared_sem.c logger.c -o finisher.o -pthread
	gcc writer.c shared_mem.c shared_sem.c logger.c thread_status.c -o writer.o -pthread
	gcc reader.c shared_mem.c shared_sem.c logger.c thread_status.c -o reader.o -pthread
	gcc spy.c shared_mem.c -o spy.o 
	gcc selfish_reader.c shared_mem.c shared_sem.c logger.c thread_status.c -o selfish_reader.o -pthread
