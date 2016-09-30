"use strict";

app.factory("RegistryFactory", ($q, $http, FirebaseURL, AuthFactory, GiftFactory)=>{

  let createRegistry = (registryObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}/registries.json`, JSON.stringify(registryObj))
      .success((registryData)=>{
        resolve(registryData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let createGuest = (guestObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}/guest.json`, JSON.stringify(guestObj))
      .success((guestData)=>{
        resolve(guestData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let addRegistryToUser = (userId, registryObj)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}/users/${userId}/registries.json`, JSON.stringify(registryObj))
      .success((registryData)=>{
        resolve(registryData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  }

  let getSingleRegistry = (registryId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/registries/${registryId}.json`)
      .success((registryData)=>{
        resolve(registryData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let deleteRegistry = (registryId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}/registries/${registryId}.json`)
      .success((registryData)=>{
        resolve(registryData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let updateRegistry = (registryId, patchedRegistry)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}/registries/${registryId}.json`, JSON.stringify(patchedRegistry))
      .success((registryData)=>{
        resolve(registryData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let deleteTrailFromRegistry = (trailId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}/trails/${trailId}.json`)
      .success((trailData)=>{
        resolve(trailData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getAverageTemp = (monthId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/temperature.json?orderBy="monthId"&equalTo="${monthId}"`)
      .success((tempData)=>{
        resolve(tempData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getPackingList = (type)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/packingseason.json?orderBy="type"&equalTo="${type}"`)
      .success((packingData)=>{
        resolve(packingData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getUserPackingList = (registryId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/packinglist.json?orderBy="registryId"&equalTo="${registryId}"`)
      .success((packingData)=>{
        resolve(packingData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let addItemToPackingList = (packingItemObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}/packinglist.json`, JSON.stringify(packingItemObj))
      .success((packingData)=>{
        resolve(packingData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let deleteItemFromList = (listId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}/packinglist/${listId}.json`)
      .success((packingData)=>{
        resolve(packingData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let updatePackingItem = (packingObj, itemId)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}/packinglist/${itemId}.json`, JSON.stringify(packingObj))
      .success((packingData)=>{
        resolve(packingData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let createInvitation = (invitation)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}/invitations.json`, angular.toJson(invitation))
      .success((invite)=>{
        resolve(invite);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getInvitations = ()=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/invitations.json?orderBy="uid"&equalTo="${AuthFactory.getUserId()}"`)
      .success((invitations)=>{
        resolve(invitations);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

   let getInvitationsInRegistry = (registryId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/invitations.json?orderBy="registryId"&equalTo="${registryId}"`)
      .success((invitations)=>{
        resolve(invitations);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let deleteInvitation = (invitationId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}/invitations/${invitationId}.json`)
      .success((invitationDelete)=>{
        resolve(invitationDelete);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  return {createRegistry, createGuest, deleteRegistry, getSingleRegistry, deleteTrailFromRegistry, updateRegistry, getAverageTemp, getPackingList, addItemToPackingList, getUserPackingList, deleteItemFromList, updatePackingItem, createInvitation, getInvitations, deleteInvitation, addRegistryToUser, getInvitationsInRegistry};
});
