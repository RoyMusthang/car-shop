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

  public async read(
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  public async readOne(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> {
    try {
      const { id } = req.params;
      const obj = await this.service.readOne(id);
      if (!obj) return res.status(404).json({ error: this.errors.internal });
      return res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  public async update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> {
    try {
      const { id } = req.params;
      const { body } = req;
      const obj = await this.service.update(id, body);
      if (!obj) return res.status(404).json({ error: this.errors.internal });
      return res.status(201).json(obj);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal })
    }
  }
  public async delete(
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      return res.status(204);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal })
    }
  }

}
export default Controller;
