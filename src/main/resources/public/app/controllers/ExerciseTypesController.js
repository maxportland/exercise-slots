appControllers.controller('ExerciseTypesController', ['$scope', '$resource', function ($scope, $resource) {

    $scope.newExerciseType = {};
    $scope.exerciseTypes = [];

    $scope.getExerciseTypes = function() {
        var exerciseTypesResource = $resource('/admin/exercise-types/', {}, {
            list: {method:'GET', isArray:true}
        });
        exerciseTypesResource.list().$promise.then(function(exerciseTypes) {
            $scope.exerciseTypes = exerciseTypes;
        });
    };

    $scope.getExerciseTypes();

    $scope.save = function() {
        var exerciseTypesResource = $resource('/admin/exercise-type', {}, {
            save: {method:'POST'}
        });
        exerciseTypesResource.save($scope.newExerciseType).$promise.then(function() {
            $scope.getExerciseTypes();
        });
    };

}]);