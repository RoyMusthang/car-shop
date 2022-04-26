import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModels';
import CarService from '../../../services/car.service';

describe ('Car service', () => {
  let carModel = new CarModel()
  let carService = new CarService(carModel)
  let car = {
    _id: "4edd40c86762e0fb12000003",
   model: "Ferrari Maranello",
   year: 1963,
   color: "red",
   buyValue: 3500000,
   seatsQty: 2,
   doorsQty: 2
  }

   describe('test create service', () => {
    before(() => {
      Sinon.stub(carModel, 'create').resolves(car)
    })
    after(() => {
      Sinon.restore()
    })
    it('Return the car object', async() => {
      const carCreated = await carService.create(car)
      expect(carCreated).to.be.equal(car)
    })
  })
}) 