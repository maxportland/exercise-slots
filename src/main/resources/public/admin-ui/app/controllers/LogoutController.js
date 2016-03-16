appControllers.controller('LogoutController', ['$scope', '$rootScope', '$location', '$cookies', function ($scope, $rootScope, $location, $cookies) {
    $cookies.remove('token', { path: '/' });
    delete $rootScope.token;
    $rootScope.userLoggedIn = false;
    $location.path("/login");
}]);