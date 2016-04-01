
angular.module("angularfireSlackApp",["firebase","angular-md5","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("home",{url:"/",templateUrl:"home/home.html",resolve:{requireNoAuth:["$state","Auth",function(a,b){return b.$requireAuth().then(function(b){a.go("channels")},function(a){})}]}}).state("login",{url:"/login",controller:"AuthCtrl as authCtrl",templateUrl:"auth/login.html",resolve:{requireNoAuth:["$state","Auth",function(a,b){return b.$requireAuth().then(function(b){a.go("home")},function(a){})}]}}).state("register",{url:"/register",controller:"AuthCtrl as authCtrl",templateUrl:"auth/register.html",resolve:{requireNoAuth:["$state","Auth",function(a,b){return b.$requireAuth().then(function(b){a.go("home")},function(a){})}]}}).state("profile",{url:"/profile",controller:"ProfileCtrl as profileCtrl",templateUrl:"users/profile.html",resolve:{auth:["$state","Users","Auth",function(a,b,c){return c.$requireAuth()["catch"](function(){a.go("home")})}],profile:["Users","Auth",function(a,b){return b.$requireAuth().then(function(b){return a.getProfile(b.uid).$loaded()})}]}}).state("channels",{url:"/channels",templateUrl:"channels/index.html",controller:"ChannelsCtrl as channelsCtrl",resolve:{channels:["Channels",function(a){return a.$loaded()}],profile:["$state","Auth","Users",function(a,b,c){return b.$requireAuth().then(function(b){return c.getProfile(b.uid).$loaded().then(function(b){return b.displayName?b:void a.go("profile")})},function(b){a.go("home")})}]}}).state("channels.create",{url:"/create",templateUrl:"channels/create.html",controller:"ChannelsCtrl as channelsCtrl"}).state("channels.messages",{url:"/{channelId}/messages",templateUrl:"channels/messages.html",controller:"MessagesCtrl as messagesCtrl",resolve:{messages:["$stateParams","Messages",function(a,b){return b.forChannel(a.channelId).$loaded()}],channelName:["$stateParams","channels",function(a,b){return"#"+b.$getRecord(a.channelId).name}]}}).state("channels.direct",{url:"/{uid}/messages/direct",templateUrl:"channels/messages.html",controller:"MessagesCtrl as messagesCtrl",resolve:{messages:["$stateParams","Messages","profile",function(a,b,c){return b.forUsers(a.uid,c.$id).$loaded()}],channelName:["$stateParams","Users",function(a,b){return b.all.$loaded().then(function(){return"@"+b.getDisplayName(a.uid)})}]}}),b.otherwise("/")}]).constant("FirebaseUrl","https://kychat.firebaseio.com/"),angular.module("angularfireSlackApp").controller("AuthCtrl",["Auth","$state",function(a,b){var c=this;c.user={email:"",password:""},c.login=function(){a.$authWithPassword(c.user).then(function(a){b.go("home")},function(a){c.error=a})},c.register=function(){a.$createUser(c.user).then(function(a){c.login()},function(a){c.error=a})}}]),angular.module("angularfireSlackApp").factory("Auth",["$firebaseAuth","FirebaseUrl",function(a,b){var c=new Firebase(b),d=a(c);return d}]),angular.module("angularfireSlackApp").controller("ProfileCtrl",["$state","md5","auth","profile",function(a,b,c,d){var e=this;e.profile=d,e.updateProfile=function(){e.profile.emailHash=b.createHash(c.password.email),e.profile.$save().then(function(){a.go("channels")})}}]),angular.module("angularfireSlackApp").factory("Users",["$firebaseArray","$firebaseObject","FirebaseUrl",function(a,b,c){var d=new Firebase(c+"users"),e=new Firebase(c+".info/connected"),f=a(d),g={getProfile:function(a){return b(d.child(a))},getDisplayName:function(a){return f.$getRecord(a).displayName},getGravatar:function(a){return"//www.gravatar.com/avatar/"+f.$getRecord(a).emailHash},setOnline:function(c){var f=b(e),g=a(d.child(c+"/online"));f.$watch(function(){f.$value===!0&&g.$add(!0).then(function(a){a.onDisconnect().remove()})})},all:f};return g}]),angular.module("angularfireSlackApp").controller("ChannelsCtrl",["$state","Auth","Users","profile","channels",function(a,b,c,d,e){var f=this;c.setOnline(d.$id),f.profile=d,f.channels=e,f.users=c.all,f.getDisplayName=c.getDisplayName,f.getGravatar=c.getGravatar,f.logout=function(){f.profile.online=null,f.profile.$save().then(function(){b.$unauth(),a.go("home")})},f.newChannel={name:""},f.createChannel=function(){f.channels.$add(f.newChannel).then(function(b){a.go("channels.messages",{channelId:b.key()})})}}]),angular.module("angularfireSlackApp").factory("Channels",["$firebaseArray","FirebaseUrl",function(a,b){var c=new Firebase(b+"channels"),d=a(c);return d}]),angular.module("angularfireSlackApp").controller("MessagesCtrl",["profile","channelName","messages",function(a,b,c){var d=this;d.messages=c,d.channelName=b,d.message="",d.sendMessage=function(){d.message.length>0&&d.messages.$add({uid:a.$id,body:d.message,timestamp:Firebase.ServerValue.TIMESTAMP}).then(function(){d.message=""})}}]),angular.module("angularfireSlackApp").factory("Messages",["$firebaseArray","FirebaseUrl",function(a,b){var c=new Firebase(b+"channelMessages"),d=new Firebase(b+"userMessages");return{forChannel:function(b){return a(c.child(b))},forUsers:function(b,c){var e=c>b?b+"/"+c:c+"/"+b;return a(d.child(e))}}}]);

//angular.moule("angularfireSlackApp",["firebase","angular-md5","ui.router"])/
//  /////.config(["$stateProvider","$urlRouterProvider",function(a,b)////
//  {a.state("home",{url:"/",templateUrl:"home/home.html"
//    ,resolve:{requireNoAuth:["$state","Auth",function(a,b)
//    {return b.$requireAuth().then(function(b)
//    {a.go("channels")},function(a){})}]}})
//    .state("login",
//      {url:"/login",
//        controller:"AuthCtrl as authCtrl",
//        templateUrl:"auth/login.html",
//        resolve:{requireNoAuth:["$state","Auth",function(a,b){return b.$requireAuth()
//          .then(function(b){a.go("home")},function(a){})}]}})
//    //add register state controller
//    .state("register",
//      {url:"/register",controller:"AuthCtrl as authCtrl",templateUrl:"auth/register.html",resolve:
//      {requireNoAuth:["$state","Auth",function(a,b)
//      {return b.$requireAuth().then(function(b)
//      {a.go("home")},function(a){})}]}})
//    //add profiles state controller
//    .state("profile",
//      {url:"/profile",
//        controller:"ProfileCtrl as profileCtrl",
//        templateUrl:"users/profile.html",
//        resolve:
//        {auth:["$state","Users","Auth",function(a,b,c)
//        {return c.$requireAuth()["catch"](function()
//        {a.go("home")})}],
//          profile:["Users","Auth",function(a,b)
//          {return b.$requireAuth().then(function(b){return a.getProfile(b.uid).$loaded()})}]}})
//    // add channels state
//    .state("channels",
//      //sets the template to channels
//      {url:"/channels",templateUrl:"channels/index.html",controller:"ChannelsCtrl as channelsCtrl",resolve:
//      {channels:["Channels",function(a){return a.$loaded()}],
//    profile:["$state","Auth","Users",function(a,b,c) {return b.$requireAuth()
//          .then(function(b){return c.getProfile(b.uid)
//            .$loaded().then(function(b)
//        {return b.displayName?b:void a.go("profile")}),
//            function(b){a.go("home")})}]}})},
//    //created a new state of channels.create*
//    .state("channels.create",
//      {url:"/create",
//        templateUrl:"channels/create.html",
//        controller:"ChannelsCtrl as channelsCtrl"})
//    //created a new state of channels.messages *
//    .state("channels.messages",
//      {url:"/{channelId}/messages",
//        templateUrl:"channels/messages.html",
//        controller:"MessagesCtrl as messagesCtrl",
//        resolve:{messages:["$stateParams","Messages",function(a,b)
//        {return b.forChannel(a.channelId).$loaded()}],
//          channelName:["$stateParams","channels",function(a,b){return"#"+b.$getRecord(a.channelId).name}]}})
//    //create a new state channels.direct this is teh same model as channels .messages
//    .state("channels.direct",
//      {url:"/{uid}/messages/direct",
//        templateUrl:"channels/messages.html",
//        controller:"MessagesCtrl as messagesCtrl",
//        resolve:
//        {messages:["$stateParams","Messages","profile",function(a,b,c)
//        {return b.forUsers(a.uid,c.$id).$loaded()}],
//          channelName:["$stateParams","Users",function(a,b){return b.all.$loaded()
//            .then(function(){return"@"+b
//                .getDisplayName(a.uid)})}]}}),b.otherwise("/")}])
//  .constant("FirebaseUrl","https://kychat.firebaseio.com/")
//
//  //finish main funciton app angular fire slack app.
//  angular.module("angularfireSlackApp")
//  .controller("AuthCtrl",["Auth","$state",function(a,b)
//  {var c=this;c.user={email:"",password:""}c.login=function()
//  {a.$authWithPassword(c.user).then(function(a){b.go("home")},function(a){c.error=a})}c.register=function(){a.$createUser(c.user).then(function(a){c.login()},function(a)
//    {c.error=a})}}]),
//  angular.module("angularfireSlackApp")
//  //auth control for application in angular
//  .factory("Auth",["$firebaseAuth","FirebaseUrl",
//    function(a,b){var c=new Firebase(b),d=a(c);return d}])
//  //auth ctrl creates the way the email and pass word are registered to account
//  //**make a controller for your profile
//  ,angular.module("angularfireSlackApp")
//  .controller("ProfileCtrl",["$state","md5","auth","profile",function(a,b,c,d)
//  {var e=this;
//    e.profile=d,
//      e.updateProfile=function()
//      {e.profile.emailHash=b.createHash(c.password.email),e.profile
//        .$save().then(function(){a.go("channels")})}}]),
//  angular.module("angularfireSlackApp")
//    .factory("Users",
//      ["$firebaseArray","$firebaseObject","FirebaseUrl",
//        function(a,b,c)
//        //create a reference to the node on your firebase informing that user is connected (green light on slack app)
//        {var d=new Firebase(c+"users"),
//          e=new Firebase(c+".info/connected"),f=a(d),g={getProfile:function(a){return b(d.child(a))},getDisplayName:function(a){return f.$getRecord(a).displayName},getGravatar:function(a){return"//www.gravatar.com/avatar/"+f.$getRecord(a).emailHash},
//
//            setOnline:function(c){var f=b(e),g=a(d.child(c+"/online"));f.$watch(function()
//            {f.$value===!0&&g.$add(!0).then(function(a){a.onDisconnect().remove()})})},all:f}
//          ;return g}]),
//  //design a controller for you channels use the same system for your message system
//  angular.module("angularfireSlackApp")
//    .controller("ChannelsCtrl",
//      ["$state","Auth","Users","profile","channels",function(a,b,c,d,e)
//      //^c.all sets channels control to all
//      //sets current users online
//      {var f=this;
//        c.setOnline(d.$id),
//        f.profile=d,
//        f.channels=e,
//        f.users=c.all,
//        //get display name and gravtar image
//        f.getDisplayName=c.getDisplayName,
//        f.getGravatar=c.getGravatar,
//        //update our logout function to wiped out the online array when each user logs out this is because users have their own information stored to them so we can remove this info without effecting any of the operational arrays
//        f.logout=function(){
//      f.profile.online=null,
//        f.profile.$save().then(function(){
//          b.$unauth(),a.go("home")})}
//        //add control for new channels into channels control
//        ,f.newChannel={name:''},
//        f.createChannel=function(){f.channels.$add(f.newChannel).then(function(b){a.go("channels.messages",
//        {
//          channelId:b.key()
//        })})}}]),
//  angular.module("angularfireSlackApp").factory("Channels",
//    ["$firebaseArray","FirebaseUrl",function(a,b)
//    {var c=new Firebase(b+"channels"),d=a(c);return d}]),
//
//  //angular module for message control modelled on channels
//  angular.module("angularfireSlackApp")
//    .controller("MessagesCtrl",["profile","channelName","messages",function(a,b,c)
//    {var d=this;d.messages=c,d.channelName=b,d.message="",d.sendMessage=function()
//    //create a function for send messages to $add a message to previous messages Really cool.
//    {d.message.length>0&&d.messages
//      .$add({
//        uid:a.$id,body:d.message,timestamp:Firebase.ServerValue.TIMESTAMP
//      })
//      .then(function()
//      {d.message=""
//      })}}]),
//  //Makes a modules that creates a service for retreiving messages
//  angular.module("angularfireSlackApp")
//    .factory("Messages",
//      ["$firebaseArray","FirebaseUrl",function(a,b)
//      {var c=new Firebase(b+"channelMessages"),
//        d=new Firebase(b+"userMessages");
//        //message^s are refereenced to firebase
//        //retrieve direct messages betewn two users, given their uids
//        return{
//          forChannel:
//          function(b)
//          {return a(c.child(b))
//          },
//          forUsers:
//            function(b,c)
//            {var e=c>b?b+"/"+c:c+"/"+b;
//              return a(d.child(e))}}}]);
// //message will be stored as {
////"userMessages": {
////  "simplelogin:1": {
////    "simplelogin:2": {
////      "messageId1": {
////        "uid": "simplelogin:1",
////          "body": "Hello!",
////          "timestamp": Firebase.ServerValue.TIMESTAMP
////      },
////      "messageId2": {
////        "uid": "simplelogin:2",
////          "body": "Hey!",
////          "timestamp": Firebase.ServerValue.TIMESTAMP
////      }
//    }
//  }
//} in firebase array

 //* ngdoc overview

 //* ame angularfireSlackApp
 //* description
 ////* # angularfireSlackApp6
 //*
 //* Main module of the application.
// */
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
