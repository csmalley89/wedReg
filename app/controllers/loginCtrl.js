"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $window){

  $scope.account = {
    email: "",
    password: ""
  };

  $scope.register = ()=>{
    console.log("You clicked register!");
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((userData)=>{
      console.log("user data", userData);
      if (userData){
        $scope.login();
      }
      let userObj = {
        email: userData.email,
        uid: userData.uid,
        displayName: $scope.account.email
      }
      AuthFactory.saveUserToFirebase(userObj)
      .then(()=>{
        console.log("successfully saved user!");
      })
    }, (error)=>{
      console.log(`Error creating user ${error}`);
    });
  };

  $scope.login = ()=> {
    console.log("You're logging in with an email");
    AuthFactory.loginUser($scope.account)
    .then((data)=>{
      console.log("You logged in with your email", data);
      let currentUserId = data.uid;
      checkWithCurrentUsers(data, currentUserId);
      if (data){
        $window.location.href = '#/registry/addgifts';
      }
    }, (error)=>{
      console.log(`Error logging in user ${error}`);
    });
  };


  function checkWithCurrentUsers(userData, currentUserId){
    let count = 0;
    AuthFactory.getAllUsers()
    .then((users)=>{
      console.log("here's the user data", userData);
      if (users){
        Object.keys(users).forEach((key)=>{
          if (currentUserId === users[key].uid) {
            console.log("this user has already been saved");
            count ++;
          }
        });
      }
      if (count === 0 || !users){
        let userObj = {
          email: userData.email,
          uid: userData.uid,
          displayName: userData.displayName,
          photoUrl: userData.photoUrl
        }
        AuthFactory.saveUserToFirebase(userObj);
      }
    });
  }


});

