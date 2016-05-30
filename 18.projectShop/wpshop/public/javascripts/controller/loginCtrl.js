angular.module('shopApp').controller('loginCtrl',function($rootScope,$scope,$http,$location){
    $scope.user = {};
    $scope.login = function(){
        $http({
            url:'users/login',
            method:'POST',
            data:$scope.user
        }).success(function(user){
            $rootScope.me = user;
            console.log(user,$rootScope.me);
            $location.path('/home');
        }).error(function(){
            $location.path('/login')
        });
    }
});