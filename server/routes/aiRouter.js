import express from "express";
const aiRouter = express.Router();


//import the controller
import protect from "../middleware/authMiddleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from "../controllers/aiControllers.js";





//mount the controller
aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
aiRouter.post("/enhance-job-desc", protect, enhanceJobDescription);
aiRouter.post("/upload-resume", protect, uploadResume);




//export the controller
export default aiRouter;