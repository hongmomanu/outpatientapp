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

        setInterval( function() {
            // Create a newDate() object and extract the seconds of the current time on the visitor's
            var seconds = new Date().getSeconds();
            // Add a leading zero to seconds value
            $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
        },1000);

        setInterval( function() {
            // Create a newDate() object and extract the minutes of the current time on the visitor's
            var minutes = new Date().getMinutes();
            // Add a leading zero to the minutes value
            $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
        },1000);

        setInterval( function() {
            // Create a newDate() object and extract the hours of the current time on the visitor's
            var hours = new Date().getHours();
            // Add a leading zero to the hours value
            $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
        }, 1000);




        $rootScope.$on('firetip', function (event, mainscope,res) {

            //alert(111);
            localStorage.tip=res.data;
            $scope.tip=res.data;

        });

    });
