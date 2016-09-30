'use strict';

app.factory('GiftFactory', ($q, $http, FirebaseURL)=>{

// Sort the gifts by index as they come back from Firebase
  let getGifts = (registryId)=>{
    let gifts = [];
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/gifts.json?orderBy="registryId"&equalTo="${registryId}"`)
      .success((giftData)=>{
        Object.keys(giftData).forEach((key)=>{
          giftData[key].id = key;
          gifts.push(giftData[key]);
        })
        gifts.sort(function (a, b) {
          return a.index - b.index;
        });
        resolve(gifts);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let updateGift = (patchedObj, giftId)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}/gifts/${giftId}.json`, angular.toJson(patchedObj))
      .success((noteData)=>{
        resolve(noteData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  }

  let addGift = (giftObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}/gifts.json`, JSON.stringify(giftObj))
      .success((giftData)=>{
        resolve(giftData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let deleteGiftFromRegistry = (giftId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}/gifts/${giftId}.json`)
      .success((deleted)=>{
        resolve(deleted);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let updateAllGiftsInView = (gifts)=>{
    if (!gifts) {return;}
    return $q.all(
      gifts.map((gift) => {
        return updateGift(gift, gift.id);
      })
    );
  };

  return {getGifts, addGift, updateGift, deleteGiftFromRegistry, updateAllGiftsInView};
});
