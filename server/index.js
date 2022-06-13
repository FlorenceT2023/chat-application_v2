const express = require('express');
const app = express();
const http = require('http'); // builds server with socket.io
const cors = require('cors');  // helps deal with CORS-related issues
const { Server } = require("socket.io")

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

// listening to event called "connection"
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data)=> {
        console.log(data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3001, () => {
    console.log('SERVER RUNNING');
});
