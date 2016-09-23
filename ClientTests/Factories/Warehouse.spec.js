describe("Warehouse", function () {
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
            service = $injector.get('WarehouseSVC');
        })
    });

    describe('GetAllSellers', function () {
        it("should get a list of all GetAllSellers", inject(function () {
            httpBackend.expectGET(configuration.path + '/Warehouse/GetAllSellers' +  '?token=' + auth.getToken()).respond(true);
            service.GetAllSellers().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('SearchReturnedCase', function () {
        it("should get a list of all SearchReturnedCase", inject(function () {
            httpBackend.expectGET(configuration.path + '/Warehouse/ReturnedCase/' + testId + '?token=' + auth.getToken()).respond(true);
            service.SearchReturnedCase(testId).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('UpdateCaseStatus', function () {
        it("Update the CaseStatus", inject(function () {
            httpBackend.expectPOST(configuration.path + '/Warehouse/UpdateCaseStatus' + '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.UpdateCaseStatus(postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('UpdateCaseData', function () {
        it("Update the CaseData", inject(function () {
            httpBackend.expectPOST(configuration.path + '/Warehouse/UpdateCaseData/' +testId+ '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.UpdateCaseData(testId,postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });




});