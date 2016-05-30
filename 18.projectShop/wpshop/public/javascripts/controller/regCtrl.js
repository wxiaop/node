angular.module('shopApp').controller('regCtrl',function($scope,$http,$location){
    $scope.user = {};
    $scope.save = function(){
        $http({
            url:'users/reg',
            method:'POST',
            data:$scope.user
        }).success(function(user){
            $location.path('/login');
        }).error(function(){
            $location.path('/reg')
        });
    }
});