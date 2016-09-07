describe("Fetch Basic Data Ajax Tests", function() {
    // for each wish reason condition
    var configuration = { url: "http://localhost:80/refundSystem/server.php/wish",
        remainingCallTime: 30000
    };

    it("should make an Ajax request to the correct URL", function() {
        spyOn($, "ajax");
        Fetch.sendRequest(undefined, configuration);
        expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(configuration.url);
    });
    it("should receive a successful response", function() {
        spyOn($, "ajax").and.callFake(function(e) {
            e.success({});
        });

        var callbacks = {
            checkForInformation: jasmine.createSpy(),
            displayErrorMessage: jasmine.createSpy(),
        };

        Fetch.sendRequest(callbacks, configuration);
        expect(callbacks.checkForInformation).toHaveBeenCalled();  //Verifies this was called
        expect(callbacks.displayErrorMessage).not.toHaveBeenCalled();  //Verifies this was NOT called
    });

    it("should receive an Ajax error", function() {
        spyOn($, "ajax").and.callFake(function(e) {
            e.error({});
        });

        var callbacks = {
            displayErrorMessage : jasmine.createSpy()
        };

        Fetch.sendRequest(callbacks, configuration);
        expect(callbacks.displayErrorMessage).toHaveBeenCalled();

    });
});