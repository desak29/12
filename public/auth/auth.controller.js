

//step two use this basic registration outline to include a funciton that inputs login and register and allows the authorization of a profile too occure

'use strict' ,
angular.module('kyChatApp').controller("AuthCtrl",["Auth","$state",function(a,b){var c=this;c.user={email:"",password:""},c.login=function(){a.$authWithPassword(c.user).then(function(a){b.go("home")},function(a){c.error=a})},c.register=function(){a.$createUser(c.user).then(function(a){c.login()},function(a){c.error=a})}}])







