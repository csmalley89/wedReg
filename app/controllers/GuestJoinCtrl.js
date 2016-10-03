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

  // function getCurrentMemberRegistries (){

  // }


  $scope.joinRegistry = (event, registry, index)=> {
    $scope.joinedRegistry = true;
    $scope.registries.splice(index, 1);
    $(event.currentTarget).closest('.registryCard').remove();
    $(event.currentTarget).remove();
    AuthFactory.getUser(AuthFactory.getUserId())
    .then((userData)=>{
      Object.keys(userData).forEach((key)=>{
        $scope.email = userData[key].email,
        $scope.uid = userData[key].uid;
      });
      let memberObj = {
        role: "guest",
        uid: $scope.uid,
        email: $scope.email,
        registryId: registry.id
      }
      MemberFactory.addMember(memberObj)
      if(userData){
        $window.location.href = `#/registry/guest/${registry.id}`
      }
    }, (error)=>{
      console.log(`Error joining registry ${error}`)
    })

  }
});

"use strict";

app.controller("GuestViewRegistryCtrl", function($scope, $routeParams, AuthFactory, MemberFactory, GiftFactory, SearchTermData) {
  $scope.searchText = SearchTermData;
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




});
