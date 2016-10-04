"use strict";

app.controller('TestCtrl', function($scope, $routeParams, RegistryFactory, $route, GiftFactory, MemberFactory, $q, AuthFactory, SearchTermData) {
  $scope.searchText = SearchTermData;
  function getRegistry (){
    let UserId = AuthFactory.getUserId()
    console.log(AuthFactory.getUserId())
    let registryId;
    MemberFactory.getMembers()
    .then((registryId)=>{
      if(registryId){
        Object.keys(registryId).forEach((key)=>{
          if (registryId[key].uid === UserId) {
            console.log(registryId[key].registryId)
            $scope.registryId = registryId[key].registryId

            GiftFactory.getGifts($scope.registryId)
            .then((giftData)=>{
              console.log("giftData", giftData);
              $scope.gifts = giftData;
              $scope.$watch('gifts', function handleGiftIndexChange(newValue, oldValue) {
                GiftFactory.updateAllGiftsInView($scope.gifts);
              }, true);
            });
          }
        })
      }
    })
  }
  getRegistry();

  $scope.giftDelete = (giftId) => {
    GiftFactory.deleteGiftFromRegistry(giftId)
    .then ((response) => {
      GiftFactory.getGifts($scope.registryId)
      .then((giftData) => {
        $scope.gifts = giftData;
        });
    });
  }





})




