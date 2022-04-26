import { expect } from 'chai';
import Sinon from 'sinon';
import CarService from '../../../services/car.service';
import CarController from '../../../controllers/car.controller';
import { Request, Response } from 'express';
import { Car } from '../../../interfaces/CarInterface';

let carService = new CarService();
let carController = new CarController(carService)
let car = {
  _id: "4edd40c86762e0fb12000003",
 model: "Ferrari Maranello",
 year: 1963,
 color: "red",
 buyValue: 3500000,
 seatsQty: 2,
 doorsQty: 2
}

let carIncomplete = {
 model: "",
 year: 1963,
 color: "red",
 buyValue: 3500000,
 seatsQty: 2,
 doorsQty: 2
}
   const fakeReq = {} as Request;
   const fakeRes= {} as Response;

describe ('Car controller', () => {
  beforeEach(() => Sinon.restore())
  it('retorna o status 500', async () => {
      Sinon.stub(carService, 'create').resolves(null)
      fakeReq.body = {}
      fakeRes.status = Sinon.stub().returns(fakeRes);
      fakeRes.json = Sinon.stub().returns(null);
    await carController.create(fakeReq, fakeRes);
      expect((fakeRes.status as Sinon.SinonStub).calledWith(500)).to.be.true;
    });
    it('retorna o status 400', async () => {
      Sinon.stub(carService, 'create').resolves(carIncomplete)
      fakeReq.body = {}
      fakeRes.status = Sinon.stub().returns(fakeRes);
      fakeRes.json = Sinon.stub().returns(null);
    await carController.create(fakeReq, fakeRes);
      expect((fakeRes.status as Sinon.SinonStub).calledWith(400));
    });
    it('retorna o status 201', async () => {
      Sinon.stub(carService, 'create').resolves(car)
      fakeReq.body = {}
      fakeRes.status = Sinon.stub().returns(fakeRes);
      fakeRes.json = Sinon.stub().returns(null);
    await carController.create(fakeReq, fakeRes);
      expect((fakeRes.status as Sinon.SinonStub).calledWith(201)).to.be.true;
    });
})