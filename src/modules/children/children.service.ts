import type {
  GetChildListInput,
  RegisterChildInput,
  PatchChildInput,
  UpdateChildInput,
} from "./children.schema.ts";
import {
  createChild,
  findChildren,
  countChildren,
  patchChildRepo,
  findChildById,
  updateChildRepo,
} from "./children.repository.ts";
import { toChildDTO, toChildDTOList, type ChildDTO } from "./children.dto.ts";
import { NotFoundError } from "../../shared/errors/errors.ts";

export async function registerChild(
  input: RegisterChildInput
): Promise<ChildDTO> {
  const child = await createChild(input);
  return toChildDTO(child);
}

export async function updateChild(input: UpdateChildInput): Promise<ChildDTO> {
  const exists = await findChildById(input.id);
  if (!exists) {
    throw NotFoundError("Child not found");
  }

  const child = await updateChildRepo(input);
  return toChildDTO(child);
}

export async function patchChild(input: PatchChildInput): Promise<ChildDTO> {
  const exists = await findChildById(input.id);
  if (!exists) {
    throw NotFoundError("Child not found");
  }

  const child = await patchChildRepo(input);
  return toChildDTO(child);
}

export async function getChildren(
  params: GetChildListInput
): Promise<{ children: ChildDTO[]; total: number }> {
  const [children, total] = await Promise.all([
    findChildren(params),
    countChildren(),
  ]);

  return { children: toChildDTOList(children), total };
}

export async function getChildById(id: number): Promise<ChildDTO | null> {
  const child = await findChildById(id);
  if (!child) {
    throw NotFoundError("Child not found");
  }

  return toChildDTO(child);
}
