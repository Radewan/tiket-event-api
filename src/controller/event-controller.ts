import { Request, Response, NextFunction } from "express";

export class EventController {
  static async create(req: Request, res: Response, next: NextFunction) {
    res.status(204).json({});
  }
}
