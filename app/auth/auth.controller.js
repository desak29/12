//angular.module('kyChatApp')
//  .controller('AuthCtrl', function (Auth, $state) {
//    var authCtrl = this;
//    authCtrl.user = {
//      email: '',
//      password: ''
//    },
//    c.login = function () {
//      Auth.$authWithPassword(authCtrl.user).then(function (auth) {
//        $state.go('home');
//      }, function (error) {
//        authCtrl.error = error;
//      });
//
//    }
//    authCtrl.register = function () {
//      Auth.$createUser(authCtrl.user).then(function (user) {
//        authCtrl.login();
//      }, function (error) {
//        authCtrl.error = error;
//      });
//    };
//  });

'use strict',angular.module("kyChatApp").controller("AuthCtrl",["Auth","$state",function(a,b){var c=this;c.user={email:"",password:""},c.login=function(){a.$authWithPassword(c.user).then(function(a){b.go("home")},function(a){c.error=a})},c.register=function(){a.$createUser(c.user).then(function(a){c.login()},function(a){c.error=a})}}])







