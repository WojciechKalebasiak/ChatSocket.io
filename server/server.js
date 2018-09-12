const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    socket.on('createMessage', message => {
        io.emit('newMessage', {
            from: message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });
    });
});
io.on('connection', (socket) => {
});
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

server.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`);
});