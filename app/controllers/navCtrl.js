"use strict";

app.controller("NavCtrl", function($scope, AuthFactory, RegistryFactory, $window, MemberFactory, $timeout, SearchTermData, $location){
  $scope.searchText = SearchTermData;
  // $scope.navItems = [
  //     {url: "#/logout", name: "Logout", showState: "$parent.isLoggedIn"},
  //     {url: "#/login", name: "Login", showState: "!$parent.isLoggedIn"},
  //     {url: "#/registry/addgifts", name: "Add to Registry", showState: "$parent.isLoggedIn"},
  //     {url: "#/registry/viewgifts", name: "View Registry", showState: "$parent.isLoggedIn"}
  // ];
  // $scope.isActive = (viewLocation) => viewLocation === $location.path();

  $scope.logout = function(){
    AuthFactory.logoutUser();
  };

  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      getRegistries();
      // getContributions();
      AuthFactory.getUser(AuthFactory.getUserId())
      .then((userData)=>{
        Object.keys(userData).forEach((key)=>{
          $scope.userName = userData[key].displayName;
        })
      })
    }
  });

  //We cannot grab the contributions for a user if the webpage does not recognize that a user is logged in. Therefore, we need to watch the state - isReady to make sure it is true before checking for notifications. We also want to watch the length of the notifications
  // $scope.$watch('isReady', function isReadyChange(newValue, oldValue) {
  //   console.log("new value", newValue);
  //   if ($scope.isReady){
  //     getContributions();
  //     // getRegistries();
  //     $scope.$watch('numberOfContributions', function numberOfContributionsChange(newValue, oldValue) {
  //       console.log("new value, oldValue", newValue, oldValue)
  //       getContributions();
  //     }, true);
  //   }
  // }, true);


  // $scope.getContributions = ()=>{
  //   getContributions();
  // };

  // function getContributions (){
  //   let contributionsArr = [];
  //   console.log("get contributions is running");
  //   RegistryFactory.getContributions()
  //   .then((contributions)=>{
  //     console.log("contributions to you", contributions);
  //     if(Object.keys(contributions).length){
  //       $scope.hasContributions = true;
  //       Object.keys(contributions).forEach((key)=>{
  //         contributions[key].id = key;
  //         contributionsArr.push(contributions[key]);
  //       })
  //       $scope.contributions = contributions
  //     } else {
  //       $scope.hasContributions = false;
  //     }
  //   });
  // }

  // $scope.acceptOrDecline = (contribution)=>{
  //   let modalInstance = $uibModal.open({
  //     templateUrl: 'partials/RespondToInviteModal.html',
  //     controller: 'RespondToInviteModalCtrl',
  //     resolve: {
  //       contribution
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
