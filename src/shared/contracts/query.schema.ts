import { z } from "zod";
import { paginationSchema } from "./pagination.schema.ts";
import { sortingSchema } from "./sorting.schema.ts";

export const querySchema = paginationSchema.merge(sortingSchema);

export type GetDataInput = z.infer<typeof querySchema>;
