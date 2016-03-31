
angular.module("kyChatApp",["firebase","angular-md5","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b)
  'use strict',

 {a.state.("home",{url:"/",templateUrl:"home/home.html"},resolve:{requireNoAuth:["$state","Auth",function(a,b)
  {return b.$requireAuth().then(function(b){a.go("channels")},function(a){})}]}}).state("login",{url:"/login",controller:"AuthCtrl as authCtrl",
    templateUrl:"auth/login.html",resolve:{requireNoAuth:["$state","Auth",function(a,b){return b.$requireAuth().then(function(b){a.go("home")},
      function(a){})}]}}).state("register",{url:"/register",controller:"AuthCtrl as authCtrl",templateUrl:"auth/register.html",resolve:{requireNoAuth:
    ["$state","Auth",function(a,b){return b.$requireAuth().then(function(b){a.go("home")},function(a){})}]}}).state("profile",{url:"/profile",controller:
    "ProfileCtrl as profileCtrl",templateUrl:"users/profile.html",resolve:{auth:["$state","Users","Auth",function(a,b,c){return c.$requireAuth()["catch"]
  (function(){a.go("home")})}],profile:["Users","Auth",function(a,b){return b.$requireAuth().then(function(b){return a.getProfile(b.uid).$loaded()})}]}}).state
  ("channels",{url:"/channels",templateUrl:"channels/index.html",controller:"ChannelsCtrl as channelsCtrl",resolve:{channels:["Channels",function(a){return a.$loaded()}],
    profile:["$state","Auth","Users",function(a,b,c){return b.$requireAuth().then(function(b){return c.getProfile(b.uid).$loaded().then(function(b){return b.displayName?b:void a.go("profile")})},function(b){a.go("home")})}]}}).state("channels.create",{url:"/create",templateUrl:"channels/create.html",controller:"ChannelsCtrl as channelsCtrl"}).state("channels.messages",{url:"/{channelId}/messages",templateUrl:"channels/messages.html",controller:"MessagesCtrl as messagesCtrl",resolve:{messages:["$stateParams","Messages",function(a,b){return b.forChannel(a.channelId).$loaded()}],channelName:["$stateParams","channels",function(a,b){return"#"+b.$getRecord(a.channelId).name}]}}).state("channels.direct",{url:"/{uid}/messages/direct",templateUrl:"channels/messages.html",controller:"MessagesCtrl as messagesCtrl",resolve:{messages:["$stateParams","Messages","profile",function(a,b,c){return b.forUsers(a.uid,c.$id).$loaded()}],channelName:["$stateParams","Users",function(a,b){return b.all.$loaded().then(function(){return"@"+b.getDisplayName(a.uid)})}]}}),b.otherwise("/")}]).constant("FirebaseUrl","https://kychat.firebaseio.com/")
 // @ngdoc overview*
 // @name angularfireSlackApp
 //@description
 /// # angularfireSlackApp6
 //
 // Main module of the application.
// /
//angular.module("kyChatApp", [
//    "firebase",
//    "angular-md5",
//    "ui.router"
//  ])

//  .config("$stateProvider", "$urlRouterProvider",function(a,b){
//    a.state("home", {
//        url: '/',
//        templateUrl: 'home/home.html'
//      })
//      .state("login",{
//        url: "/login",
//
//        controller:'AuthCtrl as authCtrl',
//        templateUrl: 'auth/login.html',
//        resolve: {
//          requireNoAuth: ["$state", "Auth",function(a,b){
//            return Auth.$requireAuth().then(function(auth){
//              $state.go('home');
//            }, function(error){
//              return;
//            });
//          }
//        }
//
//      }),
//      .state('register', {
//        url: '/register',
//
//        controller:'AuthCtrl as authCtrl',
//        templateUrl: 'auth/register.html',
//        resolve: {
//          requireNoAuth: function($state, Auth){
//            return Auth.$requireAuth().then(function(auth){
//              $state.go('home');
//            }, function(error){
//              return;
//            });
//          }
//        }
//
//      }),
//
//      .state('profile', {
//        url: '/profile',
//        resolve: {
//          auth: function($state, Users, Auth){
//            return Auth.$requireAuth().catch(function(){
//              $state.go('home');
//            });
//          },
//          profile: function(Users, Auth){
//            return Auth.$requireAuth().then(function(auth){
//              return Users.getProfile(auth.uid).$loaded();
//            });
//          }
//        }
//      })}
//
//
//    {
//      $urlRouterProvider.otherwise('/')}}
//
//.constant('FirebaseUrl','https://kychat.firebaseio.com/'))
