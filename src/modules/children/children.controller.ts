import type { Request, Response } from "express";
import { getChildById, getChildren, registerChild, updateChild } from "./children.service.ts";
import {
  getChildByIdSchema,
  getChildrenListSchema,
  registerChildSchema,
  updateChildSchema,
} from "./children.schema.ts";
import type { PaginatedResponse } from "../../shared/contracts/paginated-response.ts";
import type { ChildDTO } from "./children.dto.ts";
import { BadRequestError } from "../../shared/errors/errors.ts";

export async function registerChildController(req: Request, res: Response) {
  const parsed = registerChildSchema.parse(req.body);
  const child = await registerChild(parsed);

  res.status(201).json(child);
}

export async function updateChildController(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    throw BadRequestError("Invalid id");
  }

  const parsed = updateChildSchema.parse(req.body);

  const child = await updateChild(id, parsed);

  res.json(child);
}

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