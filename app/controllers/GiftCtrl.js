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
    GiftFactory.postNewItem($scope.itemToRegister).then(function(user) {
      $scope.closeModal();
    });

  };


});
