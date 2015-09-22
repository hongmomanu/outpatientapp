/**
 * Created by jack on 15-8-14.
 */
angular.module('app.controllers')
    .run(function($rootScope,$timeout,$state,$interval,$ionicSlideBoxDelegate){
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
                //if(!$scope.configdata.serverurl)$scope.configdata.serverurl=localStorage.serverurl;
                $scope.configdata.serverurl=localStorage.serverurl;
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

                    $timeout(function(){
                        if(res.type=="bigscreendata"){



                            if(res.data.length>0&&res.data[res.data.length-1].roomorder>8){

                                //$ionicSlideBoxDelegate.start();
                                $ionicSlideBoxDelegate.loop(true);


                            }
                            else {
                                $ionicSlideBoxDelegate.slide(0);

                                $timeout(function(){
                                    $ionicSlideBoxDelegate.loop(false);
                                    //$ionicSlideBoxDelegate.stop();

                                },500);
                            }

                            var now=new Date();
                            now.setTime(now.getTime()+parseInt(localStorage.servertime));
                            var hours=now.getHours();


                            //console.log(res.data);



                            if(res.data.length>0||(hours>=8&&hours<12)||(hours>=14&&hours<17))$state.go('index');
                            else  $state.go('tip');

                            /*for(var i=0;i<16;i++){

                                if(i<res.data.length){
                                    res.data[i].data=res.data[i].data.slice(0,localStorage.showlines);
                                    //$scope["data"+(i+1)]=res.data[i];
                                    $scope["data"+res.data[i].data[0].roomorder]=res.data[i];
                                }
                                //else $scope["data"+(i+1)]=[];
                                else  $scope["data"+res.data[i].data[0].roomorder]=[];
                            }*/

                            /*for(var i=0;i<16;i++){
                                 $scope["data"+(i+1)]=[];
                            }*/
                            for(var i=0;i<res.data.length;i++){

                                res.data[i].data=res.data[i].data.slice(0,localStorage.showlines);
                                $scope["data"+res.data[i].roomorder]=res.data[i];
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

                            $rootScope.$broadcast('firetip', $scope,res);

                        }else if(res.type=='freshsystem'){
                            window.location.href="";
                        }
                        else if(res.type=='fireprop'){
                            localStorage[res.name]=res.value;
                        }else if(res.type=='servertime'){
                            //$scope.servertime=res.time;

                            $rootScope.$broadcast('fireservertime', $scope,res);

                        }else if(res.type=='playvoice'){
                            $scope.playTextVoice(res.content,res.speed);

                        }else if(res.type=='getopenedroom'){
                            $scope.makeroomtitles(res.data);

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

                    $.get(localStorage.serverurl+"firegetopenedroombyarea?area="+areanum);

                };


            }
            //init websocket;
            websocketInit();
            $state.go('tip');

        });
    })
