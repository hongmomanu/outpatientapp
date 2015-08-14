// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('appCtrl', function($scope, $interval,$timeout) {
      var socket=null;

      console.log('appCtrl');
      var websocketInit=function(){

        var url=localStorage.serverurl;
        var area=localStorage.area;
        if(!url||url==""){
          //Ext.Msg.alert('提示','服务地址为空');
          return ;
        }
        if(!area||area==""){
          //Ext.Msg.alert('提示','诊区为空');
          return ;
        }
        //url=url?"ws://"+url.split("://")[1].split(":")[0]+":3001/":"ws://localhost:3001/";
        url=url.replace(/(:\d+)/g,":3001");
        url=url.replace("http","ws");
        socket = new WebSocket(url);

        socket.onmessage = function(event) {
          var data=JSON.parse(event.data);

        };
        socket.onclose = function(event) {

          $timeout(function(){
            websocketInit()
          },3000)

        };

        socket.onopen = function() {

          socket.send(JSON.stringify({
            type:"mainscreen",
            content: localStorage.area
          }));
        };

      }

















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
