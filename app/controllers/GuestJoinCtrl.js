"use strict";

app.controller("GuestJoinCtrl", function($scope, RegistryFactory, AuthFactory, MemberFactory, SearchTermData) {
  $scope.searchText = SearchTermData;

  // let user = AuthFactory.getUserId();
  //   console.log(user);
  // RegistryFactory.getRegistryList(user)
  // .then((registryCollection) => {
  //   $scope.registries = registryCollection;
  // });


  function getRegistries (){
    let registries = [];
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



});
