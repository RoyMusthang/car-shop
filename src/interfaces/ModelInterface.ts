export interface Model<T> {
  create(object: T): Promise<T>,
  read(): Promise<T[]>,
}
