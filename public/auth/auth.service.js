  //  angular.module('kyChatApp')
  //    .factory('Auth',function($firebaseAuth,FirebaseUrl){
  //  var ref = new Firebase(FirebaseUrl);
  //  var auth=$firebaseAuth(ref);
  //  return auth;
  //
  //});
  angular.module("kyChatApp")
    .factory("Auth",["$firebaseAuth","FirebaseUrl",function(a,b){var c=new Firebase(b),d=a(c);return d}])



  //    reframe so that code isnt as visible for application also eventually simplify for ionic app


