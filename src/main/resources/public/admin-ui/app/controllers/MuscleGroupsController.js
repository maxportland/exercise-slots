appControllers.controller('MuscleGroupsController', ['$scope', '$rootScope', '$resource', function ($scope, $rootScope, $resource) {

    $scope.$on('muscle-groups-changed', function() {
        $scope.getMuscleGroups();
    });

    $scope.muscleGroups = [];

    $scope.getMuscleGroups = function() {
        var muscleGroupsResource = $resource('/admin/muscle-groups/', {}, {
            list: {method:'GET', isArray:true, headers:{'X-Auth-Token' : $rootScope.token}}
        });
        muscleGroupsResource.list().$promise.then(function(muscleGroups) {
            $scope.muscleGroups = muscleGroups;
        });
    };

    $scope.getMuscleGroups();

}]);