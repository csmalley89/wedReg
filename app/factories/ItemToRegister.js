"use strict";

app.factory("ItemToRegister", function(){

  let itemToRegister = null;

  let setItem = function(item) {
    itemToRegister = item;
  };

  let getItem = function() {
    return itemToRegister;
  };

  return {setItem, getItem};

});
