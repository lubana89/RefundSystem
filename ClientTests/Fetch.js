Fetch={
    sendRequest : function(callbacks,configuration) {
        $.ajax({
            url:configuration.url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                callbacks.checkForInformation(data);
            },
            error: function(data) {
                callbacks.displayErrorMessage();
            },
            timeout: configuration.remainingCallTime
        });
    }
};