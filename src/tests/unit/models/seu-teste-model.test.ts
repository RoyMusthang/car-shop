import { expect } from 'chai';
import mongoose from 'mongoose';
import connectToDatabase from '../../../connection';
import { Car } from '../../../interfaces/CarInterface';
import CarModel from '../../../model/CarModel';
import { CarWithId } from '../../interfacce';

const newCar: Car = {
  status: true,
  model: 'Gol',
  year: 2009,
  color: 'black',
  buyValue: 27000,
  doorsQty: 5,
  seatsQty: 5,
};

const newUpdate: Car = {
  status: false,
  model: 'Golf',
  year: 2022,
  color: 'black',
  buyValue: 100000,
  doorsQty: 3,
  seatsQty: 5,
};

describe('Testing the ModelCar class', () => {

  before(async function() {
    await connectToDatabase();
  });

  after(async function() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('Test if create method returns a new Document', async function() {

    const car = new CarModel();
    const newCarDocument = await car.create(newCar);

    expect(newCarDocument).to.include(newCar);
  });

  it('Test if read method returns a all document', async function() {

    const car = new CarModel();
    await car.create(newCar);
    const newCarDocument = await car.read()

    expect(newCarDocument).to.length(2)
  });
});
