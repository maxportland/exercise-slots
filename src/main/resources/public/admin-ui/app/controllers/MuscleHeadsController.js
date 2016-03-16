appControllers.controller('MuscleHeadsController', ['$scope', '$rootScope', '$resource', function ($scope, $rootScope, $resource) {

    $scope.$on('muscle-heads-changed', function() {
        $scope.getMuscleHeads();
    });

    $scope.muscleHeads = [];

    $scope.getMuscleHeads = function() {
        var muscleHeadsResource = $resource('/admin/muscle-heads/', {}, {
            list: {method:'GET', isArray:true, headers:{'X-Auth-Token' : $rootScope.token}}
        });
        muscleHeadsResource.list().$promise.then(function(muscleHeads) {
            $scope.muscleHeads = muscleHeads;
        });
    };

    $scope.getMuscleHeads();

}]);