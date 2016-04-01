angular.module("kyChatApp").factory("Channels",["$firebaseArray","FirebaseUrl",function(a,b){var c=new Firebase(b+"channels"),d=a(c);return d}])
