import { Car } from '../interfaces/CarInterface';
import CarModel from '../model/Car';

class CarService {
  private CarModel = new CarModel();

  public async create(obj: Car): Promise<Car | null> {
    return this.CarModel.create(obj);
  };
}

export default CarService;
