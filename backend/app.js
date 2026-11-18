const { router } = require("./src/routes/router");

const app = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    router(req, res, pathname);
};

module.exports = { app };