const socket = io();
function scrollToBottom() {
    //selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}
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
    var template = $("#message-template").html();
    var formattedTime = moment(data.createdAt).format('HH:mm');
    var html = Mustache.render(template, { text: data.text, from: data.from, createdAt: formattedTime });
    $('#messages').append(html);
    scrollToBottom();
});
socket.on('newLocationMessage', function (data) {
    var formattedTime = moment(data.createdAt).format('HH:mm');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, { from: data.from, createdAt: formattedTime, url: data.url });
    $('#messages').append(html);
    scrollToBottom();
});
var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled', 'disabled');
    locationButton.text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');
        socket.emit('createLocationMessage', { latitude: position.coords.latitude, longitude: position.coords.longitude });
    }, function () {
        locationButton.removeAttr('disabled');
        alert('Unable to fetch location');
    })
})