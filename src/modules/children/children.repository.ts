import { prisma } from "../../config/prisma.ts";
import type { CreateChildInput } from "./children.schema.ts";

export function createChild(payload: CreateChildInput) {
  return prisma.child.create({
    data: {
      name: payload.name,
      surname: payload.surname,
      birthDay: payload.birthDay ?? null,
      dni: payload.dni ?? null,
      address: payload.address ?? null,
    },
  });
}
