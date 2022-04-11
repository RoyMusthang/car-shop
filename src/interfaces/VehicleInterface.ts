// import { z } from "zod";

export interface Vehicle {
  model: string,
  year: number,
  color: string,
  status: boolean,
  buyValue: number,
}

// primitive values
// z.string();
// z.number();
// z.bigint();
// z.boolean();
// z.date();

// empty types
// z.undefined();
// z.null();
// z.void(); // accepts undefined

// catch-all types
// allows any value
// z.any();
// z.unknown();

// never type
// allows no values
// z.never();
