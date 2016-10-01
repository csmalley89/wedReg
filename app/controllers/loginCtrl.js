"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, RegistryFactory, $route, $window, MemberFactory){
  let registryId,
      guestId,
      userId;

  $scope.account = {
    email: "",
    password: ""
  };
  $scope.registry = {
    firstName1: "",
    lastName1: "",
    firstName2: "",
    lastName2: "",
    WeddingDate:"",
    location: "",
    coupleStreet: "",
    coupleCity: "",
    coupleState: "",
    coupleZip: ""
  };
  $scope.guest = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  };


  $scope.coupleRegister = ()=>{
    console.log("You clicked register!");
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((userData)=>{
      let userObj = {
        email: userData.email,
        uid: userData.uid,
      }
      AuthFactory.saveUserToFirebase(userObj)
      RegistryFactory.createRegistry($scope.registry)
      .then((registryData)=>{
        registryId = registryData.name;
        let memberObj = {
          uid: AuthFactory.getUserId(),
          registryId: registryId,
          role: 'couple'
        }
        MemberFactory.addMember(memberObj)
        if (registryData) {
          $window.location.href = "#/registry/addgifts";
        } else {
          $window.location.href = "#/";
        }
      })
    }, (error)=>{
      console.log(`Error creating user ${error}`);
    });
  };

  $scope.guestRegister = ()=>{
    console.log("You clicked register!");
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((userData)=>{
      let userObj = {
        email: userData.email,
        uid: userData.uid,
      }
      AuthFactory.saveUserToFirebase(userObj)
      RegistryFactory.createGuest($scope.guest)
      .then((guestData)=>{
        guestId = guestData.name;
        let memberObj = {
          uid: AuthFactory.getUserId(),
          registryId: null,
          guestId: guestId,
          role: 'guest'
        }
        MemberFactory.addMember(memberObj)
        if (guestData) {
          $window.location.href = "#/findcouple";
        } else {
          $window.location.href = "#/";
        }
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

