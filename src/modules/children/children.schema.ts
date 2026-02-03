import { z } from "zod";
import { querySchema } from "../../shared/contracts/query.schema.ts";

export const getChildrenListSchema = querySchema;

export const getChildByIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createChildSchema = z.object({
  name: z.string("Name must be a valid string").min(1, "Name cannot be empty"),

  surname: z
    .string("Surname must be a valid string")
    .min(1, "Surname cannot be empty"),

  birthDay: z.coerce
    .date("Birth date must be a valid date")
    .nullable()
    .optional()
    .default(null),

  dni: z.coerce
    .string("DNI must be a text value")
    .min(6, "DNI must have at least 6 characters")
    .nullable()
    .optional()
    .default(null),

  address: z
    .string("Address must be a text value")
    .nullable()
    .optional()
    .default(null),
});

export const updateChildSchema = createChildSchema.extend({
  id: z.coerce.number().int().positive(),
});

export const patchChildSchema = z
  .object({
    id: z.coerce.number().int().positive(),
    name: z.string().min(1).optional(),
    surname: z.string().min(1).optional(),
    birthDay: z.coerce.date().nullable().optional(),
    dni: z.coerce.string().min(6).nullable().optional(),
    address: z.string().nullable().optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided"
  );

export const deleteChildSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type GetChildByIdInput = z.infer<typeof getChildByIdSchema>;
export type GetChildListInput = z.infer<typeof getChildrenListSchema>;
export type CreateChildInput = z.infer<typeof createChildSchema>;
export type UpdateChildInput = z.infer<typeof updateChildSchema>;
export type PatchChildInput = z.infer<typeof patchChildSchema>;
export type DeleteChildInput = z.infer<typeof deleteChildSchema>;
