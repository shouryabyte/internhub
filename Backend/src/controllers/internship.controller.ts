import { Request, Response } from "express";
import Internship from "../models/internship.model";

/**
 * ADMIN: Create Internship
 */
export const createInternship = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      companyName,
      jobId,
      applyType,
      applyLink,
      description,
    } = req.body;

    const internship = await Internship.create({
      title,
      companyName,
      jobId,
      applyType,
      applyLink,
      description,
    });

    return res.status(201).json(internship);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * STUDENT / ADMIN: List internships
 */
export const listInternships = async (
  _req: Request,
  res: Response
) => {
  try {
    const internships = await Internship.find().sort({
      createdAt: -1,
    });

    return res.json(internships);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
