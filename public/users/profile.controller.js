//{angular.module('kyChatApp')
//.controller('ProfileCtrl',function($state,md5,auth,profile){
//    var profileCtrl=this;
//    profileCtrl.profile = profile;
//    //create the profile control for our function
//    profileCtrl.updateProfile = function(){
//      profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
//      profileCtrl.profile.$save();
//    };
//
//
//  })}
//this beginning template helped me learn the process of guess an dchecking and then i folded all my script together so it makes it more digficult tovie
//{angular.module('kyChatApp')
//.controller('ProfileCtrl',function($state,md5,auth,profile){
//    var profileCtrl=this;
//    profileCtrl.profile = profile;
//    //create the profile control for our function
//    profileCtrl.updateProfile = function(){
//      profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
//      profileCtrl.profile.$save();
//    };
//
//
//  })}
//

angular.module("kyChatApp").controller("ProfileCtrl",["$state","md5","auth","profile",function(a,b,c,d){var e=this;e.profile=d,e.updateProfile=function(){e.profile.emailHash=b.createHash(c.password.email),e.profile.$save().then(function(){a.go("channels")})}}])

//now allows for the creation of channels but script is still being improved need new feautures
