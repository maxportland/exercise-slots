appControllers.controller('CreateExerciseController', ['$scope', '$rootScope', '$resource', function ($scope, $rootScope, $resource) {

    $scope.selection = {
        type:'Body Building'
    };
    $scope.newExercise = {};
    $scope.exerciseTypes = [];
    $scope.exerciseTypesSelection = [];
    $scope.hasExerciseTypes = false;

    $scope.getMuscleGroups = function(muscleRegion) {
        if(!muscleRegion) {
            $scope.muscleGroups = [];
            return;
        }
        var muscleGroupsResource = $resource('/admin/muscle-groups/' + muscleRegion.label, {}, {
            list: {method:'GET', isArray:true}
        });
        muscleGroupsResource.list().$promise.then(function(muscleGroups) {
            $scope.muscleGroups = muscleGroups;
            $scope.selection.muscleGroup = muscleGroups[0];
        });
    };

    $scope.getMuscleHeads = function(muscleGroup) {
        if(!muscleGroup) {
            $scope.muscleHeads = [];
            return;
        }
        var muscleHeadsResource = $resource('/admin/muscle-heads/' + muscleGroup.id, {}, {
            list: {method:'GET', isArray:true}
        });
        muscleHeadsResource.list().$promise.then(function(muscleHeads) {
            $scope.muscleHeads = muscleHeads;
            $scope.selection.muscleHead = muscleHeads[0];
        });
    };

    $scope.getMuscleRegions = function() {
        var muscleRegionsResource = $resource('/admin/muscle-regions', {}, {
            list: {method:'GET', isArray:true}
        });
        muscleRegionsResource.list().$promise.then(function(muscleRegions) {
            $scope.muscleRegions = muscleRegions;
            $scope.selection.muscleRegion = muscleRegions[0];
        });
    };

    $scope.getExerciseTypes = function() {
        var exerciseTypesResource = $resource('/admin/exercise-types', {}, {
            list: {method:'GET', isArray:true}
        });
        exerciseTypesResource.list().$promise.then(function(exerciseTypes) {
            $scope.exerciseTypes = exerciseTypes;
            $scope.exerciseTypesSelection.push(exerciseTypes[0].name);
        });
    };

    $scope.$watch("exerciseTypesSelection", function muscleRegionChange() {
        if(typeof exerciseTypesSelection !== "undefined") {
            if (exerciseTypesSelection.length >= 1) {
                $scope.hasExerciseTypes = true;
            } else {
                $scope.hasExerciseTypes = false;
            }
        }
    });

    $scope.$watch("selection.muscleRegion", function muscleRegionChange(newValue) {
        $scope.getMuscleGroups(newValue);
    });

    $scope.$watch("selection.muscleGroup", function muscleGroupChange(newValue) {
        $scope.getMuscleHeads(newValue);
    });

    $scope.getExerciseTypes();
    $scope.getMuscleRegions();

    $scope.toggleExerciseTypesSelection = function toggleExerciseTypesSelection(exerciseType) {
        var idx = $scope.exerciseTypesSelection.indexOf(exerciseType);
        if (idx > -1) {
            $scope.exerciseTypesSelection.splice(idx, 1);
        } else {
            $scope.exerciseTypesSelection.push(exerciseType);
        }
    };

    $scope.save = function() {
        var exerciseResource = $resource('/admin/exercise', {}, {
            save: {method:'POST'}
        });
        $scope.newExercise.exerciseTypes = $scope.exerciseTypesSelection;
        exerciseResource.save($scope.newExercise).$promise.then(function() {
            $rootScope.$broadcast('exercises-changed');
            $scope.newExercise = {};
        });
    };

}]);