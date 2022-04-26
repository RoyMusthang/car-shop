import { Request, Response } from 'express';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res | void> => {
    try {
      const { id } = req.params;
      const car = await this.service.readOne(id);
      if (!car) return res.status(404).json({ error: this.errors.notFound });
      res.status(200).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res | void> => {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await this.service.update(id, body);
      if (!result) return res.status(404).json({ error: this.errors.notFound });
      res.status(200).json(result);  
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<object | ResponseError>,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    const result = await this.service.delete(id);
    if (!result) return res.status(404).json({ error: this.errors.notFound });
    res.status(204).json({});
  };
}
export default Controller;