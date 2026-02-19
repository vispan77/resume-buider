import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";


export const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
}

//controler for user registration
//POST: /api/users/registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //validate
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required field"
            })
        }

        //check if the user already exist
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //save the use in the db
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        //return success message in the response a token 
        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return res.status(200).json({
            success: true,
            message: "User is created successfully",
            token: token,
            user: newUser
        })

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//controler for user login
//POST: /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if the user already exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        //compare the user pssword from the db password 
        if (!user.comparePassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        //return success message in the response a token 
        const token = generateToken(user._id);
        user.password = undefined;

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token: token,
            user: user
        })

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//controler for getting user from the userID
//POST: /api/users/data
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;

        //check if the user exists from that userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        //return the user if the user found
        user.password = undefined;

        return res.status(200).json({
            success: true,
            message: "User Founded",
            user: user
        })

    } catch (error) {
        console.log("error :- ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//controler for getting user resume
//POST: /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;

        //fetch all the resume created bt the user
        const resumes = await Resume.find({ userId });

        return res.status(200).json({
            success: true,
            message: "Resume founded",
            resumes: resumes
        })

    } catch (error) {
        console.log("error :- ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




