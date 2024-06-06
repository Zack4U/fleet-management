module.exports = function isAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "User is not an admin" });
    }

    next();
};
