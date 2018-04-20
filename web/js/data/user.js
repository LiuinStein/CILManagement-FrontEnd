
/*
 * Login function
 */
login = function () {
    var data = {username: $('#username').val(), password: $('#password').val()};
    if (data.username === '' || data.password === '') {
        alert("please fill the username and password field completely");
    }
    dataExchange('/v1/user/session/', 'post', JSON.stringify(data), function (status, json) {
        if (status === 201) {
            // login success
            alert("success");
        }
        alert(json.message);
    });
};