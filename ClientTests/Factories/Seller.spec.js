describe("Seller", function () {
    beforeEach(module('RefundSystemApp'));

    var service, httpBackend;
    var auth = {
        getToken: function () {
            return 'testToken';
        }
    };

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('$auth', auth);
        });
    });
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            httpBackend = $injector.get('$httpBackend');
            service = $injector.get('SellerSVC');
        })
    });

    describe('GetAllSellerCase', function () {
        it("should get a list of all Sellercases", inject(function () {
            httpBackend.expectGET(configuration.path + '/Seller/AllCases/' + user.id + '?token=' + auth.getToken()).respond(true);
            service.GetAllSellerCase().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('GetLink', function () {
        it("should get a Link", inject(function () {
            httpBackend.expectGET(configuration.path + '/Seller/GetLink/' + testId +'?token=' + auth.getToken()).respond(true);
            service.GetLink(testId).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('DeleteCase', function () {
        it("should delete a Case", inject(function () {
            httpBackend.expectGET(configuration.path + '/Seller/DeleteCase/' + testId + '?token=' + auth.getToken()).respond(true);
            service.DeleteCase(testId).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('GetAllAdmins', function () {
        it("should get a list of all Admins", inject(function () {
            httpBackend.expectGET(configuration.path + '/Seller/GetAllAdmins' + '?token=' + auth.getToken()).respond(true);
            service.GetAllAdmins().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('MailLink', function () {
        it("should mail a Link", inject(function () {
            httpBackend.expectGET(configuration.path + '/Seller/MailLink/' +testId+ '?token=' + auth.getToken()).respond(true);
            service.MailLink(testId).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('GenerateRefundLink', function () {
        it("Generates a RefundLink", inject(function () {
            httpBackend.expectPOST(configuration.path + '/Seller/GenerateRefundLink' + '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.GenerateRefundLink(postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('UpdateCaseData', function () {
        it("Updates the CaseData", inject(function () {
            httpBackend.expectPOST(configuration.path + '/Seller/UpdateCaseData/' + testId + '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.UpdateCaseData(testId,postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

});