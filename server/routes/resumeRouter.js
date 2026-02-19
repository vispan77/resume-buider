import express from "express";
const resumeRouter = express.Router();



//import the controller
import protect from "../middleware/authMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/resumeControllers.js";
import upload from "../configs/multer.js";



//mount the router
resumeRouter.post("/create", protect, createResume);
resumeRouter.put("/update",upload.single("image"), protect, updateResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);


//export the router
export default resumeRouter;