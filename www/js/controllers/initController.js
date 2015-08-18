/**
 * Created by jack on 15-8-14.
 */
angular.module('app.controllers')
    .controller('initController', function($scope, $interval,$timeout, $ionicModal,$rootScope,$ionicLoading) {
        if(!localStorage.totaltimes)localStorage.totaltimes=1;
        $scope.socket=null;
        $scope.speaktimes=0;
        $scope.playlist=[];
        $scope.isplaying=false;
        $scope.callingindex=0;

        $scope.configdata=localStorage.configdata?JSON.parse(localStorage.configdata):{};

        console.log('initController');

        $ionicModal.fromTemplateUrl('templates/config.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.configmodal = modal;
            $rootScope.$broadcast('initWebSocket', $scope);

        });

        //make config
        $scope.makeConfig=function(configdata){
            localStorage.configdata=JSON.stringify(configdata);
            $scope.configmodal.hide();
            window.location.reload();

        };

        $scope.playvoice=function(text){
            $scope.speaktimes++;
            try{
                //navigator.speech.startSpeaking( text , {voice_name: 'xiaoyan',speed: localStorage.speed} );
                navigator.speech.startSpeaking( text[0] , {voice_name: 'xiaoyan',speed: '30'} );
                setTimeout(function(){
                    navigator.speech.startSpeaking( text[1]+'.'+text[1] , {voice_name: 'xiaoyan',speed: '10'} );

                },2000);


                setTimeout(function(){
                    navigator.speech.startSpeaking( text[2] , {voice_name: 'xiaoyan',speed: '30'} );
                },(function(str){
                    if(!str||str=="")return 6000;
                    else if(str.length==2)return 5400;
                    else if(str.length==3)return 6400;
                    else if(str.length==4)return 6800;
                    else return 6000;
                }(text[1])));


            }catch (e){}
            finally{
                setTimeout(function(){
                    if($scope.speaktimes>=localStorage.totaltimes){
                        $scope.speaktimes=0;
                        delete $scope.playlist[$scope.callingindex];

                        $scope.callingindex++;
                        $ionicLoading.hide();
                        $interval.cancel($scope.timer);
                        $scope.makevoiceanddisplay();
                    }else{
                        //tipvoice.removeEventListener('ended',voiceEnd,false);

                        $scope.playvoice(text);
                    }
                },10000);
            };
        } ;


        $scope.showcallmsg=function(item){
            $ionicLoading.show({
                template: '<div style="font-size: 60px;vertical-align: middle;text-align: center;">'+'<a style="font-weight: bold">'+item.hzxh+'</a>'
                +'<a style="font-weight: bold">'+item.hzxm+'</a>'
                +'<a style="font-weight: bold">'+item.zsmc+'</a>'
                +'</div>',
                animation: 'fade-in',
                maxWidth: 200,
                showBackdrop: true

            });
        };
        $scope.makevoiceanddisplay=function(){

            if(($scope.playlist.length-1)>=$scope.callingindex){


                var item=$scope.playlist[$scope.callingindex];
                //var text="请 "+item.showno+item.patname+" 到"+item.roomname+"机房门口等候检查";
                var text=["请 "+item.hzxh,item.hzxm," 到"+item.zsmc+"诊室等候问诊"];
                console.log(text);

                $scope.showcallmsg(item);
                $scope.timer=$interval(function(){
                    $ionicLoading.hide();

                   $timeout(function(){
                       $scope.showcallmsg(item);

                   },1000);
                },3500)


                $scope.playvoice(text);



            }else{
                $scope.isplaying=false;
                /*me.isplaying=false;
                 me.playlist=[];*/
                /*navigator.speech.removeEventListener("SpeakCompleted",function(){});
                 navigator.speech.stopSpeaking();*/
            }



        };

        $scope.makeSpeak=function(data){
            $scope.playlist=$scope.playlist.concat(data);
            if(!$scope.isplaying){
                $scope.isplaying=true;
                $scope.makevoiceanddisplay();
            }
          //console.log(data);
        };







    });
