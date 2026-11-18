const { userRoutes } = require("./userRoutes.js")

const router = (req, res, pathname) => {
    userRoutes(req, res, pathname);
};

module.exports = { router };