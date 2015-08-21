/**
 * Created by jack on 15-8-14.
 */
angular.module('app.controllers')
    .run(function($rootScope,$timeout,$state){
        //var hello = testFactory.Hello();
        console.log("hello");
        //console.log($rootScope);

        $rootScope.$on('initWebSocket', function (event, $scope) {
            //$scope.configmodal.show();
            var socket=null;


            var makeautostart=function(){
                try{
                    cordova.plugins.autoStart.enable();
                }catch(e){

                }finally{

                }
            }
            makeautostart();

            var websocketInit=function(){
                if(!$scope.configdata.serverurl)$scope.configdata.serverurl=localStorage.serverurl;
                var url=$scope.configdata.serverurl;
                var areanum=$scope.configdata.areanum;
                if(!url||url==""){
                    //Ext.Msg.alert('提示','服务地址为空');
                    $scope.configmodal.show();
                    return ;
                }
                if(!areanum||areanum==""){
                    //Ext.Msg.alert('提示','诊区为空');
                    $scope.configmodal.show();
                    return ;
                }

                url=url.replace(/(:\d+)/g,":3001");
                url=url.replace("http","ws");


                socket = new WebSocket(url);

                socket.onmessage = function(event) {
                    var res=JSON.parse(event.data);

                    //alert(11);

                    console.log(res);

                    $timeout(function(){
                        if(res.type=="bigscreendata"){
                            if(res.data.length>0)$state.go('index');
                            else $state.go('tip');

                            for(var i=0;i<res.data.length;i++){

                                $scope["data"+(i+1)]=res.data[i];

                            }
                        }else if(res.type=="callpatient"){
                            $state.go('index');
                            $scope.makeSpeak(res.data);

                        }else if(res.type=="changeroom"){
                            $scope.configdata.areanum=res.data.newno;
                            $scope.configdata.areaname=res.data.newname;
                            localStorage.configdata=JSON.stringify($scope.configdata);
                            //$state.go('index');
                            //window.location.reload();
                            window.location.href=""

                        }else if(res.type=='firetip'){

                            console.log('firetip');
                            $rootScope.$broadcast('firetip', $scope,res);

                        }else if(res.type=='freshsystem'){
                            window.location.href="";
                        }
                    },0);

                };
                socket.onclose = function(event) {
                    $timeout(function(){
                        websocketInit();
                    },3000);
                };

                socket.onopen = function() {

                    socket.send(JSON.stringify({
                        type:"mainscreen",
                        content: areanum
                    }));

                };


            }
            //init websocket;
            websocketInit();
            $state.go('tip');

        });
    })
