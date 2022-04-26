import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface'; 

export interface ServiceError {
  error: ZodError;
}

abstract class Service<T> {
  constructor(protected model: Model<T>) {}

  public async create(obj:T): Promise< T | null | ServiceError> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null> {
    const result = await this.model.readOne(id);
    return result;
  }

  public async update(id: string, obj: T): Promise<T | null> {
    const result = await this.model.update(id, obj);
    return result;
  }

  public async delete(id: string): Promise<T | null> {
    const result = await this.model.delete(id);
    return result;
  }
}

export default Service;
