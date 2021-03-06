appControllers.controller('CreateMuscleHeadController', ['$scope', '$window', '$rootScope', '$resource', function ($scope, $window, $rootScope, $resource) {

    $scope.selection = {};
    $scope.new = {
        muscleHead : {
        }
    }

    $scope.getMuscleGroups = function(muscleRegion) {
        if(!muscleRegion) {
            $scope.muscleGroups = [];
            return;
        }
        var muscleGroupsResource = $resource('/admin/muscle-groups/' + muscleRegion.label, {}, {
            list: {method:'GET', isArray:true, headers:{'X-Auth-Token' : $window.sessionStorage.token}}
        });
        muscleGroupsResource.list().$promise.then(function(muscleGroups) {
            $scope.muscleGroups = muscleGroups;
            $scope.new.muscleHead.muscleGroup = muscleGroups[0];
        });
    };

    $scope.getMuscleRegions = function() {
        var muscleRegionsResource = $resource('/admin/muscle-regions', {}, {
            list: {method:'GET', isArray:true, headers:{'X-Auth-Token' : $window.sessionStorage.token}}
        });
        muscleRegionsResource.list().$promise.then(function(muscleRegions) {
            $scope.muscleRegions = muscleRegions;
            $scope.selection.muscleRegion = muscleRegions[0];
        });
    };

    $scope.$watch("selection.muscleRegion", function muscleRegionChange(newValue) {
        $scope.getMuscleGroups(newValue);
    });

    $scope.getMuscleRegions();

    $scope.save = function() {
        var muscleHeadsResource = $resource('/admin/muscle-head', {}, {
            save: {method:'POST', headers:{'X-Auth-Token' : $window.sessionStorage.token}}
        });
        muscleHeadsResource.save($scope.new.muscleHead).$promise.then(function(muscleHead) {
            $rootScope.$broadcast('muscle-heads-changed');
            $scope.new.muscleHead = {};
        });
    }

}]);