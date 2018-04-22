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
                        result += permissions[i].name + "|";
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

/**
 * Load college
 */
loadCollege = function () {
    dataExchange('/v1/user/department', 'GET', {"condition": "college"}, function (status, json) {
        if (status === 200) {
            colleges = json.data.college;
            for (var i = 0; i < colleges.length; i++) {
                $("#college").append('<option value="' + colleges[i].id + '">' + colleges[i].name + '</option>')
            }
            return;
        }
        alert(json.message);
    })
};

/**
 * load classes by college id
 */
loadClass = function (college) {
    dataExchange('/v1/user/department', 'GET', {"condition": "class", "value": college}, function (status, json) {
        if (status === 200) {
            classes = json.data.class;
            for (var i = 0; i < classes.length; i++) {
                $("#class").append('<option value="' + classes[i].id + '">' + classes[i].name + '</option>')
            }
            return;
        }
        alert(json.message);
    });
};


loadUserInfo = function (id) {
    dataExchange('/v1/user/info', 'GET', {"mode": "all", "condition": "id", "value": id}, function (status, json) {
        if (status === 200) {
            user = json.data.users[0];
            $("#username").val(user.id);
            $("#name").val(user.name);
            $("#gender").val(user.gender);
            $("#birthday").val(user.birthday);
            $("#enroll").val(user.enrollTime);
            $("#exit").val(user.exitTime);
            $("#email").val(user.email);
            $("#phone").val(user.phone);
            $("#achievement").text(user.achievement);
            return;
        }
        alert(json.message);
    });
};


updateUserInfo = function () {
    data = {
        "id": $("#username").val(),
        "name": $("#name").val(),
        "gender": $("#gender").val(),
        "enroll_time": $("#enroll").val(),
        "exit_time": $("#exit").val(),
        "birthday": $("#birthday").val(),
        "email": $("#email").val(),
        "phone": $("#phone").val(),
        "achievement": $("#achievement").text()
    };
    dataExchange('/v1/user/info/', 'PUT', JSON.stringify(data), function (status, json) {
        alert(json.message);
    });
};
