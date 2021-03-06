"use strict";
app.controller('AmazonCtrl', function($scope, AmazonFactory, AuthFactory, ItemToRegister, GiftModal) {
  // Assures user only see their registered info
  // $scope.$parent.getUser()
  // .then ( (user) => {
  //   $scope.userId = user;
  //   RegFactory.getSingleCouple($scope.userId)
  //   .then((couplesCollectionArr) => {
  //     $scope.couples = couplesCollectionArr[0];
  //   });
  // })
  // .catch(() => console.error);
  let userId = $scope.userId
  AuthFactory.getUserId($scope.userId);

  // Bound to input to assist amazon search
  $scope.amazonSearchTerm = "";
  $scope.itemCollection = [];

  // Searches amazon and returns results in array
  $scope.searchAmazon = function(userId) {
    AmazonFactory.getItemInfo($scope.amazonSearchTerm).then(function(itemData) {
      itemData = $.parseXML(itemData);
      let items = itemData.getElementsByTagName("Item");
      $scope.itemCollection = [];

      for (let item in items) {
        let currentItem = items[item];
        let formattedItem = {};
        if (typeof currentItem === "object") {
          formattedItem.uid = $scope.userId;
          formattedItem.link = currentItem.getElementsByTagName("DetailPageURL")[0].innerHTML;
          formattedItem.image = currentItem.getElementsByTagName("LargeImage")[0].getElementsByTagName("URL")[0].innerHTML;
          formattedItem.title = currentItem.getElementsByTagName("ItemAttributes")[0].getElementsByTagName('Title')[0].innerHTML;
          formattedItem.price = currentItem.getElementsByTagName("OfferSummary")[0].getElementsByTagName('LowestNewPrice')[0].getElementsByTagName('FormattedPrice')[0].innerHTML;
          formattedItem.description = currentItem.getElementsByTagName("EditorialReviews")[0].getElementsByTagName("EditorialReview")[0].getElementsByTagName("Content")[0].firstChild.nodeValue;
          formattedItem.descriptionTitle = currentItem.getElementsByTagName("EditorialReviews")[0].getElementsByTagName("EditorialReview")[0].getElementsByTagName("Source")[0].innerHTML;
          $scope.itemCollection.push(formattedItem);
        }
      }
    });
  };


  // Sets item to register
  $scope.itemSelected = function(item) {
    ItemToRegister.setItem(item);
    GiftModal.activate;
    console.log("registered item:", item);
  };

  // Opens modal
  $scope.openGiftModal = GiftModal.activate;

});
