appControllers.controller('CreateMuscleGroupController', ['$scope', '$rootScope', '$resource', function ($scope, $rootScope, $resource) {

    $scope.selection = {};
    $scope.new = {
        muscleGroup: {
        }
    };

    $scope.getMuscleRegions = function() {
        var muscleRegionsResource = $resource('/admin/muscle-regions', {}, {
            list: {method:'GET', isArray:true, headers:{'X-Auth-Token' : $rootScope.token}}
        });
        muscleRegionsResource.list().$promise.then(function(muscleRegions) {
            $scope.muscleRegions = muscleRegions;
            $scope.new.muscleGroup.region = muscleRegions[0];
        });
    };

    $scope.getMuscleRegions();

    $scope.save = function() {
        var muscleGroupsResource = $resource('/admin/muscle-group', {}, {
            save: {method:'POST', headers:{'X-Auth-Token' : $rootScope.token}}
        });
        $scope.new.muscleGroup.region = $scope.new.muscleGroup.region.label;
        muscleGroupsResource.save($scope.new.muscleGroup).$promise.then(function(muscleGroup) {
            $rootScope.$broadcast('muscle-groups-changed');
            $scope.new.muscleGroup = {};
        });
    };

}]);