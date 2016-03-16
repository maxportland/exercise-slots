appControllers.controller('ExerciseTypesController', ['$scope', '$rootScope', '$resource', function ($scope, $rootScope, $resource) {

    $scope.newExerciseType = {};
    $scope.exerciseTypes = [];

    $scope.getExerciseTypes = function() {
        var exerciseTypesResource = $resource('/admin/exercise-types/', {}, {
            list: {method:'GET', headers:{'X-Auth-Token' : $rootScope.token}, isArray:true}
        });
        exerciseTypesResource.list().$promise.then(function(exerciseTypes) {
            $scope.exerciseTypes = exerciseTypes;
        });
    };

    $scope.getExerciseTypes();

    $scope.save = function() {
        var exerciseTypesResource = $resource('/admin/exercise-type', {}, {
            save: {method:'POST', headers:{'X-Auth-Token' : $rootScope.token}}
        });
        exerciseTypesResource.save($scope.newExerciseType).$promise.then(function() {
            $scope.getExerciseTypes();
        });
    };

}]);