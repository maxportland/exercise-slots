appControllers.controller('MuscleHeadsController', ['$scope', '$window', '$rootScope', '$resource', function ($scope, $window, $rootScope, $resource) {

    $scope.$on('muscle-heads-changed', function() {
        $scope.getMuscleHeads();
    });

    $scope.muscleHeads = [];

    $scope.getMuscleHeads = function() {
        var muscleHeadsResource = $resource('/admin/muscle-heads/', {}, {
            list: {method:'GET', isArray:true, headers:{'X-Auth-Token' : $window.sessionStorage.token}}
        });
        muscleHeadsResource.list().$promise.then(function(muscleHeads) {
            $scope.muscleHeads = muscleHeads;
        });
    };

    $scope.getMuscleHeads();

}]);