import { Router } from 'express';
import Controller from '../controllers';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
    this.router.get(route, controller.readOne);
    this.router.get(route, controller.read);
    this.router.put(route, controller.update);
    this.router.delete(route, controller.delete);
  }
}

export default CustomRouter;
