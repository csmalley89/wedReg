"use strict";

app.controller("GuestJoinCtrl", function($scope, RegistryFactory, SearchTermData) {
  $scope.searchText = SearchTermData;

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
      };
    })
  }
  getRegistries();


});
