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
