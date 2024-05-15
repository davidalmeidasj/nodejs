require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // attach socket.io to the server

io.on('connection', (socket) => {
    console.log('A user connected');

    // Example of emitting a message to all clients
    socket.on('update menu', (menuData) => {
        io.emit('menu updated', menuData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
