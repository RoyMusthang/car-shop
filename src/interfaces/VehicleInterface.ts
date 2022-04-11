import { z } from 'zod';

export const schemaVehicle = z.object({
  model: z.string().min(3),
  year: z.number().min(1990).max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type Vehicle = z.infer<typeof schemaVehicle>;
