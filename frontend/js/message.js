$(document).ready(function () {
  //make sure user is logged in
  if (!window.localStorage.login_token) {
    window.location.href = "index.html";
  }

  //set ajax headers
  $.ajaxSetup({
    headers: { 'eat': window.localStorage.login_token }
  });

  getAll();
  // var thread = {
  //   threadName: 'testThread',
  //   users: ['Jim', 'Bill']
  // };
  // newThread();
  // var message = {
  //   threadName: 'testThread',
  //   message: 'I said what?!?!'
  // };
  // newMessage();

  //get all threads/messages
  function getAll() {
    $.ajax({
      type: 'GET',
      url: '/api/threads',
      success: function(data) {
        $.each(data.threads, function(i, thread) {
          $.each(thread.messages,function(i,message){
            // $('#chat-box').append('<p>' + ' '+ thread.roomID +' '+ message.username + ' ' + message.message +'<p>');
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
  function newThread(e) {
    $.ajax({
      type: 'POST',
      url: '/api/threads',
      contentType: 'application/json',
      data: JSON.stringify(thread),
      success: function(data) {
        console.log(data);
      },
      failure: function(err) {
        console.log(err);
      }
    });
  }

  //create a new message
  function newMessage(e) {
    $.ajax({
      type: 'POST',
      url: '/api/message',
      contentType: 'application/json',
      data: JSON.stringify(message),
      success: function(data) {
        console.log(data);
      },
      failure: function(err) {
        console.log(err);
      }
    });
  }
});
