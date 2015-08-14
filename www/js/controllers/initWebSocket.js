/**
 * Created by jack on 15-8-14.
 */
angular.module('app.controllers')
    .run(function($rootScope){
        //var hello = testFactory.Hello();
        console.log("hello");
        console.log($rootScope);
        $rootScope.$on('initWebSocket', function (event, val) {
            val.configmodal.show();

            //alert("1111");
        });
    })
    .controller('initWebSocket', function($scope, $interval,$timeout, $ionicModal) {

        console.log("initWebSocket");
        /*$scope.socket=null;
        $scope.configdata=localStorage.configdata?JSON.parse(localStorage.configdata):{};

        console.log('initWebSocket');

        $ionicModal.fromTemplateUrl('templates/config.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.configmodal = modal;
        });

        //make config
        $scope.makeConfig=function(configdata){
            localStorage.configdata=JSON.stringify(configdata);
            $scope.configmodal.hide();
            window.location.reload();

        };*/


        /*$scope.websocketInit=function(){

            var url=$scope.configdata.serverurl;
            var areanum=$scope.configdata.areanum;
            if(!url||url==""){
                //Ext.Msg.alert('提示','服务地址为空');
                $scope.configmodal.show();
                return ;
            }
            if(!areanum||areanum==""){
                //Ext.Msg.alert('提示','诊区为空');
                $scope.configmodal.show()
                return ;
            }
            //url=url?"ws://"+url.split("://")[1].split(":")[0]+":3001/":"ws://localhost:3001/";
            url=url.replace(/(:\d+)/g,":3001");
            url=url.replace("http","ws");
            $scope.socket = new WebSocket(url);

            $scope.socket.onmessage = function(event) {
                var data=JSON.parse(event.data);
                console.log(data);

            };
            $scope.socket.onclose = function(event) {

                $timeout(function(){
                    $scope.websocketInit()
                },3000)

            };

            $scope.socket.onopen = function() {

                $scope.socket.send(JSON.stringify({
                    type:"mainscreen",
                    content: areanum
                }));
            };

        };*/

        //$scope.websocketInit();

















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
