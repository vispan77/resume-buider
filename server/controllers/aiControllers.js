// import ai from "../configs/ai.js";
// import Resume from "../models/Resume.js";


// //controller for enchancing a resume for professinal summary
// //POST : /api/ai/enchance-pro-sum
// export const enhanceProfessionalSummary = async (req, res) => {
//     try {
//         const { userContent } = req.body;

//         if (!userContent) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing requires fields"
//             })
//         }

//         const response = await ai.chat.completions.create({
//             model: process.env.OPENAI_MODEL,
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentence also highlighting key skills, experience, and career objective. make it compiling and ATS friendly and only return text no options or anything else"
//                 },
//                 {
//                     role: "user",
//                     content: userContent,
//                 },
//             ]
//         });

//         const enhancesContent = response.choices[0].message.content;

//         return res.status(200).json({
//             success: true,
//             message: "Enhanced Resume created Successfully",
//             enhancedContent: enhancedContent
//         })
//     } catch (error) {
//         console.log("error :- ", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


// //controller for enchancing a resume for job description
// //POST : /api/ai/enchance-job-des
// export const enhanceJobDescription = async (req, res) => {
//     try {
//         const { userContent } = req.body;

//         if (!userContent) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing requires fields"
//             })
//         }

//         const response = await ai.chat.completions.create({
//             model: process.env.OPENAI_MODEL,
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentence also highlighting key responsibilities and achievement. use action words and quantifiable results where possible. make it  ATS friendly and only return text no options or anything else"
//                 },
//                 {
//                     role: "user",
//                     content: userContent,
//                 },
//             ]
//         });

//         const enhancedContent = response.choices[0].message.content;

//         return res.status(200).json({
//             success: true,
//             message: "Enhanced Resume created Successfully",
//             enhancedContent: enhancesContent
//         })
//     } catch (error) {
//         console.log("error :- ", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }



// //controller for uploading a resume to the database
// //POST : /api/ai/upload-resume
// export const uploadResume = async (req, res) => {
//     try {
//         const { resumeText, title } = req.body;
//         const userId = req.userId;

//         if (!resumeText) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing requires fields"
//             })
//         }

//         const systemPrompt = "You are an Expert AI agent to extract data from the resume";

//         const userPrompt = `extract data from this resume :- ${resumeText}
//         Provide data in the following JSON format with no additional text before or after:
//         {
//             professional_summary: {
//             type: String,
//             default: ""
//             },
//             skills: [{ type: String }],
//             personal_info: {
//                 image: {type: String, default: ""},
//                 full_name: {type: String, default: ""},
//                 profession: {type: String, default: ""},
//                 email: {type: String, default: ""},
//                 phone: {type: String, default: ""},
//                 location: {type: String, default: ""},
//                 lninkdin: {type: String, default: ""},
//                 website: {type: String, default: ""},
//             },
//             experience: [
//                 {
//                     company: {type: String},
//                     position: {type: String},
//                     start_date: {type: String},
//                     end_date: {type: String},
//                     description: {type: String},
//                     is_current: {type: Boolean},
//                 }
//             ],
//             project: [
//                 {
//                     name: {type: String},
//                     type: {type: String},
//                     description: {type: String},          
//                 }
//             ],
//             education: [
//                 {
//                     institution: {type: String},
//                     degree: {type: String},
//                     field: {type: String},
//                     graduation_date: {type: String},
//                     gpa: {type: String},
//                 }
//             ]
//         }`

//         const response = await ai.chat.completions.create({
//             model: process.env.OPENAI_MODEL,
//             messages: [
//                 {
//                     role: "system",
//                     content: systemPrompt
//                 },
//                 {
//                     role: "user",
//                     content: userPrompt,
//                 },
//             ],
//             response_format: {
//                 type: "json_object"
//             }
//         });

//         const extractedData = response.choices[0].message.content;

//         const parsedData = JSON.parse(extractedData);

//         const newResume = await Resume.create({
//             userId, title, ...parsedData
//         })

//         return res.status(200).json({
//             success: true,
//             message: "Enhanced Resume created Successfully",
//             resumeId: newResume._id
//         })
//     } catch (error) {
//         console.log("error :- ", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }









// //gpt code with prompt
// import fetch from "node-fetch";

// /*
// |--------------------------------------------------------------------------
// |  Helper Function: Call AIMLAPI
// |--------------------------------------------------------------------------
// */

// const generateAIResponse = async (messages) => {
//   try {
//     const response = await fetch(
//       "https://api.aimlapi.com/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: process.env.OPENAI_MODEL, // google/gemma-3-4b-it
//           messages: messages,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       console.log("AIMLAPI ERROR:", data);
//       throw new Error("AIMLAPI request failed");
//     }

//     return data.choices[0].message.content;

//   } catch (error) {
//     console.log("AI ERROR:", error.message);
//     throw error;
//   }
// };


// /*
// |--------------------------------------------------------------------------
// |  Enhance Professional Summary
// |--------------------------------------------------------------------------
// */

// export const enhanceProfessionalSummary = async (req, res) => {
//   try {
//     const { summary } = req.body;

//     if (!summary) {
//       return res.status(400).json({ message: "Summary is required" });
//     }

//     const aiResponse = await generateAIResponse([
//       {
//         role: "user",
//         content: `Improve this professional resume summary and make it more impactful:\n\n${summary}`
//       }
//     ]);

//     res.status(200).json({
//       success: true,
//       enhancedSummary: aiResponse,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to enhance professional summary",
//     });
//   }
// };


// /*
// |--------------------------------------------------------------------------
// |  Enhance Job Description
// |--------------------------------------------------------------------------
// */

// export const enhanceJobDescription = async (req, res) => {
//   try {
//     const { description } = req.body;

//     if (!description) {
//       return res.status(400).json({ message: "Job description is required" });
//     }

//     const aiResponse = await generateAIResponse([
//       {
//         role: "user",
//         content: `Rewrite this job description professionally and make it ATS-friendly:\n\n${description}`
//       }
//     ]);

//     res.status(200).json({
//       success: true,
//       enhancedDescription: aiResponse,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to enhance job description",
//     });
//   }
// };


// /*
// |--------------------------------------------------------------------------
// |  Upload Resume (Basic Text Enhancement Example)
// |--------------------------------------------------------------------------
// */

// export const uploadResume = async (req, res) => {
//   try {
//     const { resumeText } = req.body;

//     if (!resumeText) {
//       return res.status(400).json({ message: "Resume text is required" });
//     }

//     const aiResponse = await generateAIResponse([
//       {
//         role: "user",
//         content: `Analyze and improve this resume content professionally:\n\n${resumeText}`
//       }
//     ]);

//     res.status(200).json({
//       success: true,
//       improvedResume: aiResponse,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to process resume",
//     });
//   }
// };
















//gpt code without prompt but working propely and giving longer response
import fetch from "node-fetch";

/*
|--------------------------------------------------------------------------
|  Helper: Call AIMLAPI
|--------------------------------------------------------------------------
*/

const generateAIResponse = async (messages) => {
    try {
        const response = await fetch(
            "https://api.aimlapi.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: process.env.OPENAI_MODEL,
                    messages: messages,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log("AIMLAPI ERROR:", data);
            throw new Error(data?.message || "AIMLAPI request failed");
        }

        return data.choices[0].message.content;

    } catch (error) {
        console.log("AI ERROR:", error.message);
        throw error;
    }
};


/*
|--------------------------------------------------------------------------
|  Enhance Professional Summary
|--------------------------------------------------------------------------
*/

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({
                message: "User content is required",
            });
        }

        const aiResponse = await generateAIResponse([
            {
                role: "user",
                content: userContent,
            },
        ]);

        // const aiResponse = await generateAIResponse([
        //     {
        //         role: "system",
        //         content: "You are a professional resume writer. Generate ONLY one short professional summary in 3-4 lines. No explanations, no options, no bullet points, no extra text. Keep it concise, impactful, and job-ready."
        //     },
        //     {
        //         role: "user",
        //         content: userContent,
        //     },
        // ]);

        res.status(200).json({
            success: true,
            enhancedContent: aiResponse, // ✅ matches frontend
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to enhance summary",
        });
    }
};


/*
|--------------------------------------------------------------------------
|  Enhance Job Description
|--------------------------------------------------------------------------
*/

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({
                message: "User content is required",
            });
        }

        const aiResponse = await generateAIResponse([
            {
                role: "user",
                content: userContent,
            },
        ]);

        res.status(200).json({
            success: true,
            enhancedContent: aiResponse, // ✅ matches frontend
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to enhance job description",
        });
    }
};


/*
|--------------------------------------------------------------------------
|  Upload Resume
|--------------------------------------------------------------------------
*/

export const uploadResume = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({
                message: "User content is required",
            });
        }

        const aiResponse = await generateAIResponse([
            {
                role: "user",
                content: userContent,
            },
        ]);

        res.status(200).json({
            success: true,
            enhancedContent: aiResponse, // ✅ matches frontend
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to process resume",
        });
    }
};






