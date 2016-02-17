var app = angular.module("app", [
    'ngRoute',
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
    }).otherwise({
        redirectTo: '/slots'
    });
}]);

app.controller('NavigationController', ['$scope', '$location', function ($scope, $location) {
    $scope.navigation = [
        {'name':'Slots', 'path':'/slots'},
        {'name':'Exercises', 'path':'/exercises'},
        {'name':'Exercise Types', 'path':'/exercise-types'},
        {'name':'Muscle Groups', 'path':'/muscle-groups'},
        {'name':'Muscle Heads', 'path':'/muscle-heads'}
    ];
    $scope.getPath = function() {
        return $location.path();
    };
}]);

var appControllers = angular.module('appControllers', []);