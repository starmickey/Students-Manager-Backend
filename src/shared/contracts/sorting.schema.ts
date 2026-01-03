import { z } from "zod";

export const sortingSchema = z.object({
  sortBy: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("asc"),
});

export type GetSortedDataInput = z.infer<typeof sortingSchema>
