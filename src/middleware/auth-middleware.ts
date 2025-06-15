import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
    const decoded = jwt.verify(token, jwtSecretKey);
    (req as any).user = decoded;
    next();
  } catch (e) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
