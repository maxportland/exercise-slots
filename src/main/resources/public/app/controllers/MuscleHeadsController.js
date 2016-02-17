appControllers.controller('MuscleHeadsController', ['$scope', '$resource', function ($scope, $resource) {

    $scope.$on('muscle-heads-changed', function() {
        $scope.getMuscleHeads();
    });

    $scope.muscleHeads = [];

    $scope.getMuscleHeads = function() {
        var muscleHeadsResource = $resource('/admin/muscle-heads/', {}, {
            list: {method:'GET', isArray:true}
        });
        muscleHeadsResource.list().$promise.then(function(muscleHeads) {
            $scope.muscleHeads = muscleHeads;
        });
    };

    $scope.getMuscleHeads();

}]);