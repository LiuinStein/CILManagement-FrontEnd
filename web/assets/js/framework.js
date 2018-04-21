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
    "personnel": {},
    "authorization": {},
    "project": {},
    "team": {},
    "resource": {}
};

permissionFunctionMap = {
    "Sign up": "SignUp",
    "Delete an account": "DeleteAccount",
    "Modify member's info": "ModifyMemberInfo",
    "Modify password": "ModifyPassword",
    "Initialize password": "InitializePassword",
    "Query member's info": "QueryMemberInfo",
    "Enable/Disable an account": "En-DisableAccount"
};

functionURIMap = {
    // "SignUp":
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
            var name = idPermissionTable[bar][i];
            var id = permissionFunctionMap[name];
            var html = "<li id='" + id + "'><a onclick=\"loadFrameURI('" + id + "')\">" + name + "</a></li>";
            $("#functionDropDown").append(html);
        }
    }
    $("#functionCount").text(functionCount);
};
