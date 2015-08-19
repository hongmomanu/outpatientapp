/**
 * Created by jack on 15-8-14.
 */
angular.module('app.controllers')
    .controller('initTip', function ($scope, $state, $interval,$sce, $timeout, $ionicModal, $rootScope, $ionicLoading) {

        console.log("init tip");
        $scope.configdata = localStorage.configdata ? JSON.parse(localStorage.configdata) : {};

        $scope.tip=localStorage.tip?localStorage.tip:'<div style="font-size: xx-large;text-align: center">请输入提示广播内容</div>';

        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
        /*$timeout(function(){
            $state.go('index');
        },3000);*/

        $rootScope.$on('firetip', function (event, mainscope,res) {

            //alert(111);
            localStorage.tip=res.data;
            $scope.tip=res.data;

        });

    });
