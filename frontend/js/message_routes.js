$(document).ready(function () {
  //make sure user is logged in
  if (!window.localStorage.login_token) {
    window.location.href = "index.html";
  }

  //set ajax headers
  $.ajaxSetup({
    headers: { 'eat': window.localStorage.login_token }
  });

  $("#create_room").click(function(e) {
    e.preventDefault();
    var room = prompt("Name of Room");
    var invitedUsers = [];
    do {
      var name = prompt("Name of User");
      if (name) {invitedUsers.push(name);}
    } while (name);
    newThread({
      threadName: room,
      users: invitedUsers
    });
  });

  $("#send").click(function(e) {
    e.preventDefault();
    var message = $("#message-text").val();
    var threadName = $('.room-list li.active').data('roomname');
    newMessage({
      threadName: threadName,
      message: message
    });
  });

  getAll();

  function renderThread(threadName) {
    $('.room-list').append('<li data-roomname="' + threadName + '">' + threadName + '</li>');
    var sectionHTML = (
      '<section class="items" id="' + threadName + '">' +
        '<h2>' + threadName + '</h2>' +
        '<ul></ul>' +
      '</section>');
    $('#section_container').append(sectionHTML);
  }

  function clearThreads() {
     $('.room-list').empty();
  }

  function renderMessage (threadName, message) {
    var text = message.username + '[' + message.timeStamp + ']: ' + message.message;
    $('section#'+ threadName).children('ul').append(text);
  }

  function clearMessages() {
    $('#section_container').empty();
  }

  //get all threads/messages
  function getAll() {
    $.ajax({
      type: 'GET',
      url: '/api/threads',
      success: function(data) {
        clearThreads();
        clearMessages();
        $.each(data.threads, function(i, thread) {
          renderThread(thread.threadName);
          $.each(thread.messages,function(i,message){
            renderMessage(thread.threadName, message);
          });
        });

        //send refresh request in 12 seconds
        setTimeout(getAll, 1000 * 60 * .2);
      },
      failure: function(err) {
        console.log(err);
        //send refresh request in 12 seconds
        setTimeout(getAll, 1000 * 60 * .2);
      }
    });
  }

  //create a new thread
  function newThread(thread) {
    $.ajax({
      type: 'POST',
      url: '/api/threads',
      contentType: 'application/json',
      data: JSON.stringify(thread),
      success: function(data) {
        console.log(data);
        renderThread(data.threadName);
      },
      failure: function(err) {
        console.log(err);
      }
    });
  }

  //create a new message
  function newMessage(message) {
    $.ajax({
      type: 'POST',
      url: '/api/message',
      contentType: 'application/json',
      data: JSON.stringify(message),
      success: function(data) {
        console.log(data);
        var message = {
          username: data.message.authorName,
          timeStamp: data.message.timeStamp,
          message: data.message.text
        };
        renderMessage(data.message.threadName, message);
      },
      failure: function(err) {
        console.log(err);
      }
    });
  }
});
