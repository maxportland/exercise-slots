appControllers.controller('ExercisesController', ['$scope', '$rootScope', '$resource', function ($scope, $rootScope, $resource) {

    $scope.$on('exercises-changed', function() {
        $scope.getExercises();
    });

    $scope.exercises = [];

    $scope.getExercises = function() {
        var exercisesResource = $resource('/admin/exercise/', {}, {
            list: {method:'GET', isArray:true, headers:{'X-Auth-Token' : $rootScope.token}}
        });
        exercisesResource.list().$promise.then(function(exercises) {
            $scope.exercises = exercises;
        });
    };

    $scope.getExercises();

}]);