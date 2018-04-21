/**
 * Login function
 */
login = function () {
    var data = {username: $('#username').val(), password: $('#password').val()};
    if (data.username === '' || data.password === '') {
        alert("please fill the username and password field completely");
        return;
    }
    dataExchange('/v1/user/session/', 'post', JSON.stringify(data), function (status, json) {
        if (status === 201) {
            // login success
            localStorage.setItem("auth", json.data.auth);
            localStorage.setItem("username", $('#username').val());
            return;
        }
        alert(json.message);
    });
};

/**
 * Sign out function
 */
logout = function () {
    dataExchange('/v1/user/session/', 'delete', null, function (status) {
        if (status === 204) {
            // logout success
            localStorage.clear();
        }
    });
};
