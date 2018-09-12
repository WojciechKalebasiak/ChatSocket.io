const socket = io();
$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage',
        {
            from: 'User',
            text: $('[name=message]').val()
        },
        function (e) {

        });

});
socket.on('newMessage', function (data) {
    var li = $('<li>');
    li.text(`${data.from}: ${data.text}`);
    $('#messages').append(li);
});