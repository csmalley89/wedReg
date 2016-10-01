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
      $http.post(`${FirebaseURL}/guests.json`, JSON.stringify(guestObj))
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

  let getRegistryList = (registryData)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/registries.json`)
      .success((registryData)=>{
        resolve(registryData);
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

  return {createRegistry, createGuest, deleteRegistry, getSingleRegistry, updateRegistry, getRegistryList, createInvitation, getInvitations, deleteInvitation, addRegistryToUser, getInvitationsInRegistry};
});
