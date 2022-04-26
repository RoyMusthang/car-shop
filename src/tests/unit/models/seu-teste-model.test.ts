import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModels';

describe ('Car model', () => {
  let carModel = new CarModel()
  let car = {
    _id: "4edd40c86762e0fb12000003",
   model: "Ferrari Maranello",
   year: 1963,
   color: "red",
   buyValue: 3500000,
   seatsQty: 2,
   doorsQty: 2
  }

  describe('test create', () => {
    before(() => {
      Sinon.stub(carModel.model, 'create').resolves(car)
    })
    after(() => {
      Sinon.restore()
    })
    it('Return the car object', async() => {
      let carModel = new CarModel()
      const carCreated = await carModel.create(car)
      expect(carCreated).to.be.equal(car)
    })
  })
  describe ('Car model/read', () => {
    before(() => {
      Sinon.stub(carModel.model, 'find').resolves([car] as never)
    })
    after(() => {
      Sinon.restore()
    })
    it('Return the car object', async() => {
      // let carModel = new CarModel()
      const carRead = await carModel.read()
      expect(carRead).to.be.an('array')
    })
    it('todos os itens do array têm o tipo "objeto"', async () => {
      // let carModel = new CarModel()
      const result = await carModel.read();
      result.map((item) => {
        expect(item).to.be.an('object');
      });
    });
  })
})