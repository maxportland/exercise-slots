appControllers.controller('LoginController', ['$scope', '$rootScope', '$window', '$location', '$http', function ($scope, $rootScope, $window, $location, $http) {
    $scope.authRequest = {};
    $scope.navigation = [];
    $scope.login = function() {
        $http.post('/auth', $scope.authRequest).success(function (data) {
            $window.sessionStorage.token = data.token;
            $rootScope.userLoggedIn = true;
            $location.path("/");
        }).error(function () {
            delete $window.sessionStorage.token;
            $rootScope.userLoggedIn = false;
        });
    };
}]);