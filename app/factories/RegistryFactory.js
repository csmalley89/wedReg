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

  // let addRegistryToUser = (userId, registryObj)=>{
  //   return $q((resolve, reject)=>{
  //     $http.patch(`${FirebaseURL}/users/${userId}/registries.json`, JSON.stringify(registryObj))
  //     .success((registryData)=>{
  //       resolve(registryData);
  //     })
  //     .error((error)=>{
  //       reject(error);
  //     });
  //   });
  // }
  let addRegistryToUser = (userId, registryId)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}/users/${userId}/registryId.json`, JSON.stringify(registryId))
      .success((registryData)=>{
        resolve(registryData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  }

//original version:
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
  // let getRegistryList = (registry) => {
  //   let registries = [];
  //   return $q((resolve, reject) => {
  //     $http.get(`${FirebaseURL}/registries.json`)
  //     .success((registryData) => {
  //       if (registryData !== null) {
  //       Object.keys(registryData).forEach((key) => {
  //         registryData[key].id = key;
  //         registries.push(registryData[key]);
  //       });
  //       resolve(registries);
  //     } else {
  //       resolve(registries);
  //     }
  //     })
  //     .error((error) => {
  //       reject(error);
  //     });
  //   });
  // };


  let createContribution = (contribution)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}/contributions.json`, angular.toJson(contribution))
      .success((invite)=>{
        resolve(invite);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getContributions = ()=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/contributions.json?orderBy="uid"&equalTo="${AuthFactory.getUserId()}"`)
      .success((contributions)=>{
        resolve(contributions);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

   let getContributionsInRegistry = (registryId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/contributions.json?orderBy="registryId"&equalTo="${registryId}"`)
      .success((contributions)=>{
        resolve(contributions);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };
   let getGiftContributions = (giftId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}/contributions.json?orderBy="giftId"&equalTo="${giftId}"`)
      .success((contributions)=>{
        resolve(contributions);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };
  let deleteContribution = (contributionId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}/contributions/${contributionId}.json`)
      .success((contributionDelete)=>{
        resolve(contributionDelete);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  return {createRegistry, createGuest, deleteRegistry, getSingleRegistry, updateRegistry, getRegistryList, createContribution, getContributions, getGiftContributions, deleteContribution, addRegistryToUser, getContributionsInRegistry};
});
