$('.room-list').on('click', 'li', function() {
    var roomName = $(this).data('roomname');
    $('.items').hide();
    $('#' + roomName).show();
    $('.room-list li').removeClass('active');
    $(this).addClass('active');
});
