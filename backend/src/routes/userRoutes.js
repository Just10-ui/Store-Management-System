const { signup } = require("../controller/authController.js")

const userRoutes = (req, res, pathname) => {
    if (req.method === 'POST' && pathname === '/api/users/signup') return signup(req, res);
};

module.exports = { userRoutes };