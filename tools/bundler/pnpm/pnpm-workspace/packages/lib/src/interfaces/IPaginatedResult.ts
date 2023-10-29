
export interface IPaginatedResult<T> {
  list: T[];
  count: number | string
}