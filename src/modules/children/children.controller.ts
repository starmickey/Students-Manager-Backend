import type { Request, Response } from "express";
import { getChildren, registerChild } from "./children.service.ts";
import {
  getChildrenListSchema,
  registerChildSchema,
} from "./children.schema.ts";
import type { PaginatedResponse } from "../../shared/contracts/paginated-response.ts";
import type { ChildDTO } from "./children.dto.ts";

export async function registerChildController(req: Request, res: Response) {
  const parsed = registerChildSchema.parse(req.body);
  const child = await registerChild(parsed);

  res.status(201).json(child);
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
