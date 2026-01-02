import type { RegisterChildInput } from "./children.schema.ts";
import { createChild } from "./children.repository.ts";
// import { ConflictError } from "../../shared/errors/errots.ts";

export async function registerChild(input: RegisterChildInput) {
  // if (input.dni) {
  //   const exists = await createChild(input);
  //   if (exists) {
  //     throw ConflictError('Child with this DNI already exists');
  //   }
  // }

  return createChild(input);
}
