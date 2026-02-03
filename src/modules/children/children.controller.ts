import type { Request, Response } from "express";
import {
  getChildById,
  getChildren,
  registerChild,
  patchChild,
  updateChild,
  deleteChild,
} from "./children.service.ts";
import {
  getChildByIdSchema,
  getChildrenListSchema,
  createChildSchema,
  patchChildSchema,
  updateChildSchema,
  deleteChildSchema,
} from "./children.schema.ts";
import type { PaginatedResponse } from "../../shared/contracts/paginated-response.ts";
import type { ChildDTO } from "./children.dto.ts";

export async function getChildrenController(req: Request, res: Response) {
  const parsed = getChildrenListSchema.parse(req.query);
  const { page, pageSize } = parsed;

  const { children, total } = await getChildren(parsed);

  const response: PaginatedResponse<ChildDTO> = {
    data: children,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };

  res.json(response);
}

export async function getChildByIdController(req: Request, res: Response) {
  const { id } = getChildByIdSchema.parse(req.params);

  const child = await getChildById(id);

  if (!child) {
    res.status(404).json({ message: "Child not found" });
    return;
  }

  res.json(child);
}

export async function registerChildController(req: Request, res: Response) {
  const parsed = createChildSchema.parse(req.body);
  const child = await registerChild(parsed);

  res.status(201).json(child);
}

export async function updateChildController(req: Request, res: Response) {
  const parsed = updateChildSchema.parse({ ...req.params, ...req.body });

  const child = await updateChild(parsed);

  res.json(child);
}

export async function patchChildController(req: Request, res: Response) {
  const parsed = patchChildSchema.parse({ ...req.params, ...req.body });

  const child = await patchChild(parsed);

  res.json(child);
}

export async function deleteChildController(req: Request, res: Response) {
  const parsed = deleteChildSchema.parse(req.params);

  await deleteChild(parsed);

  res.status(204).json({ message: "Removed succesfully" });
}
