"use strict";
app.controller('AmazonCtrl', function($scope, $routeParams, $q, AmazonFactory, AuthFactory, MemberFactory, RegistryFactory, ItemToRegister, GiftModal, GiftFactory) {
  // Assures user only see their registered info
    // let userRole;
    function getRegistryInfo (){
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
              let regDataArr = []
              RegistryFactory.getSingleRegistry($scope.registryId)
              .then((regData)=>{
                if (regData !== null) {
                Object.keys(regData).forEach((key) => {
                  regData[key] = key;
                  regDataArr.push(regData[key]);
                })
                $scope.regDataArr = regDataArr;
                console.log(regDataArr)
                };
              })
            }
          })
        }
      })
    }
    getRegistryInfo();
    console.log(getRegistryInfo())








  // Bound to input to assist amazon search
  $scope.amazonSearchTerm = "";
  $scope.itemCollection = [];

  // Searches amazon and returns results in array
  $scope.searchAmazon = function() {
    AmazonFactory.getItemInfo($scope.amazonSearchTerm).then(function(itemData) {
      itemData = $.parseXML(itemData);
      let items = itemData.getElementsByTagName("Item");
      $scope.itemCollection = [];

      for (let item in items) {
        let currentItem = items[item];
        let formattedItem = {};
        if (typeof currentItem === "object") {
          formattedItem.registryId = $routeParams.registryId;
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
