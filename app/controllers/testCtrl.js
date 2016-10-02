"use strict";
app.controller('TestCtrl', function($scope, AmazonFactory, AuthFactory, MemberFactory, RegistryFactory, ItemToRegister, GiftModal, GiftFactory) {
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
                  regDataArr.push(regData)
                }
                $scope.regDataArr = regDataArr[0]
                console.log(regDataArr[0]);
              })
            }
          })
        }
      })
    }
    getRegistryInfo();
    console.log(regDataArr[0])
    console.log($scope.regDataArr);

})




