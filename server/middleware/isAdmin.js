module.exports = function isAdmin(req, res, next) {
    try {
        if (req.user.role.trim() !== "ADMIN") {
            return res.status(403).json({ error: "User is not an admin" });
        }

        next();
    } catch (error) {
        console.log(error);
    }
};
