"use strict";

app.controller("NavCtrl", function($scope, AuthFactory, RegistryFactory, $window, MemberFactory, $timeout, SearchTermData, $location){
  $scope.searchText = SearchTermData;
  $scope.navItems = [
      {url: "#/logout", name: "Logout", showState: "$parent.isLoggedIn"},
      {url: "#/login", name: "Login", showState: "!$parent.isLoggedIn"},
      {url: "#/registry/addgifts", name: "Add to Registry", showState: "$parent.isLoggedIn"},
      {url: "#/registry/viewgifts/${registryId)", name: "View Registry", showState: "$parent.isLoggedIn"}
  ];
  $scope.isActive = (viewLocation) => viewLocation === $location.path();

  $scope.logout = function(){
    AuthFactory.logoutUser();
  };

  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      getRegistries();
      // getInvitations();
      AuthFactory.getUser(AuthFactory.getUserId())
      .then((userData)=>{
        Object.keys(userData).forEach((key)=>{
          $scope.userName = userData[key].displayName;
        })
      })
    }
  });

  //We cannot grab the invitations for a user if the webpage does not recognize that a user is logged in. Therefore, we need to watch the state - isReady to make sure it is true before checking for notifications. We also want to watch the length of the notifications
  // $scope.$watch('isReady', function isReadyChange(newValue, oldValue) {
  //   console.log("new value", newValue);
  //   if ($scope.isReady){
  //     getInvitations();
  //     // getRegistries();
  //     $scope.$watch('numberOfInvitations', function numberOfInvitationsChange(newValue, oldValue) {
  //       console.log("new value, oldValue", newValue, oldValue)
  //       getInvitations();
  //     }, true);
  //   }
  // }, true);


  // $scope.getInvitations = ()=>{
  //   getInvitations();
  // };

  // function getInvitations (){
  //   let invitationsArr = [];
  //   console.log("get invitations is running");
  //   RegistryFactory.getInvitations()
  //   .then((invitations)=>{
  //     console.log("invitations to you", invitations);
  //     if(Object.keys(invitations).length){
  //       $scope.hasInvitations = true;
  //       Object.keys(invitations).forEach((key)=>{
  //         invitations[key].id = key;
  //         invitationsArr.push(invitations[key]);
  //       })
  //       $scope.invitations = invitations
  //     } else {
  //       $scope.hasInvitations = false;
  //     }
  //   });
  // }

  // $scope.acceptOrDecline = (invitation)=>{
  //   let modalInstance = $uibModal.open({
  //     templateUrl: 'partials/RespondToInviteModal.html',
  //     controller: 'RespondToInviteModalCtrl',
  //     resolve: {
  //       invitation
  //     }
  //   });
  // }

  $scope.getRegistries = ()=>{
    getRegistries();
  };

  function getRegistries (){
    let registries = [];
    MemberFactory.getMembers(AuthFactory.getUserId())
    .then((memberData)=>{
      Object.keys(memberData).forEach((key)=>{
        let registryId = memberData[key].registryId
        RegistryFactory.getSingleRegistry(registryId)
        .then((registryData)=>{
          if (registryData){
            registryData.id = registryId;
            registries.push(registryData);
          }
        });
      });
      $scope.registries = registries;
    });
  }

  $scope.status = {
    isRegistryOpen: false
  };

  $scope.openCreateRegistryView = ()=>{
    $window.location.href = '#/registry/addgifts';
  };

});
