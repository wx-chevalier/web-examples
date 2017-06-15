#include <stdlib.h>
#include <stdio.h>
#include <emscripten.h>
#include <string.h>

int width = 0;
int height = 0;
char *current;
char *next;

EMSCRIPTEN_KEEPALIVE
char *init(int w, int h)
{
  width = w + 2;
  height = h + 2;
  current = malloc(width * height * sizeof(char));
  next = malloc(width * height * sizeof(char));
  return current;
}

int cell_index(int i, int j)
{
  return i * width + j;
}

EMSCRIPTEN_KEEPALIVE
char cell(int i, int j)
{
  return current[cell_index(i, j)];
}

EMSCRIPTEN_KEEPALIVE
char cellSafe(int cellIndex)
{
  return current[cellIndex];
}

EMSCRIPTEN_KEEPALIVE
char getNext(int i, int j)
{
  return next[cell_index(i, j)];
}

void loopCurrentState()
{
  for (int j = 1; j < width + 1; j++)
  {
    current[cell_index(0, j)] = current[cell_index(height - 2, j)];
    current[cell_index(height - 1, j)] = current[cell_index(1, j)];
  }
  for (int i = 1; i < height + 1; i++)
  {
    current[cell_index(i, 0)] = current[cell_index(i, width - 2)];
    current[cell_index(i, width - 1)] = current[cell_index(i, 1)];
  }
  current[cell_index(0, 0)] = current[cell_index(height - 2, width - 2)];
  current[cell_index(0, width - 1)] = current[cell_index(height - 2, 1)];
  current[cell_index(height - 1, 0)] = current[cell_index(1, width - 2)];
  current[cell_index(height - 1, width - 1)] = current[cell_index(1, 1)];
}

EMSCRIPTEN_KEEPALIVE
void computeNextState()
{
  loopCurrentState();

  int neighbors = 0;
  int i_m1, i_p1, i_;
  int j_m1, j_p1;
  int height_limit = height - 1;
  int width_limit = width - 1;
  for (int i = 1; i < height_limit; i++)
  {
    i_m1 = (i - 1) * width;
    i_p1 = (i + 1) * width;
    i_ = i * width;
    for (int j = 1; j < width_limit; j++)
    {
      j_m1 = j - 1;
      j_p1 = j + 1;
      neighbors = current[i_m1 + j_m1];
      neighbors += current[i_m1 + j];
      neighbors += current[i_m1 + j_p1];
      neighbors += current[i_ + j_m1];
      neighbors += current[i_ + j_p1];
      neighbors += current[i_p1 + j_m1];
      neighbors += current[i_p1 + j];
      neighbors += current[i_p1 + j_p1];
      if (neighbors == 3)
      {
        next[i_ + j] = 1;
      }
      else if (neighbors == 2)
      {
        next[i_ + j] = current[i_ + j];
      }
      else
      {
        next[i_ + j] = 0;
      }
    }
  }
  memcpy(current, next, width * height);
}

EMSCRIPTEN_KEEPALIVE
void set(int i, int j, int value)
{
  current[cell_index(i, j)] = value;
}

EMSCRIPTEN_KEEPALIVE
void setNext(int i, int j, int value)
{
  next[cell_index(i, j)] = value;
}