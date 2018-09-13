const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const { isRealString } = require('./utils/validation');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { UsersService } = require('./utils/users');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new UsersService();

io.on('connection', (socket) => {
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });
    socket.on('createMessage', message => {
        const user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
    });
    socket.on('createLocationMessage', (coords) => {
        const user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left chat.`));
        }
    });
});
io.on('connection', (socket) => {
});
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

server.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`);
});