"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    }
});
io.on("connection", (socket) => {
    console.log("Socket Connected : ", socket.id);
    socket.on('send_data', (data) => {
        console.log('Data received from send:', data);
        // Broadcast the data to all connected clients
        io.emit('screen_data', data);
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected : ", socket.id);
    });
});
app.get('/', (req, res) => {
    res.send("Server up and running");
});
httpServer.listen(8000, () => {
    console.log(`Server is running on the port 8000`);
});
