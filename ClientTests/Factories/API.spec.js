

describe("API", function () {
    beforeEach(module('RefundSystemApp'));

    var service, httpBackend;
    beforeEach(function(){
        module(function ($provide) {
            $provide.value('$auth', auth);
        });
    });
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            httpBackend = $injector.get('$httpBackend');
            service = $injector.get('ApiSVC');
        })
    });

    describe('GetAllWarehouseUsers', function () {
        it("should return a list of all WarehouseUsers", inject(function () {
            httpBackend.expectGET(configuration.path + '/api/AllWarehouseUsers' + '?token=' + auth.getToken()).respond(true);
            service.GetAllWarehouseUsers().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('GetAuthenticatedUser', function () {
        it("should get a authenticated User", inject(function () {
            httpBackend.expectGET(configuration.path + '/api/authenticate/user' + '?token=' + auth.getToken()).respond(true);
            service.GetAuthenticatedUser().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('GetRole', function () {
        it("should get a Role", inject(function () {
            httpBackend.expectGET(configuration.path + '/api/GetRole' + '?token=' + auth.getToken()).respond(true);
            service.GetRole().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('GetAllUsers', function () {
        it("should return a list of all Users", inject(function () {
            httpBackend.expectGET(configuration.path + '/api/Users' + '?token=' + auth.getToken()).respond(true);
            service.GetAllUsers().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('GetAllRoles', function () {
        it("should return a list of all Roles", inject(function () {
            httpBackend.expectGET(configuration.path + '/api/Roles' + '?token=' + auth.getToken()).respond(true);
            service.GetAllRoles().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('DeleteUser', function () {
        it("should delete a User", inject(function () {
            httpBackend.expectGET(configuration.path + '/api/DeleteUser/' +testId+ '?token=' + auth.getToken()).respond(true);
            service.DeleteUser(testId).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('GetAllCase', function () {
        it("should return a list of all Case", inject(function () {
            httpBackend.expectGET(configuration.path + '/api/AllCases' + '?token=' + auth.getToken()).respond(true);
            service.GetAllCase().then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('UpdateNotification', function () {
        it("should update a Notification", inject(function () {
            httpBackend.expectPOST(configuration.path + '/api/UpdateNotification' + '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.UpdateNotification(postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('UpdateUser', function () {
        it("should update a User", inject(function () {
            httpBackend.expectPOST(configuration.path + '/api/UpdateUser' + '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.UpdateUser(postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

    describe('CreateUser', function () {
        it("should create a User", inject(function () {
            httpBackend.expectPOST(configuration.path + '/api/CreateUser' + '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.CreateUser(postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });
    describe('AssignRole', function () {
        it("should assign a Role", inject(function () {
            httpBackend.expectPOST(configuration.path + '/api/AssignRole' + '?token=' + auth.getToken(), JSON.stringify(postData)).respond(true);
            service.AssignRole(postData).then(function (result) {
                expect(true).toEqual(true);
            });
            httpBackend.flush();
        }))
    });

});