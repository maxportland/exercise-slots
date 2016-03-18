appControllers.controller('LogoutController', ['$scope', '$window', '$rootScope', '$location', '$cookies', function ($scope, $window, $rootScope, $location, $cookies) {
    $cookies.remove('token', { path: '/' });
    delete $window.sessionStorage.token;
    $rootScope.userLoggedIn = false;
    $location.path("/login");
}]);