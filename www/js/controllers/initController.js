/**
 * Created by jack on 15-8-14.
 */
var remoteloaded=true;
angular.module('app.controllers')
    .controller('initController', function ($scope,$state, $interval, $timeout, $ionicModal, $rootScope, $ionicLoading) {
        if (!localStorage.totaltimes)localStorage.totaltimes = 1;
        if (!localStorage.showlines)localStorage.showlines = 3;
        $scope.socket = null;
        $scope.speaktimes = 0;
        $scope.playlist = [];

        $scope.isplay=true;
        $scope.isplaying = false;
        $scope.callingindex = 0;

        $scope.configdata = localStorage.configdata ? JSON.parse(localStorage.configdata) : {};

        console.log('initController');

        $ionicModal.fromTemplateUrl(localStorage.serverurl+'app/big/templates/config.html?t='+(new Date().getTime()), {
            scope: $scope
        }).then(function (modal) {
            $scope.configmodal = modal;
            $rootScope.$broadcast('initWebSocket', $scope);

        });

        //make config
        $scope.makeConfig = function (configdata) {
            localStorage.configdata = JSON.stringify(configdata);
            localStorage.serverurl=configdata.serverurl;
            $scope.configmodal.hide();
            window.location.reload();

        };



        $scope.playTextVoice=function(text,speed){
            navigator.speech.startSpeaking(text, {voice_name: 'xiaoyan', speed: speed});

        };
        $scope.playvoice = function (text) {
            $scope.speaktimes++;
            try {
                //navigator.speech.startSpeaking( text , {voice_name: 'xiaoyan',speed: localStorage.speed} );
                navigator.speech.startSpeaking(text[0], {voice_name: 'xiaoyan', speed: '30'});
                setTimeout(function () {
                    navigator.speech.startSpeaking(text[1] + '.' + text[1], {voice_name: 'xiaoyan', speed: '10'});
                }, 2000);


                setTimeout(function () {
                    navigator.speech.startSpeaking(text[2], {voice_name: 'xiaoyan', speed: '30'});
                }, (function (str) {
                    if (!str || str == "")return 6000;
                    else if (str.length == 2)return 5400;
                    else if (str.length == 3)return 6400;
                    else if (str.length == 4)return 6800;
                    else return 6000;
                }(text[1])));


            } catch (e) {
            }
            finally {
                setTimeout(function () {
                    if ($scope.speaktimes >= localStorage.totaltimes) {
                        $scope.speaktimes = 0;
                        delete $scope.playlist[$scope.callingindex];

                        $scope.callingindex++;
                        //$ionicLoading.hide();
                        //$interval.cancel($scope.timer);
                        $scope.makevoiceanddisplay();
                    } else {
                        //tipvoice.removeEventListener('ended',voiceEnd,false);

                        $scope.playvoice(text);
                    }
                }, 10000);
            }
            ;
        };


        $scope.showcallmsg = function (item) {
            $ionicLoading.show({
                template: '<div id="showmsg" style="font-size: 10px; line-height: normal;text-align: center;">' + '<a style="font-weight: bold">' + item.hzxh + '</a>'
                + '   <a style="font-weight: bold">' + item.hzxm + '</a>'
                + '<br><a style="font-weight: bold">' + item.zsmc + '</a>'
                + '</div>',
                animation: 'fade-in',
                /*maxWidth: 200,*/
                showBackdrop: false

            });
            $timeout(function () {
                $('#showmsg').animate({fontSize:'7em'},'slow').parent().fadeIn(1500).fadeOut(1500).fadeIn(1500).fadeOut(1500).fadeIn(1500).fadeOut(1000,function(){
                    $ionicLoading.hide();
                });
            }, 10);

        };
        $scope.makevoiceanddisplay = function () {

            if (($scope.playlist.length - 1) >= $scope.callingindex) {


                var item = $scope.playlist[$scope.callingindex];
                //var text="请 "+item.showno+item.patname+" 到"+item.roomname+"机房门口等候检查";
                var affixmsg=item.hzxh.indexOf("回")>=0?"":"号";
                var text = ["请 " + item.hzxh+affixmsg, item.hzxm, " 到" + item.zsmc + "准备就诊"];
                //console.log(text);

                $scope.showcallmsg(item);
                /*$scope.timer = $interval(function () {
                    $ionicLoading.hide();

                    $timeout(function () {
                        $scope.showcallmsg(item);
                    }, 500);
                }, 3500)*/

                $scope.playvoice(text);

            } else {
                $scope.isplaying = false;
                /*me.isplaying=false;
                 me.playlist=[];*/
                /*navigator.speech.removeEventListener("SpeakCompleted",function(){});
                 navigator.speech.stopSpeaking();*/
            }


        };

        $scope.makeSpeak = function (data) {
            $scope.playlist = $scope.playlist.concat(data);
            //console.log(data);
            if (!$scope.isplaying) {
                $scope.isplaying = true;
                $scope.makevoiceanddisplay();
            }
            //console.log(data);
        };
        $scope.makeroomtitles = function (data) {
            for(var i=0;i<data.length;i++){
                if(!$scope["data"+data[i].room_order]){
                    $scope["data"+data[i].room_order]={};
                }
                $scope["data"+data[i].room_order].title2=data[i].room_name;
                $scope["data"+data[i].room_order].title=data[i].room_name_2;

            }
        };


    });
