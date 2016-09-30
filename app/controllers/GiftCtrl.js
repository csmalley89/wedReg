"use strict";
app.factory("GiftModal", function(btfModal, AuthFactory, $q){


  return btfModal({
    controller: "GiftModalCtrl",
    controllerAs: "modal",
    templateUrl: "partials/giftModal.html",
    // getUser
  });
});


app.controller("GiftModalCtrl", function($scope, GiftModal, ItemToRegister, $routeParams, $location, GiftFactory, AuthFactory){


  $scope.closeModal = GiftModal.deactivate;

  $scope.itemToRegister = ItemToRegister.getItem();

  $scope.giftToSite = function(){
    GiftFactory.addGift($scope.itemToRegister).then(function(user) {
      $scope.closeModal();
      // .then(function() {
      //   let path = `{$routeParams.userId}/couple/welcome`;
      //   $location.url(path);
      // });
    });

  };


});
