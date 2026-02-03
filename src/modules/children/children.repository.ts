import { prisma } from "../../config/prisma.ts";
import type { Prisma } from "../../generated/prisma/browser.ts";
import type { Child } from "../../generated/prisma/client.ts";
import type {
  CreateChildInput,
  GetChildListInput,
  PatchChildInput,
  UpdateChildInput,
} from "./children.schema.ts";

/**
 * Retrieves a paginated list of children.
 *
 * @param params Pagination and sorting parameters
 * @returns A list of children
 */
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
    where: { removeDate: null },
    orderBy: { [sortBy]: order },
  });
}

/**
 * Counts children records matching the given filter.
 *
 * @param where Optional Prisma where filter
 * @returns Total number of children
 */
export function countChildren(where?: Prisma.ChildWhereInput) {
  return prisma.child.count({
    where: {
      ...(where && { where }),
      removeDate: null,
    },
  });
}

/**
 * Finds a single child by its ID.
 *
 * @param id Child ID
 * @returns The child or null if not found
 */
export function findChildById(id: number): Promise<Child | null> {
  return prisma.child.findUnique({
    where: { id, removeDate: null },
  });
}

/**
 * Creates a new child.
 *
 * @param payload Child creation payload
 * @returns The created child
 */
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

/**
 * Fully updates an existing child (PUT semantics).
 *
 * @param payload Child update payload including ID
 * @returns The updated child
 */
export function updateChildRepo({
  id,
  ...data
}: UpdateChildInput): Promise<Child> {
  return prisma.child.update({
    where: { id, removeDate: null },
    data,
  });
}

/**
 * Partially updates an existing child (PATCH semantics).
 * Only defined fields are updated.
 *
 * @param payload Partial child update payload including ID
 * @returns The updated child
 */
export function patchChildRepo({
  id,
  ...data
}: PatchChildInput): Promise<Child> {
  const cleanInput = {
    ...(typeof data.name !== "undefined" && { name: data.name }),
    ...(typeof data.surname !== "undefined" && { surname: data.surname }),
    ...(typeof data.birthDay !== "undefined" && { birthDay: data.birthDay }),
    ...(typeof data.dni !== "undefined" && { dni: data.dni }),
    ...(typeof data.address !== "undefined" && { address: data.address }),
  };

  return prisma.child.update({
    where: { id, removeDate: null },
    data: cleanInput,
  });
}

/**
 * Deletes a child by its ID.
 *
 * @param id Child ID
 * @returns The deleted child
 */
export function deleteChildRepo(id: number): Promise<Child> {
  return prisma.child.update({
    where: { id, removeDate: null },
    data: { removeDate: new Date() },
  });
}
