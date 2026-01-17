import { Request } from "express";
import { Types } from "mongoose";

export interface AuthRequest extends Request {
  user?: {
    id: Types.ObjectId;
    email: string;
    role: "STUDENT" | "ADMIN";
  };
}
