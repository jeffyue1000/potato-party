const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors()); // Enable CORS for all routes

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("sync-playback", (data) => {
        console.log("Received synced playback:", data);

        // socket.broadcast.emit("sync-playback", data);

        io.emit("sync-playback", data);
    })

    socket.on("seek", (data) => {
        console.log("Received seek:", data);

        // socket.broadcast.emit("seek", data);

        io.emit("seek", data);
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected");
        socket.removeAllListeners();
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});