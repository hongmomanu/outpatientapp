/**
 * Created by jack on 15-8-14.
 */
angular.module('app.controllers')
    .controller('initController', function($scope, $interval,$timeout, $ionicModal,$rootScope) {
        $scope.socket=null;
        $scope.configdata=localStorage.configdata?JSON.parse(localStorage.configdata):{};

        console.log('initController');

        $ionicModal.fromTemplateUrl('templates/config.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.configmodal = modal;
            $rootScope.$broadcast('resourceChange', $scope);

        });

        //make config
        $scope.makeConfig=function(configdata){
            localStorage.configdata=JSON.stringify(configdata);
            $scope.configmodal.hide();
            window.location.reload();

        };


        /*$scope.data1 ={title:"诊室1",data:[
         {name:"jack",value:"sss"},
         {name:"jack",value:"sss"},
         {name:"jack",value:"sss"}
         ]};
         $scope.data2 ={title:"诊室2",data:[
         {name:"jack",value:"sss"},
         {name:"jack",value:"sss"},
         {name:"jack",value:"sss"}
         ]};
         $scope.data3 ={title:"诊室3",data:[
         {name:"jack",value:"sss"},
         {name:"jack",value:"sss"},
         {name:"jack",value:"sss"}
         ]};

         */
        /*$timeout( function() {

         //$scope.data1.data.push({name:"jackww",value:"sss"})
         $scope.data1={title:"诊室33",data:[
         {name:"jack",value:"sss"},
         {name:"jack",value:"sss"},
         {name:"jack",value:"sss"}
         ]};

         }, 5000);*/


    });
