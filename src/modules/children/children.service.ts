import type {
  GetChildListInput,
  RegisterChildInput,
} from "./children.schema.ts";
import {
  createChild,
  findChildren,
  countChildren,
} from "./children.repository.ts";
import { toChildDTO, toChildDTOList, type ChildDTO } from "./children.dto.ts";

export async function registerChild(
  input: RegisterChildInput
): Promise<ChildDTO> {
  const child = await createChild(input);
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
