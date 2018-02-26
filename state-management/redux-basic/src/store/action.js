export const increment = (count: number) => ({
  type: "COUNT_INCREMENT",
  count
});

export const decrement = (count: number) => ({
  type: "COUNT_DECREMENT",
  count
});