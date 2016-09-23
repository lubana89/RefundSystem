describe("Communication", function () {
    beforeEach(module('RefundSystemApp'));

    var service, httpBackend;

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('$auth', auth);
        });
    });
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            httpBackend = $injector.get('$httpBackend');
            service = $injector.get('CommunicationSVC');
        })
    });

    describe('GetAllNotifications', function () {
        it("return a list of all Notifications", inject(function () {
            httpBackend.expectGET(configuration.path + '/Communication/GetAllNotifications/' + user.id + '?token=' + auth.getToken()).respond(true);
            service.GetAllNotifications().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('MarkReadNotification', function () {
        it("return a list of all MarkReadNotification", inject(function () {
            httpBackend.expectGET(configuration.path + '/Communication/MarkRead/' + testId + '?token=' + auth.getToken()).respond(true);
            service.MarkReadNotification(testId).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('MarkUnReadNotification', function () {
        it("return a list of all MarkUnReadNotification", inject(function () {
            httpBackend.expectGET(configuration.path + '/Communication/MarkUnRead/' + testId + '?token=' + auth.getToken()).respond(true);
            service.MarkUnReadNotification(testId).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('GetMessageChain', function () {
        it("return a list of all GetMessageChain", inject(function () {
            httpBackend.expectGET(configuration.path + '/Communication/GetChainNotifications/' + testId + '?token=' + auth.getToken()).respond(true);
            service.GetMessageChain(testId).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });
    describe('GetNotificationCount', function () {
        it("return a list of all GetNotificationCount", inject(function () {
            httpBackend.expectGET(configuration.path + '/Communication/GetNotificationCount/' + user.id + '?token=' + auth.getToken()).respond(true);
            service.GetNotificationCount().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });
    describe('GetTopFiveNotification', function () {
        it("return a list of all GetTopFiveNotification", inject(function () {
            httpBackend.expectGET(configuration.path + '/Communication/GetTopFiveNotifications/' + user.id + '?token=' + auth.getToken()).respond(true);
            service.GetTopFiveNotification().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });
    describe('MarkAllNotificationRead', function () {
        it("return a list of all MarkAllNotificationRead", inject(function () {
            httpBackend.expectGET(configuration.path + '/Communication/MarkAllNotificationRead/' + user.id + '?token=' + auth.getToken()).respond(true);
            service.MarkAllNotificationRead().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });
    describe('GetAllMessages', function () {
        it("return a list of all Notifications", inject(function () {
            httpBackend.expectGET(configuration.path + '/Communication/GetAllMessage/' + testId + '?token=' + auth.getToken()).respond(true);
            service.GetAllMessages(testId).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('GetAllImages', function () {
        it("return a list of all GetAllImages", inject(function () {
            httpBackend.expectGET(configuration.path + '/Communication/File/GetAllImages/' + testId + '?token=' + auth.getToken()).respond(true);
            service.GetAllImages(testId).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });



    describe('ReplyNotification', function () {
        it("should update a ReplyNotification", inject(function () {
            httpBackend.expectPOST(configuration.path + '/Communication/ReplyNotification' + '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.ReplyNotification(postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('SendNotification', function () {
        it("should update a User", inject(function () {
            httpBackend.expectPOST(configuration.path + '/Communication/SendNotification' + '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.SendNotification(postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });


    describe('AddMessage', function () {
        it("should update a AddMessage", inject(function () {
            httpBackend.expectPOST(configuration.path + '/Communication/AddMessage' + '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.AddMessage(postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('FileUplod', function () {
        it("should update a FileUplod", inject(function () {
          var output =  configuration.path + '/Communication/File/Upload/' + testId + '?token=' + auth.getToken();
            expect(service.FileUplod(testId)).toEqual(output);
        }))
    });



});


