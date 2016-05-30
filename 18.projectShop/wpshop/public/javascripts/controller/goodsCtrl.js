angular.module('shopApp').controller('goodsCtrl',function($rootScope,$scope,$http,$location){
    $scope.keyword = '';
    $scope.filterGoods = [];
    $scope.pages = [];
    $scope.pageNumber = 1;
    $scope.pageSize = 4;

    $scope.goods = [];
    $http({
        url:'/goods/list',
        method:'GET'
    }).success(function(goods){
        $scope.goods = goods;
        $scope.filter();
    }).error(function(){

    });
    $scope.filter = function(){
        var tempGoods = $scope.goods.filter(function(good){
            return good.name.indexOf($scope.keyword) != -1;
        });
        $scope.pages = [];
        $scope.totalPage = Math.ceil(tempGoods.length/$scope.pageSize);
        for(var i = 0; i < $scope.totalPage; i++){
            $scope.pages.push(i);
        }
        var filterGoods = [];
        for(var i = ($scope.pageNumber-1)*$scope.pageSize; i<tempGoods.length && i < $scope.pageNumber*$scope.pageSize;i++){
            filterGoods.push(tempGoods[i]);
        }
        $scope.filterGoods = filterGoods;
    }
    $scope.go = function(page){
        if(page > 0 && page <= $scope.totalPage){
            $scope.pageNumber = page;
            $scope.filter();
        }

    }

    $scope.save = function(){
        $http({
            url:'/goods/add',
            method:'POST',
            data:$scope.good
        }).success(function(good){
            if(!$scope.good._id){
                $scope.goods.push(good);
            }else{
                $scope.goods.forEach(function(good){
                    if(good._id == $scope.good._id){
                        good = $scope.good;
                    }
                });
            }

        }).error(function(){

        });
    };
    $scope.delete = function(){
        $http({
            url:'/goods/delete',
            method:'POST',
            data:$scope.good
        }).success(function(good){
            $scope.goods = $scope.goods.filter(function(good){
                return good._id != $scope.good._id;
            })
        }).error(function(){

        });
    };
});
angular.module('shopApp').directive('addGoods',function(){
    return{
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.good = {};
                });
                $('#addDialog').modal(true);
            });
        }
    }
});
angular.module('shopApp').directive('editGoods',function(){
    return{
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.good = scope.goods[attrs.index];
                });
                $('#addDialog').modal(true);
            });
        }
    }
});
angular.module('shopApp').directive('viewGoods',function(){
    return{
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.good = scope.goods[attrs.index];
                });
                $('#viewDialog').modal(true);
            });
        }
    }
});
angular.module('shopApp').directive('deleteGoods',function(){
    return{
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.good = scope.goods[attrs.index];
                });
                $('#deleteGoods').modal(true);
            });
        }
    }
});
angular.module('shopApp').directive('selectAllGoods',function(){
    return{
        link:function(scope,element,attrs){
            element.click(function(){
                var self = $(this);
                $("input[type='checkbox']").each(function(){
                    $(this).prop('checked',self.prop('checked'));
                });
            });
        }
    }
});
angular.module('shopApp').directive('selectGoodItem',function(){
    return{
        link:function(scope,element,attrs){
            element.click(function(){
                var isChecked = $("input[type='checkbox']:not(:checked)").length?false:true;
                $("#selectAll").prop('checked',isChecked);

            });
        }
    }
});
angular.module('shopApp').directive('batchDeleteGoods',function(dataService){
    return{
        link:function(scope,element,attrs){
            element.click(function(){
                var goods = $("input[type='checkbox']:checked");
                var _ids = [];
                goods.each(function(index,good){
                   _ids.push($(good).data('id'));
                });
                dataService.post('goods/batchDelete',{_ids:_ids},function(data){
                    scope.goods = scope.goods.filter(function(good){
                        return _ids.indexOf(good._id) == -1;
                    })
                });
            });
        }
    }
});
