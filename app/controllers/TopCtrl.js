"use strict";

app.controller("TopCtrl", function($scope, $window, $route, AuthFactory){
  let currentUser = null;
  $scope.isReady = false;

  let DATABASEREF = firebase.database().ref();
  DATABASEREF.on("value", (snapshot)=>{
    let contributions = snapshot.val().contributions;
    console.log("contributions changed", contributions)
    $scope.numberOfContributions = '';
    if (contributions){
      console.log("you have contributions");
      $scope.numberOfContributions = Object.keys(contributions).length;
      Object.keys(contributions).forEach((key)=>{
        let userId = AuthFactory.getUserId();
        if (contributions[key].uid === userId){
          $scope.hasContributions = true;
          $scope.$apply();
        }
      else {
        console.log("none of the contributions are for you");
        $scope.hasContributions = false;
        $scope.numberOfContributions = 0;
        $scope.$apply();
      }
      })
    } else {
      console.log("no contributions");
      $scope.hasContributions = false;
    }
    let members = snapshot.val().members;
    if (members){
      $scope.membersArr = [];
      Object.keys(members).forEach((key)=>{
        let userId = AuthFactory.getUserId();
        if (members[key].uid === userId){
          $scope.membersArr.push(members[key]);
        }
      })
    }
  })


  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      currentUser = user.uid;
      console.log("Current user logged is?", user.uid);
      $scope.isLoggedIn = true;
      // $window.location.href = '#/launch';
      // checkRoute();
      $route.reload();
      $scope.isReady = true;
    } else {
      $scope.isReady = false;
      console.log("no user", $scope.isReady);
      currentUser = null;
      $scope.isLoggedIn = false;
      $window.location.href = '#/';
    }
  });


});
