#include <stdio.h>
#include <string.h>
#include "cslib.h"
#include "foreach.h"
#include "map.h"
#include "simpio.h"
#include "strlib.h"
#include "vector.h"

main() {
   Map map;
   Vector v;
   string line, city, state, sep;
   int tab;

   map = newMap();
   while (true) {
      line = getLine();
      if (line == null) break;
      tab = findChar('\t', line, 0);
      city = substring(line, 0, tab - 1);
      state = line + tab + 1;
      v = get(map, state);
      if (v == null) {
         v = newVector();
         put(map, state, v);
      }
      add(v, city);
   }
   foreach (state in map) {
      v = get(map, state);
      sep = "[ ";
      printf("\"%s\", ", state);
      foreach (city in v) {
         printf("%s\"%s\"", sep, city);
         sep = ", ";
      }
      printf(" ]\n");
   }
}
