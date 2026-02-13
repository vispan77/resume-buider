import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./configs/dbConnect.js";
import userRouter from "./routes/userRouter.js";
import resumeRouter from "./routes/resumeRouter.js";


const app = express();
dotenv.config();

//middelware to pars the request body
app.use(express.json());
app.use(cors());

//database connection
await dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => [
    console.log(`Server is listening at port ${PORT}`)
]);

app.get("/", (req, res) => {
    res.send("Welcome to the home page");
});
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);