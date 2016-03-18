appControllers.controller('LogoutController', ['$scope', '$window', '$rootScope', '$location', function ($scope, $window, $rootScope, $location) {
    $window.sessionStorage.clear();
    $rootScope.userLoggedIn = false;
    $location.path("/login");
}]);