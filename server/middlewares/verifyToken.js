const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const headerToken = req.headers["authorization"];

        if (!headerToken) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decode = jwt.verify(headerToken, process.env.SECRET_CODE);
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            errorMessage: "Invalid token!",
            isTokenExpires: true,
        });
    }
};

// const decodeJwtToken = (authHeader) => {
//     try {
//         if (!authHeader) return;
//         const decode = jwt.verify(authHeader, process.env.SECRET_CODE);
//         const userId = decode.userId || null;
//         return userId;
//     } catch (error) {
//         console.log(error);
//     }
// };

const decodeJwtToken = (authHeader) => {
    try {
        if (!authHeader || typeof authHeader !== "string") {
            return null; // Return null if authHeader is not a string or is empty
        }

        const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return null; // Return null if token is not found
        }

        const decode = jwt.verify(token, process.env.SECRET_CODE);
        const userId = decode.userId || null;
        return userId;
    } catch (error) {
        console.log(error);
        return null; // Return null if there's an error decoding the token
    }
};

module.exports = { verifyToken, decodeJwtToken };
