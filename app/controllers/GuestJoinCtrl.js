"use strict";

app.controller("GuestJoinCtrl", function($scope, RegistryFactory, $routeParams, $window, AuthFactory, MemberFactory, SearchTermData) {
  $scope.searchText = SearchTermData;
  $scope.joinedRegistry = false;
  let registries = [];


  function getRegistries (){
    RegistryFactory.getRegistryList(AuthFactory.getUserId())
      .then((registryData)=>{
        if (registryData !== null) {
        Object.keys(registryData).forEach((key) => {
          registryData[key].id = key;
          registries.push(registryData[key]);
        });
        $scope.registries = registries;
        console.log(registries);
      }
    })
  }
  getRegistries();


  $scope.joinRegistry = (event, registry, index)=> {
    $scope.joinedRegistry = true;
    $scope.registries.splice(index, 1);
    $(event.currentTarget).closest('.registryCard').remove();
    $(event.currentTarget).remove();
    AuthFactory.getUser(AuthFactory.getUserId())
    .then((userData)=>{
      Object.keys(userData).forEach((key)=>{
        $scope.email = userData[key].email,
        $scope.uid = userData[key].uid;
      });
      let memberObj = {
        role: "guest",
        uid: $scope.uid,
        email: $scope.email,
        registryId: registry.id
      }
      MemberFactory.addMember(memberObj)
      if(userData){
        $window.location.href = "#/registry/guest/view"
      }
    }, (error)=>{
      console.log(`Error joining registry ${error}`)
    })

  }



});
