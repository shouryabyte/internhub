import { Request, Response } from "express";
import Application from "../models/application.model";
import { AuthRequest } from "../types/auth-request";

/**
 * STUDENT: Apply to internship
 */
export const applyInternship = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { internshipId } = req.body;

    const exists = await Application.findOne({
      student: authReq.user.id,
      internship: internshipId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      student: authReq.user.id,
      internship: internshipId,
      status: "APPLIED", // ✅ correct status
    });

    return res.status(201).json(application);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * STUDENT: Get my applications
 */
export const myApplications = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const applications = await Application.find({
      student: authReq.user.id,
    }).populate("internship");

    return res.json(applications);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN: Update application status
 */
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // ✅ validate status
    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        message: "Status must be APPROVED or REJECTED",
      });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ only APPLIED can be processed
    if (application.status !== "APPLIED") {
      return res.status(400).json({
        message: "Already processed",
      });
    }

    application.status = status;
    await application.save();

    return res.json(application);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN: Get all applications
 */
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find()
      .populate("student", "email")
      .populate("internship", "title companyName");

    return res.json(applications);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};
