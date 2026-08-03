const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authUser(req, res, next) {
    let token = req.cookies.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userModel.findById(decoded.id).select("-passwordHash");
        if (!user) {
            return res.status(401).json({ success: false, message: "User no longer exists." });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
}

module.exports = { authUser };