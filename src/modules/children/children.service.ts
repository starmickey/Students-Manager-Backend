import type {
  GetChildListInput,
  RegisterChildInput,
  UpdateChildInput,
} from "./children.schema.ts";
import {
  createChild,
  findChildren,
  countChildren,
  updateChildRepo,
} from "./children.repository.ts";
import { toChildDTO, toChildDTOList, type ChildDTO } from "./children.dto.ts";

export async function registerChild(
  input: RegisterChildInput
): Promise<ChildDTO> {
  const child = await createChild(input);
  return toChildDTO(child);
}

export async function updateChild(
  id: number,
  input: UpdateChildInput
): Promise<ChildDTO> {
  const child = await updateChildRepo(id, input);
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
