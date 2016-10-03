"use strict";

app.controller('RegistryCtrl', function($scope, $routeParams, RegistryFactory, $route, GiftFactory, MemberFactory, $q, AuthFactory){

  MemberFactory.getMembersOfRegistry($routeParams.registryId)
  .then((memberData)=>{
  $scope.members = [];
    console.log("memberData", memberData);
      return $q.all(
        Object.keys(memberData).map((key)=>{
          return AuthFactory.getUser(memberData[key].uid)
      }))
      .then((memberData)=>{
        console.log("memberData", memberData);
        memberData.forEach((member)=>{
          Object.keys(member).forEach((key)=>{
            console.log(member[key]);
            $scope.members.push(member[key])
          });
        });
        console.log("member names", $scope.members)
      })
  });

  getGiftsForRegistry();
  function getGiftsForRegistry (){
    console.log("running?");
    GiftFactory.getGifts($routeParams.registryId)
    .then((giftData)=>{
      console.log("giftData", giftData);
      $scope.gifts = giftData;
      $scope.$watch('gifts', function handleGiftIndexChange(newValue, oldValue) {
        GiftFactory.updateAllGiftsInView($scope.gifts);
      }, true);
    });
  }


 // $scope.addNote = (dayId)=>{
    //Need to create a noteObj to add to Firebase. Even though there is no text in this note the note instance needs to be added so that the user is updating the note when pressing enter rather than creating a whole new note everytime the enter key is pressed.
    // var noteObj = {
    //   text: '',
    //   registryId: $routeParams.registryId,
    //   type: 'note'
    // };
    //A new note needs to be added to $scope.notes so that the user sees a card show up on the screen. This instance of the note will be replaced with the note in firebase when the user navigates away from this page.
    //The note is added to firebase
  //   GiftFactory.addGift(noteObj)
  //   .then((note)=>{
  //     console.log("added note!", note.name);
  //       let newNote = noteObj;
  //       newNote.id = note.name;
  //       $scope.gifts.push(newNote);
  //   });
  // };

  RegistryFactory.getSingleRegistry($routeParams.registryId)
  .then((registryData)=>{
    $scope.registry = registryData;
  });

    // //Modal Views for invite and user advice
    // $scope.openInviteModal = ()=>{
    //   let modalInstance = $uibModal.open({
    //     templateUrl: 'partials/InviteFriendModal.html',
    //     controller: 'InviteFriendModalCtrl',
    //     resolve: {
    //       registry: function() {
    //         return $scope.registry
    //       },
    //       members: function (){
    //         return $scope.members
    //       }
    //     }
    //   });
    // };

    // $scope.openTempModal = ()=>{
    //   let modalInstance = $uibModal.open({
    //   templateUrl: 'partials/AverageTempModal.html',
    //   controller: 'AverageTempModalCtrl',
    //   resolve: {
    //     registry: $scope.registry
    //   }
    //   });
    // };

    // $scope.openPackingModal = ()=>{
    //   let modalInstance = $uibModal.open({
    //   templateUrl: 'partials/PackingModal.html',
    //   controller: 'PackingModalCtrl',
    //   resolve: {
    //     registry: $scope.registry
    //   }
    //   });
    // };

    // $scope.openEditRegistryModal = ()=>{
    //   let modalInstance = $uibModal.open({
    //   templateUrl: 'partials/EditRegistryModal.html',
    //   controller: 'EditRegistryModalCtrl',
    //   resolve: {
    //     registry: $scope.registry
    //   }
    //   });
    // };

    // //Opens a modal to make sure the user really wants to delete the registry
    // $scope.openDeleteModal = ()=>{
    //   let modalInstance = $uibModal.open({
    //   templateUrl: 'partials/DeleteRegistry.html',
    //   controller: 'DeleteRegistryModalCtrl'
    //   });
    // };

    // $scope.deleteGiftFromRegistry = (event, giftId)=>{
    //   GiftFactory.deleteGiftFromRegistry(giftId)
    //   .then(()=>{
    //     console.log("successfully deleted");
    //     $(event.currentTarget).find('.giftInput').remove();
    //     $(event.currentTarget).find('.giftInput').remove();
    //     //For now, the only way I know how to get rid of the deleted item is to reload the page. Not ideal - want to fix later.
    //     // $route.reload();
    //   });
    // };

    // $scope.updateTrailNote = (event, trailId, text)=>{
    //   let textPatch = { notes: text };
    //   GiftFactory.updateGift(textPatch, trailId)
    //   .then(()=>{
    //     console.log("patched!", textPatch);
    //   });
    // };

    // $scope.updateNote = (event, noteId, text)=>{
    //   let textPatch = { text };
    //   GiftFactory.updateGift(textPatch, noteId)
    //   .then(()=>{
    //     console.log(textPatch);
    //   })
    // };

    // $scope.enterNote = (event, noteId, text)=>{
    //   let textPatch = { text };
    //   if (event.charCode == 13) {
    //     $scope.blurInput(event);
    //     GiftFactory.updateGift(textPatch, noteId)
    //     .then(()=>{
    //       console.log(textPatch);
    //     })
    //   }
    // }

    // //This takes the focus off of a note after hitting enter.
    // $scope.blurInput = (event)=>{
    //   if (event.charCode == 13) {
    //     let target = event.target;
    //     target.blur();
    //   }
    // };




});


