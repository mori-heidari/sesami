require("dotenv").config();
const http = require("http");
const app = require("./app");
const PORT = process.env.PORT||3000;
const server = http.createServer(app);
async function main() {
    try {

        server.listen(PORT, () => {
            console.log(`NODE ENV is ${process.env.NODE_ENV}`);
            console.log(`app is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("error in starting server");
    }
}
main();
