import { prisma } from "../../config/prisma.ts";
import type { Prisma } from "../../generated/prisma/browser.ts";
import type { Child } from "../../generated/prisma/client.ts";
import type {
  CreateChildInput,
  GetChildListInput,
  PatchChildInput,
  UpdateChildInput,
} from "./children.schema.ts";

export function createChild(payload: CreateChildInput): Promise<Child> {
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

export function updateChildRepo({ id, ...data}: UpdateChildInput) {
  return prisma.child.update({
    where: { id },
    data,
  });
}

export function patchChildRepo({ id, ...data}: PatchChildInput) {
  const cleanInput = {
    id,
    ...(typeof data.name !== "undefined" && { name: data.name }),
    ...(typeof data.surname !== "undefined" && { surname: data.surname }),
    ...(typeof data.birthDay !== "undefined" && { birthDay: data.birthDay }),
    ...(typeof data.dni !== "undefined" && { dni: data.dni }),
    ...(typeof data.address !== "undefined" && { address: data.address }),
  };

  return prisma.child.update({
    where: { id },
    data: cleanInput,
  });
}

export async function findChildren({
  page,
  pageSize,
  sortBy = "name",
  order = "asc",
}: GetChildListInput): Promise<Child[]> {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return prisma.child.findMany({
    skip,
    take,
    orderBy: { [sortBy]: order },
  });
}

export function countChildren(where?: Prisma.ChildWhereInput) {
  return prisma.child.count({ ...(where && { where }) });
}

export function findChildById(id: number): Promise<Child | null> {
  return prisma.child.findUnique({
    where: { id },
  });
}
