"use strict";
app.controller('AmazonCtrl', function($scope, AmazonFactory, AuthFactory, MemberFactory, RegistryFactory, ItemToRegister, GiftModal, GiftFactory) {

  let regDataArr = [];
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

              RegistryFactory.getSingleRegistry($scope.registryId)
              .then((regData)=>{
                if (regData !== null) {
                  // regData.id = registryId;
                  regDataArr.push(regData)
                }
                $scope.regDataArr = regDataArr[0]
                console.log(regDataArr[0].location);
              })
            }
          })
        }
      })
    }
  getRegistryInfo();


  $scope.viewRegisteredGuests = () => {

    let myGuests = [];
    MemberFactory.getMembersOfRegistry($scope.registryId)
    .then((guestsArr)=>{
      if(guestsArr !== null) {
        Object.keys(guestsArr).forEach((key)=>{
          guestsArr[key].id = key;
          myGuests.push(guestsArr[key])
        });
        $scope.myGuests = myGuests;
        console.log(myGuests)
      }
    })
  }

  $scope.guestContributions = () => {

    let contributions = [];
    RegistryFactory.getContributionsInRegistry($scope.registryId)
    .then((guestsContributionArr)=>{
      if(guestsContributionArr !== null) {
        Object.keys(guestsContributionArr).forEach((key)=>{
          guestsContributionArr[key].id = key;
          contributions.push(guestsContributionArr[key])
        });
        $scope.contributions = contributions;
        console.log(contributions)
      }
    })
  }

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
          formattedItem.registryId = $scope.registryId;
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
