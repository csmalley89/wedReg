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
        firstName: $scope.registry.firstName1,
        lastName: $scope.registry.lastName1,
        firstName2: $scope.registry.firstName2,
        lastName2: $scope.registry.lastName2,
        WeddingDate: $scope.registry.WeddingDate,
        location: $scope.registry.location,
        coupleStreet: $scope.registry.coupleStreet,
        coupleCity: $scope.registry.coupleCity,
        coupleState: $scope.registry.coupleState,
        coupleZip: $scope.registry.coupleZip
      }
      AuthFactory.saveUserToFirebase(userObj)
      RegistryFactory.createRegistry($scope.registry)
      .then((registryData)=>{
        $scope.registry.uid = registryData.uid;
        // registryId = registryData.name;
        let memberObj = {
          uid: AuthFactory.getUserId(),
          registryId: registryData.name,
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
        firstName: $scope.guest.firstName,
        lastName: $scope.guest.lastName,
        guestStreet: $scope.guest.street,
        guestCity: $scope.guest.city,
        guestState: $scope.guest.state,
        guestZip: $scope.guest.zip
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
      let userRole = data.role;
      let currentUserId = data.uid;
      getMemberRole(data, userRole, currentUserId);
      if (userRole){
        console.log(userRole)
        // $window.location.href = '#/findcouple';
      } else {
        $window.location.href = '#/findcouple';
      }
    }, (error)=>{
      console.log(`Error logging in user ${error}`);
    });
  };


  function getMemberRole(memberData, userRole, currentUserId){
    // let userRole;
    let members;
    MemberFactory.getMembers()
    .then((members)=>{
      if(members){
        Object.keys(members).forEach((key)=>{
          if (members[key].role === "couple" && currentUserId === members[key].uid) {
            let userRole = members[key].role;
            $window.location.href = '#/registry/addgifts/';
            console.log(members[key].uid)
            console.log(members[key].role)
            console.log(userRole)
          }
        });
      }
    })
  }



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

