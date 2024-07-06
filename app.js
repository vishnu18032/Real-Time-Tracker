const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

// Exporting socket.io
const socketio = require('socket.io');

// Creating server
const server = http.createServer(app);
const io = socketio(server);

// Set ejs as the view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    console.log("connected");

    // Handle send-location event
    socket.on("send-location", function(data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Handle disconnect event
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
        console.log("disconnected");
    });
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});


