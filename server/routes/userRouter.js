import express from "express";

const userRouter = express.Router();


//import the controller
import { getUserById, getUserResumes, loginUser, registerUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";


//mount the routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data",protect, getUserById);
userRouter.get("/resumes",protect, getUserResumes);




//export the routes
export default userRouter;