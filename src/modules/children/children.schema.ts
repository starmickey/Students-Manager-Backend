import { z } from "zod";
import { querySchema } from "../../shared/contracts/query.schema.ts";

export const createChildSchema = z.object({
  name: z.string("Name must be a valid string").min(1, "Name cannot be empty"),

  surname: z
    .string("Surname must be a valid string")
    .min(1, "Surname cannot be empty"),

  birthDay: z.coerce.date("Birth date must be a valid date").optional(),

  dni: z
    .string("DNI must be a text value")
    .min(6, "DNI must have at least 6 characters")
    .optional(),

  address: z.string("Address must be a text value").optional(),
});

export const registerChildSchema = createChildSchema;

export const getChildrenListSchema = querySchema;

export const updateChildSchema = z
  .object({
    name: z.string().min(1).optional(),
    surname: z.string().min(1).optional(),
    birthDay: z.coerce.date().nullable().optional(),
    dni: z.string().min(6).nullable().optional(),
    address: z.string().nullable().optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided"
  );

export const getChildByIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateChildInput = z.infer<typeof createChildSchema>;
export type RegisterChildInput = z.infer<typeof registerChildSchema>;
export type GetChildListInput = z.infer<typeof getChildrenListSchema>;
export type UpdateChildInput = z.infer<typeof updateChildSchema>;
export type GetChildByIdInput = z.infer<typeof getChildByIdSchema>;