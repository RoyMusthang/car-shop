import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const CarSchema = VehicleSchema.extend({
  doorsQty: z.number({
    required_error: 'door is required',
    invalid_type_error: 'door must be a number',
  }).min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type Car = z.infer<typeof CarSchema>;
export { CarSchema }; 