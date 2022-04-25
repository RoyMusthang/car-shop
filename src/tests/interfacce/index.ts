import { Car } from "../../interfaces/CarInterface";

export interface CarWithId extends Car {
  _id: string;
  toJSON: Function;
}
