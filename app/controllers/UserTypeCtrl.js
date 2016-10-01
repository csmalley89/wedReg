'use strict';

app.controller('UserTypeCtrl', function($scope, AuthFactory, RegistryFactory, $route, $window, MemberFactory) {

  let firstName1,
      firstName2,
      firstName,
      registryId,
      guestId,
      userId;

  //The following are the properties on the registry object saved to firebase

  $scope.registry = {
    firstName1: "",
    lastName1: "",
    firstName2: "",
    lastName2: "",
    WeddingDate:"",
    location: "",
    coupleStreet: "",
    coupleCity: "",
    coupleState: "",
    coupleZip: ""
  };

  $scope.guest = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  };

  let name = firstName1 + firstName2;
  //A registry is created and added to firebase using the create button
  $scope.coupleRegister = () => {
    //Make sure the registry has a name! Otherwise, a registry will be created and now show up in the dropdown menu
    if ($scope.registry.name !== ""){
      RegistryFactory.createRegistry($scope.registry)
      .then((registryData)=>{
        //The double quotes around the registry id are messing up the routing so I needed to replace any double quotes with nothing
        registryId = registryData.name.replace('"', "");
        $window.location.href = `#/registry/addgifts`;
        let memberObj = {
          uid: AuthFactory.getUserId(),
          role: 'couple',
          registryId: registryId
        }
        return MemberFactory.addMember(memberObj)
      })
      .then((success)=>{
        console.log("member created successfully");
      })

    } else {
      $scope.showAlert = true;
    }
  };


  let name2 = firstName;
  $scope.guestRegister = () => {
    if ($scope.guest.name2 !== ""){
      RegistryFactory.createGuest($scope.guest)
      .then((guestData)=>{
        //The double quotes around the guest id are messing up the routing so I needed to replace any double quotes with nothing
        guestId = guestData.name2.replace('"', "");
        $window.location.href = `#/guest/${guestId}`;
        let memberObj = {
          uid: AuthFactory.getUserId(),
          role: 'guest',
          registryId: null
        }
        return MemberFactory.addMember(memberObj)
      })
      .then((success)=>{
        console.log("member created successfully");
      })

    } else {
      $scope.showAlert = true;
    }
  };

  $scope.showAlert = false;
  $scope.alert = { type: 'danger', msg: 'Make sure you name your registry!' };
  $scope.closeAlert = function() {
    $scope.showAlert = false;
  };


});
