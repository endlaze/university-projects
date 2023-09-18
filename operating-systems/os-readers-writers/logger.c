#include <stdio.h>
#include <stdlib.h>
#include "logger.h"

void clear_logs() {
  FILE *file;
  file = fopen(LOGFILENAME, "w");
  fclose(file);
}


void logger (char * string){
  FILE *file;
  file = fopen(LOGFILENAME, "a");
  fprintf(file, "%s", string);
  fclose(file);
}

