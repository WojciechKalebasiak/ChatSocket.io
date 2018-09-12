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
    $('[name=message]').val('');

});
socket.on('newMessage', function (data) {
    var li = $('<li>');
    li.text(`${data.from}: ${data.text}`);
    $('#messages').append(li);
});
socket.on('newLocationMessage', function (data) {
    var li = $('<li>');
    var a = $('<a>');
    
    a.text('Click here to get my location!');
    a.attr('href', `${data.url}`);
    a.attr('target', '_blank');

    li.text(`${data.from}: `);
    li.append(a);

    $('#messages').append(li);
});
var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', { latitude: position.coords.latitude, longitude: position.coords.longitude });
    }, function () {
        alert('Unable to fetch location');
    })
})