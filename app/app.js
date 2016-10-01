"use strict";

var app = angular.module("wedReg", ["ngRoute", "ui.materialize", "countdownTimer", "btford.modal", "dndLists"])
.constant("FirebaseURL", "https://test2-3c837.firebaseio.com");




let isAuth = (AuthFactory)=> new Promise((resolve, reject)=>{
    if(AuthFactory.isAuthenticated()){
      console.log("user");
      resolve();
    } else {
      console.log("no user");
      // $window.location.href="#/"
      reject();
    }
});
app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/launch.html',
    controller: 'LoginCtrl'
  })
  .when('/findcouple', {
    templateUrl: 'partials/guest-home.html',
    controller: 'GuestJoinCtrl',
    resolve: {isAuth}
  })
  .when('/registry/addgifts', {
    templateUrl: 'partials/couple-home.html',
    controller: 'AmazonCtrl',
    resolve: {isAuth}
  })
  .when('/registry/:registryId', {
    templateUrl: 'partials/coupleViewItems.html',
    controller: 'GiftCtrl',
    resolve: {isAuth}
  })
  .otherwise('/');
});

//Initializes Firebase right away
app.run((FBCreds)=>{
  console.log("firebase running");
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.fbKey,
    authDomain: creds.fbAuth,
    databaseURL: creds.databaseURL,
    storageBucket: creds.storageBucket
  };

  firebase.initializeApp(authConfig);

});
