//angular.module('kyChatApp').factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){
//    var usersRef = new Firebase(FirebaseUrl+'users');
//    var users = $firebaseArray(usersRef);
//    var Users = {
//      getProfile: function (uid) {
//        return $firebaseObject(usersRef.child(uid));
//      },
//      getDisplayName: function (uid) {
//        return users.$getRecord(uid).displayName;
//      },
//      getGravatar: function (uid) {
//        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
//      },
//
//  { all: users},
//  {
//    return Users;})
//  angular syntax is extremely difficult its important to use the function(a,b) method to seperate the various compartments of your controller offactory
//  Data in Firebase is stored in a tree structure and child nodes can be referenced by adding a path to our FirebaseUrl, so https://firebase-name-here.firebase.io.com/users refers to the users node.
angular.module("kyChatApp")
  .factory("Auth",["$firebaseAuth","FirebaseUrl",function(a,b){var c=new Firebase(b),d=a(c);return d}])
