"use strict";

app.controller("RegistryBannerCtrl", function($scope, AuthFactory, SearchTermData) {
  $scope.searchText = SearchTermData;

  function getBannerData (){
    let bannerData = [];
      AuthFactory.getUser(AuthFactory.getUserId())
      .then((coupleData)=>{
        if (coupleData !== null) {
        Object.keys(coupleData).forEach((key) => {
          coupleData[key].id = key;
          bannerData.push(coupleData[key]);
        });
        $scope.bannerData = bannerData[0];
        console.log(bannerData);
        console.log(bannerData[0].location)
        console.log(bannerData.location)
      }
    })
  }
  getBannerData();



});
