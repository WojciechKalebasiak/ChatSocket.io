const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    socket.on('createMessage', message => {
        io.emit('newMessage', generateMessage(message.from, message.text));
    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
    })
});
io.on('connection', (socket) => {
});
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

server.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`);
});