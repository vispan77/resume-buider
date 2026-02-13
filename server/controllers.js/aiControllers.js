import ai from "../configs/ai";


//controller for enchancing a resume for professinal summary
//POST : /api/ai/enchance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({
                success: false,
                message: "Missing requires fields"
            })
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentence also highlighting key skills, experience, and career objective. make it compiling and ATS friendly and only return text no options or anything else"
                },
                {
                    role: "user",
                    content: userContent,
                },
            ]
        });

        const enhancesContent = response.choices[0].message.content;

        return res.status(200).json({
            success: true,
            message: "Enhanced Resume created Successfully",
            enhancesContent: enhancesContent
        })
    } catch (error) {
        console.log("error :- ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//controller for enchancing a resume for job description
//POST : /api/ai/enchance-job-des
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({
                success: false,
                message: "Missing requires fields"
            })
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentence also highlighting key responsibilities and achievement. use action words and quantifiable results where possible. make it  ATS friendly and only return text no options or anything else"
                },
                {
                    role: "user",
                    content: userContent,
                },
            ]
        });

        const enhancesContent = response.choices[0].message.content;

        return res.status(200).json({
            success: true,
            message: "Enhanced Resume created Successfully",
            enhancesContent: enhancesContent
        })
    } catch (error) {
        console.log("error :- ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}