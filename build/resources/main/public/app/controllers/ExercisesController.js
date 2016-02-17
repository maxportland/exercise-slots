appControllers.controller('ExercisesController', ['$scope', '$resource', function ($scope, $resource) {

    $scope.$on('exercises-changed', function() {
        $scope.getExercises();
    });

    $scope.exercises = [];

    $scope.getExercises = function() {
        var exercisesResource = $resource('/admin/exercise/', {}, {
            list: {method:'GET', isArray:true}
        });
        exercisesResource.list().$promise.then(function(exercises) {
            $scope.exercises = exercises;
        });
    };

    $scope.getExercises();

}]);