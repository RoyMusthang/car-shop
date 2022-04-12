import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoAdapter';

interface CarDocument extends Car, Document { }

const CarSchema = new Schema<CarDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: false },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
});

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', CarSchema)) {
    super(model);
  }
}

export default CarModel;
