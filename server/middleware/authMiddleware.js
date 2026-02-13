import jwt from "jsonwebtoken"

const protect = async (req, resizeBy, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "token is Unathorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next()
    } catch (error) {
        console.error("error :-", error)
        return res.status(400).json({
            success: false,
            message: "token is Unathorized"
        })
    }
}

export default protect;