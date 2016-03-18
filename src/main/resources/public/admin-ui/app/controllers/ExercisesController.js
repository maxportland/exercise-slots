appControllers.controller('ExercisesController', ['$scope', '$rootScope', '$window', '$resource', function ($scope, $rootScope, $window, $resource) {

    $scope.$on('exercises-changed', function() {
        $scope.getExercises();
    });

    $scope.exercises = [];

    $scope.getExercises = function() {
        var exercisesResource = $resource('/admin/exercise/', {}, {
            list: {method:'GET', isArray:true, headers:{'X-Auth-Token' : $window.sessionStorage.token}}
        });
        exercisesResource.list().$promise.then(function(exercises) {
            $scope.exercises = exercises;
        });
    };

    $scope.getExercises();

}]);