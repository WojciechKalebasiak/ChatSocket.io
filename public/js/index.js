const socket = io();
socket.on('newMessage', function (data) {
    console.log(`Hey you have new message!`);
    console.log(`From: ${data.from}`);
    console.log(data.text);
    console.log(data.createdAt);
});