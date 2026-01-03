import type { Child } from "../../generated/prisma/client.ts";

/**
 * DTO returned to API consumers
 * (decoupled from Prisma model)
 */
export interface ChildDTO {
  id: number;
  name: string;
  surname: string;
  birthDay?: string | null;
  dni?: string | null;
  address?: string | null;
}

/**
 * Mapper: Prisma → DTO
 */
export function toChildDTO(child: Child): ChildDTO {
  return {
    id: child.id,
    name: child.name,
    surname: child.surname,
    birthDay: child.birthDay?.toISOString().split("T")[0] ?? null,
    dni: child.dni,
    address: child.address,
  };
}

/**
 * Mapper for collections
 */
export function toChildDTOList(children: Child[]): ChildDTO[] {
  return children.map(toChildDTO);
}
