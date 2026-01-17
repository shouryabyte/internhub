import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * AUTH MIDDLEWARE
 * Verifies JWT and attaches user to request
 */
export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // req.user already exists via global type augmentation
    (req as any).user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * ADMIN GUARD
 */
export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

/**
 * STUDENT GUARD
 */
export const isStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user || user.role !== "STUDENT") {
    return res.status(403).json({ message: "Student only" });
  }
  next();
};
