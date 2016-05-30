angular.module('shopApp').factory('dataService',function($http){
    var dataService = {};
    var methods = ['get','post'];
    methods.forEach(function(method){
        dataService[method] = function(url,data,succFun,errorFun){
            var http = $http({
                url:url,
                method:method.toUpperCase(),
                data:data
            });
            if(succFun && typeof succFun == 'function'){
                http.success(succFun);
            }
            if(errorFun && typeof errorFun == 'function'){
                http.error(errorFun);
            }
        }
    });
    return dataService;
});