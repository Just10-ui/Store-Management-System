const { createServer } = require("http");
const { app } = require("./app.js");
const PORT = 8080;

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});