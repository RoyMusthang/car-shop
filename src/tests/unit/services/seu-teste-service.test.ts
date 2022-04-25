import { expect } from 'chai';
import mongoose from 'mongoose';
import connectToDatabase from '../../../connection';
import { Car } from '../../../interfaces/CarInterface';
import CarServicer from '../../../services/CarService';
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

const carUpdate: Car = {
  status: false,
  model: 'Fusca',
  year: 1598,
  color: 'black',
  buyValue: 80000,
  doorsQty: 3,
  seatsQty: 4,
};


describe('Testing the CarServicer class', () => {

  before(async function() {
    await connectToDatabase();
  });

  after(async function() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('Test if create method returns a new Document', async function() {

    const car = new CarServicer();
    const newCarDocument = await car.create(newCar) as CarWithId;

    expect(newCarDocument.toJSON()).to.deep.equal({ ...newCar, _id: newCarDocument._id });
  });

  it('Test if read method returns a all Document', async function() {

    const car = new CarServicer();
    const newCarDocument = await car.read();

    expect(newCarDocument).to.length(1);
  });

});
