import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, Document { }

const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  seatsQty: Number,
  doorsQty: Number,
}, {
  versionKey: false });

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('cars', carSchema)) {
    super(model);
  }
}

export default CarModel;
