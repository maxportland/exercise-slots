appControllers.controller('SlotsController', ['$scope', '$window', '$rootScope', '$resource', function ($scope, $window, $rootScope, $resource) {

    $scope.exercises = [];
    $scope.muscleRegions = ['Arms','Shoulders','Back','Core','Legs','Chest'];
    $scope.muscleRegionSelection = [];

    $scope.toggleMuscleRegionSelection = function toggleMuscleRegionSelection(muscleRegion) {
        var idx = $scope.muscleRegionSelection.indexOf(muscleRegion);
        if (idx > -1) {
            $scope.muscleRegionSelection.splice(idx, 1);
        } else {
            $scope.muscleRegionSelection.push(muscleRegion);
        }
    };

    $scope.getExercises = function() {
        var exercisesResource = $resource('/spin', {'regions':$scope.muscleRegionSelection.toString()}, {
            list: {method:'GET', isArray:true, headers:{'X-Auth-Token' : $window.sessionStorage.token}}
        });
        exercisesResource.list().$promise.then(function(exercises) {
            $scope.exercises = exercises;
        });
    };

    $scope.getExercises();

}]);