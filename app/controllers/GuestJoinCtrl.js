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
        console.log(userData)
        $scope.email = userData[key].email,
        $scope.uid = userData[key].uid,
        $scope.firstName = userData[key].firstName,
        $scope.guestCity = userData[key].guestCity,
        $scope.guestStreet = userData[key].guestStreet,
        $scope.guestState = userData[key].guestState,
        $scope.guestZip = userData[key].guestZip,
        $scope.lastName = userData[key].lastName
      });
      let memberObj = {
        role: "guest",
        uid: $scope.uid,
        email: $scope.email,
        registryId: registry.id,
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        street: $scope.guestStreet,
        city: $scope.guestCity,
        state: $scope.guestState,
        zip: $scope.guestZip
      }
      MemberFactory.addMember(memberObj)
      console.log(memberObj)
      if(userData){
        $window.location.href = `#/registry/guest/${registry.id}`
      }
    }, (error)=>{
      console.log(`Error joining registry ${error}`)
    })

  }
});

"use strict";

app.controller("GuestViewRegistryCtrl", function($scope, $routeParams, AuthFactory, MemberFactory, RegistryFactory, GiftFactory, SearchTermData) {
  $scope.searchText = SearchTermData;
  $scope.contribution = {
    message: "",
    value: ""
  };



  function getJoinedRegistry (){
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

            GiftFactory.getGifts($routeParams.registryId)
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
  getJoinedRegistry();

  RegistryFactory.getSingleRegistry($routeParams.registryId)
  .then((registryData)=>{
    $scope.registry = registryData;
    console.log(registryData)
  });


  GiftFactory.getGifts($routeParams.registryId)
  .then((giftData)=>{
    $scope.gift = giftData[0];
    console.log(giftData[0])
  });

  $scope.makeContribution = (event, gift, index)=>{
    $(event.currentTarget).closest('.giftCard')
    parseInt(gift.price)
    console.log($scope.gift.price)
    AuthFactory.getUser(AuthFactory.getUserId())
    .then((userData)=>{
      Object.keys(userData).forEach((key)=>{
        $scope.email = userData[key].email,
        $scope.uid = userData[key].uid;
        console.log(userData)
      });
      let giftContributionObj = {
        giftId : gift.id,
        registryId: $routeParams.registryId,
        uid: $scope.uid,
        contributionVal: $scope.contribution.value,
        message: $scope.contribution.message
      }
      RegistryFactory.createContribution(giftContributionObj)
      let guestContribution = giftContributionObj.contributionVal;

      if(userData){
        let giftPatch = { guestContribution }
        GiftFactory.updateGift(giftPatch, gift.id)
        .then(()=>{
          console.log(giftPatch);
        })
      }
    })
  }

  // function findTotal(){
  //   $scope.total = parseInt($scope.gift.price) - parseInt($scope.contribution.value);
  // }
  // $scope.$watch('gift.price - contribution.value', findTotal)
  // console.log(findTotal)

  // $scope.moneyNeeded = ()=>{
  //   return parseFloat($scope.gift.price) - parseFloat(guestContribution)
  // }
  // console.log($scope.moneyNeeded)

});
