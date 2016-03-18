appControllers.controller('MuscleGroupsController', ['$scope', '$window', '$rootScope', '$resource', function ($scope, $window, $rootScope, $resource) {

    $scope.$on('muscle-groups-changed', function() {
        $scope.getMuscleGroups();
    });

    $scope.muscleGroups = [];

    $scope.getMuscleGroups = function() {
        var muscleGroupsResource = $resource('/admin/muscle-groups/', {}, {
            list: {method:'GET', isArray:true, headers:{'X-Auth-Token' : $window.sessionStorage.token}}
        });
        muscleGroupsResource.list().$promise.then(function(muscleGroups) {
            $scope.muscleGroups = muscleGroups;
        });
    };

    $scope.getMuscleGroups();

}]);