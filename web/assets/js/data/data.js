apiHost = "http://localhost:8080";


dataExchange = function (uri, method, inputData, completeFunction) {
    $.ajax({
        type: method,
        url: apiHost + uri,
        contentType: 'application/json',
        data: inputData,
        dataType: "json",
        async: true,
        complete: function (xhr) {
            completeFunction(xhr.status, xhr.responseJSON)
        }
    });
};



