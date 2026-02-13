import mongoose from "mongoose";


const dbConnect = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database is connected successfully");
        });

        let mongodbUrl = process.env.MONGODB_URI;
        const projectName = "resume_builder";

        if (!mongodbUrl) {
            throw new Error("MONGODB_URI environment variable is not set");
        }

        if (mongodbUrl.endsWith("/")) {
            mongodbUrl = mongodbUrl.slice(0, -1);
        }

        await mongoose.connect(`${mongodbUrl}/${projectName}`);
    } catch (error) {
        console.error("Error while connecting database:", error);
    }
};

export default dbConnect;
