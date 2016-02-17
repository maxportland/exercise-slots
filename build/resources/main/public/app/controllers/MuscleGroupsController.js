appControllers.controller('MuscleGroupsController', ['$scope', '$resource', function ($scope, $resource) {

    $scope.$on('muscle-groups-changed', function() {
        $scope.getMuscleGroups();
    });

    $scope.muscleGroups = [];

    $scope.getMuscleGroups = function() {
        var muscleGroupsResource = $resource('/admin/muscle-groups/', {}, {
            list: {method:'GET', isArray:true}
        });
        muscleGroupsResource.list().$promise.then(function(muscleGroups) {
            $scope.muscleGroups = muscleGroups;
        });
    };

    $scope.getMuscleGroups();

}]);