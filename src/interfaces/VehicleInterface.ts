import { z } from 'zod';

const VehicleSchema = z.object({
  model: z.string({
    required_error: 'model is required',
    invalid_type_error: 'model must be a string',
  }).min(3, { message: 'model must be 3 or more characters long' }),
  year: z.number().min(1900).max(2022),
  color: z.string({
    required_error: 'color is required',
    invalid_type_error: 'color must be a string',
  }).min(3, { message: 'color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;
export { VehicleSchema };
