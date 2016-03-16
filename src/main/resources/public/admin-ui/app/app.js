var app = angular.module("app", [
    'ngRoute',
    'ngCookies',
    'appControllers',
    'appServices',
    'ui.bootstrap'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/slots', {
        templateUrl: 'app/partials/slots.html',
        controller: 'SlotsController'
    }).when('/exercises', {
        templateUrl: 'app/partials/exercises.html',
        controller: 'ExercisesController'
    }).when('/muscle-groups', {
        templateUrl: 'app/partials/muscle-groups.html',
        controller: 'MuscleGroupsController'
    }).when('/muscle-heads', {
        templateUrl: 'app/partials/muscle-heads.html',
        controller: 'MuscleHeadsController'
    }).when('/exercise-types', {
        templateUrl: 'app/partials/exercise-types.html',
        controller: 'ExerciseTypesController'
    }).when('/login', {
        templateUrl: 'app/partials/login.html',
        controller: 'LoginController'
    }).when('/logout', {
        controller: 'LogoutController'
    }).otherwise({
        redirectTo: '/login'
    });
}]).run(function($rootScope, $location, $cookies) {
    $rootScope.token = $cookies.get("token");
    if($rootScope.token) {
        $rootScope.userLoggedIn = true;
    } else {
        $rootScope.userLoggedIn = false;
    }
    $rootScope.$on("$routeChangeStart", function(event, next) {
        if($rootScope.userLoggedIn == null || !$rootScope.userLoggedIn) {
            if(next.templateUrl != "partials/login.html") {
                $location.path("/login");
            }
        }
    });
});

app.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

app.controller('NavigationController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    if($rootScope.userLoggedIn) {
        $scope.navigation = [
            {'name': 'Slots', 'path': '/slots'},
            {'name': 'Exercises', 'path': '/exercises'},
            {'name': 'Exercise Types', 'path': '/exercise-types'},
            {'name': 'Muscle Groups', 'path': '/muscle-groups'},
            {'name': 'Muscle Heads', 'path': '/muscle-heads'}
        ];
    } else {
        $scope.navigation = [];
    }
    $scope.getPath = function() {
        return $location.path();
    };
}]);

var appControllers = angular.module('appControllers', []);