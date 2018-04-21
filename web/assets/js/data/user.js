/**
 * Login function
 */
signIn = function () {
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
            dataExchange('/v1/auth/permission', 'get', {
                mode: 'summary',
                condition: 'user',
                value: localStorage.getItem('username')
            }, function (status, json) {
                if (status === 200) {
                    var permissions = json.data.permissions;
                    var result = '';
                    for (var i = 0; i < permissions.length; i++) {
                        result += permissions[0].name + "|";
                    }
                    localStorage.setItem("permissions", result);
                    window.location.href = "index.html";
                    return;
                }
                // log out when get permissions failed
                logout();
            });
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
            window.location.href = "login.html";
        }
    });
};
