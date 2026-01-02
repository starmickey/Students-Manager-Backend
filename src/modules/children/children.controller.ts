import type { Request, Response } from "express";
import { registerChild } from "./children.service.ts";
import { registerChildSchema } from "./children.schema.ts";

export async function registerChildController(req: Request, res: Response) {
  const parsed = registerChildSchema.parse(req.body);

  const child = await registerChild(parsed);

  res.status(201).json(child);
}
