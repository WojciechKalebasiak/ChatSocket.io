const socket = io();
socket.on('newMessage', function (data) {
    console.log(`From: ${data.from}`);
    console.log(data.text);
});