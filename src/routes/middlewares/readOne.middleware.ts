import { Response, NextFunction } from 'express';
import { RequestWithBody } from '../../controllers';
import { Car } from '../../interfaces/CarInterface';

const middleware = {
  validateIdLength: (
    req: RequestWithBody<Car>,
    res: Response, 
    next: NextFunction,
  ) => {
    const { id } = req.params;
    if (+(id) < 24) {
      return res.status(400).json({
        message: 'Id must have 24 hexadecimal characters',
      });
    }
    next();
  },
};

export default middleware;