function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `Forbidden. Access is restricted to roles: [${roles.join(", ")}]. Current role: ${req.user.role}` 
            });
        }

        next();
    };
}

module.exports = { authorize };
