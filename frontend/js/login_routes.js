$(document).ready(function () {
  $('#login').click(login);
  $('#create_new').click(create_new);

  function login(e) {
    e.preventDefault();
    var basicAuth = $('#name').val() + ':' + $('#password').val();
    $.ajax({
      type: 'GET',
      url: '/api/sign_in',
      contentType: 'application/json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          'Authorization',
          'Basic ' + btoa(basicAuth)
        );
      },
      success: saveToken
    });
  }

  function create_new(e) {
    e.preventDefault();
    var userData = {
      username: $('#new_username').val(),
      email: $('#new_email').val(),
      password: $('#new_password').val()
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(userData),
      contentType: 'application/json',
      url: '/api/create_new_user',
      success: saveToken
    });
  }

  function saveToken(data) {
    var token = data.token;
    window.localStorage.setItem("login_token", token);
    window.location.href = "chat.html";
  }
});
