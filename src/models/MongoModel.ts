import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(public model: M<T & Document>) {}

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });
  read = async (): Promise<T[]> => {
    const result = await this.model.find()
    return result
  }
}

export default MongoModel;
