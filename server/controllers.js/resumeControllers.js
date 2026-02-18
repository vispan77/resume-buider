import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

//controller for creating a new resume
//POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        //create a new resume
        const newResume = await Resume.create({ userId, title });

        //reurn a success message
        return res.status(200).json({
            success: true,
            message: "Resume created Successfully",
            resume: newResume
        })

    } catch (error) {
        console.log("error :- ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//controller for deleting a new resume
//DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        //delete a resume
        await Resume.findOneAndDelete({ userId, _id: resumeId })

        //reurn a success message
        return res.status(200).json({
            success: true,
            message: "Resume deleted Successfully",
        })

    } catch (error) {
        console.log("error :- ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//get user resume by id
//GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            return res.status(400).json({
                success: false,
                message: "Resume not found"
            })
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        //reurn a success message
        return res.status(200).json({
            success: true,
            message: "Resume found Successfully",
            resume: resume
        })

    } catch (error) {
        console.log("error :- ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//get resume by id public
//GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ public: true, _id: resumeId });

        if (!resume) {
            return res.status(400).json({
                success: false,
                message: "Resume not found or resume is private"
            })
        }

        //reurn a success message
        return res.status(200).json({
            success: true,
            message: "Resume found Successfully",
            resume: resume
        })

    } catch (error) {
        console.log("error :- ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//controller for updating resume
//PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        const resumeDataCopy = JSON.parse(JSON.stringify(resumeData));

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);

            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: "user-resumes",
                transformation: {
                    pre: "w-300, h-300, fo-face, z-0.75" + (removeBackground ? ",e-bgremove" : "")
                }
            });

            resumeDataCopy.personal_info.image = response.url;
        }

        const resume = await Resume.findByIdAndUpdate({ userId, _id: resumeId }, resumeDataCopy, { new: true });

        return res.status(200).json({
            success: true,
            message: "Resume updated Successfully",
            resume: resume
        })

    } catch (error) {
        console.log("error :- ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}





// import imagekit from "../configs/imageKit.js";
// import Resume from "../models/Resume.js";
// import fs from "fs";

// // controller for creating a new resume
// // POST: /api/resumes/create
// export const createResume = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { title } = req.body;

//         // create a new resume
//         const newResume = await Resume.create({ userId, title });

//         // return a success message
//         return res.status(200).json({
//             success: true,
//             message: "Resume created Successfully",
//             resume: newResume
//         });

//     } catch (error) {
//         console.log("error :- ", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// // controller for deleting a resume
// // DELETE: /api/resumes/delete
// export const deleteResume = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { resumeId } = req.params;

//         // delete a resume
//         const deletedResume = await Resume.findOneAndDelete({
//             userId,
//             _id: resumeId
//         });

//         if (!deletedResume) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Resume not found"
//             });
//         }

//         // return a success message
//         return res.status(200).json({
//             success: true,
//             message: "Resume deleted Successfully",
//         });

//     } catch (error) {
//         console.log("error :- ", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// // get user resume by id
// // GET: /api/resumes/get
// export const getResumeById = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { resumeId } = req.params;

//         const resume = await Resume
//             .findOne({ userId, _id: resumeId })
//             .select("-__v -createdAt -updatedAt");

//         if (!resume) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Resume not found"
//             });
//         }

//         // return a success message
//         return res.status(200).json({
//             success: true,
//             message: "Resume found Successfully",
//             resume: resume
//         });

//     } catch (error) {
//         console.log("error :- ", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// // get resume by id public
// // GET: /api/resumes/public
// export const getPublicResumeById = async (req, res) => {
//     try {
//         const { resumeId } = req.params;

//         const resume = await Resume.findOne({
//             public: true,
//             _id: resumeId
//         });

//         if (!resume) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Resume not found or resume is private"
//             });
//         }

//         // return a success message
//         return res.status(200).json({
//             success: true,
//             message: "Resume found Successfully",
//             resume: resume
//         });

//     } catch (error) {
//         console.log("error :- ", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// // controller for updating resume
// // PUT: /api/resumes/update
// export const updateResume = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { resumeId, resumeData, removeBackground } = req.body;
//         const image = req.file;

//         const resumeDataCopy = JSON.parse(JSON.stringify(resumeData));

//         if (image) {
//             const imageBufferData = fs.createReadStream(image.path);

//             const response = await imagekit.files.upload({
//                 file: imageBufferData,
//                 fileName: `resume-${Date.now()}.png`,
//                 folder: "user-resumes",
//                 transformation: {
//                     pre: "w-300,h-300,fo-face,z-0.75" +
//                         (removeBackground ? ",e-bgremove" : "")
//                 }
//             });

//             if (!resumeDataCopy.personal_info) {
//                 resumeDataCopy.personal_info = {};
//             }

//             resumeDataCopy.personal_info.image = response.url;
//         }

//         const resume = await Resume.findOneAndUpdate(
//             { userId, _id: resumeId },
//             resumeDataCopy,
//             { new: true }
//         );

//         if (!resume) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Resume not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Resume updated Successfully",
//             resume: resume
//         });

//     } catch (error) {
//         console.log("error :- ", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };
