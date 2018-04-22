loginChecker = function () {
    if (localStorage.getItem("username") === null || localStorage.getItem("auth") === null) {
        alert("need log in");
    }
};

changeCategory = function (target) {
    if (target === localStorage.getItem("activeBar")) {
        return;
    }
    $("#" + localStorage.getItem("activeBar")).removeClass("active");
    $("#activeBarName").text($("#" + target).addClass("active").text().trim());
    localStorage.setItem("activeBar", target);
    $("#functionDropDown").empty();
    if (target === "paper") {
        loadFrameURI("paper");
        $("#functionCount").text(0);
        return;
    }
    loadFrameURI("welcome");
    loadFunctionsByPermission(target);
};

popNotify = function (level, message) {
    $.notify({
        icon: level === 0 ? 'ti-check' : 'ti-close',
        message: message
    }, {
        type: level === 0 ? 'success' : 'danger',
        timer: 40000
    });
};

idPermissionTable = {
    "welcome": {},
    "personnel": {
        "Sign up": "SignUp",
        "Delete an account": "DeleteAccount",
        "Modify member's info": "ModifyMemberInfo",
        "Modify password": "ModifyPassword",
        "Initialize password": "InitializePassword",
        "Query member's info": "QueryMemberInfo",
        "Enable or disable an account": "En-DisableAccount"
    },
    "authorization": {},
    "project": {},
    "team": {},
    "resource": {}
};

functionURIMap = {
    "welcome": "welcome.html",
    "SignUp": "sign-up.html",
    "ModifyMemberInfo": "modify-user.html",
    "ModifyPassword": "set-password.html",
    "DeleteAccount": "delete-user.html",
    "InitializePassword": "init-password.html",
    "paper": "https://mail.163.com/"
//         "DeleteAccount":
// "ModifyMemberInfo":
// "ModifyPassword":
// "InitializePassword":
// "QueryMemberInfo":
// "En-DisableAccount"
};

loadFrameURI = function (name) {
    if (typeof(functionURIMap[name]) === "undefined") {
        alert("Error was happened, please refresh this page!");
        return;
    }
    $("#functionFrame").attr("src", functionURIMap[name]);
};

loadFunctionsByPermission = function (bar) {
    var permissions = localStorage.getItem('permissions');
    if (typeof(idPermissionTable[bar]) === "undefined") {
        alert("Error was happened, please refresh this page!");
        return;
    }
    var functionCount = 0;
    for (var i in idPermissionTable[bar]) {
        if (permissions.indexOf(i) >= 0) {
            functionCount++;
            var id = idPermissionTable[bar][i];
            var html = "<li id='" + id + "'><a onclick=\"loadFrameURI('" + id + "')\">" + i + "</a></li>";
            $("#functionDropDown").append(html);
        }
    }
    $("#functionCount").text(functionCount);
};
