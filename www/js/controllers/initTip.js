/**
 * Created by jack on 15-8-14.
 */
angular.module('app.controllers')
    .controller('initTip', function ($scope, $state, $interval, $timeout, $ionicModal, $rootScope, $ionicLoading) {

        console.log("init tip");
        $scope.configdata = localStorage.configdata ? JSON.parse(localStorage.configdata) : {};

        /*$timeout(function(){
            $state.go('index');
        },3000);*/


    });
