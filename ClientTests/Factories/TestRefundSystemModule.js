var configuration={
    path:"http://localhost:80/refundSystem/server.php"
};
var auth = {
    getToken: function() {
        return 'testToken';
    }
};
var testId=-1;
var postData={
    test:'test'
};
var user={
  id:-1
};
angular.module('RefundSystemApp', []);
