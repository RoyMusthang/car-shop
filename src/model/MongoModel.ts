import { Model as M, Document } from 'mongoose';
import Model from '../interfaces/ModelInterface.ts'

abstract class MongoModel<T> implements Model {
  constructor(protected model: M<T & Document>) { }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj })
  }

  public async read(): Promise<T[]> {
    return this.model.find();
  }

  public async readOne(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id });
  } 

  public async update(id: string, obj: T): Promise<T | null> {
    return this.model.findOneAndUpdate({ _id: id }, { ...obj });
  }  

  public async delete(id: string): Promise<T | null>{
    return this.model.findOneAndDelete({ _id: id });
  } 
}

export default MongoModel;
