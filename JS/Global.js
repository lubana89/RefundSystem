/*Global Variable*/
var user;

/*Global Function*/
function Logout($auth,$rootScope,$state) {
    $auth.logout().then(function() {

        localStorage.removeItem('user');
        $rootScope.authenticated = false;
        $rootScope.currentUser = null;
        $state.go('auth');
    });

}