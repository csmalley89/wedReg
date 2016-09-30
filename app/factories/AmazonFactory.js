"use strict";

app.factory('AmazonFactory', function(AmazonCreds, $q, $http) {

  // Timestamp for request
  function timestamp() {

    // Get current date and components
    var date = new Date();
    var y = date.getUTCFullYear().toString();
    var m = (date.getUTCMonth() + 1).toString();
    var d = date.getUTCDate().toString();
    var h = date.getUTCHours().toString();
    var min = date.getUTCMinutes().toString();
    var s = date.getUTCSeconds().toString();

    // Prepend 0 to one digit months
    if(m.length < 2) {
      m = "0" + m;
    }
    // Prepend 0 to one digit days
    if(d.length < 2) {
      d = "0" + d;
    }
    // Prepend 0 to one digit hours
    if(h.length < 2) {
      h = "0" + h;
    }
    // Prepend 0 to one digit minutes
    if(min.length < 2) {
      min = "0" + min;
    }
    // Prepend 0 to one digit seconds
    if(s.length < 2) {
      s = "0" + s;
    }

    // Build up date and time strings and return formatted combination
    var date = y + "-" + m + "-" + d;
    var time = h + ":" + min + ":" + s;
    return date + "T" + time + "Z";
  }

  // Get amazonQueryString
  function getAmazonQueryString(item) {

    // Amazon API keys
    var PrivateKey = AmazonCreds.privateKey;
    var PublicKey = AmazonCreds.publicKey;
    var AssociateTag = AmazonCreds.associateId;

    // Format Item for request
    let formattedItem = encodeURIComponent(item);
    console.log("Formatted item", formattedItem);

    // Parameters for request
    var parameters = [];
    parameters.push("Service=AWSECommerceService");
    parameters.push("AWSAccessKeyId=" + PublicKey);
    parameters.push("AssociateTag=" + AssociateTag);
    parameters.push("Operation=ItemSearch");
    parameters.push("Keywords=" + formattedItem);
    parameters.push("SearchIndex=All");
    parameters.push("ResponseGroup=Medium");
    parameters.push("Timestamp=" + encodeURIComponent(timestamp()));
    parameters.push("Version=2013-08-01");

    // Sort and join parameters for request signing
    parameters.sort();
    var paramString = parameters.join('&');

    // Build request to sign
    var requestToSign = "GET\n" + "webservices.amazon.com\n" + "/onca/xml\n" + paramString;

    // Sign request
    var signingObj = new jsSHA("SHA-256", "TEXT");
    signingObj.setHMACKey(PrivateKey, "TEXT");
    signingObj.update(requestToSign);
    var hmac = signingObj.getHMAC("B64");
    var signature = encodeURIComponent(hmac);

    // Build query url with paremeters and signature
    var queryURL =  "http://webservices.amazon.com/onca/xml?" + paramString + "&Signature=" + signature;

    // Return built and signed queryURL
    return queryURL;
  }

  let getItemInfo = function(item) {

    // Get queryURL based on item to search
    var queryURL = getAmazonQueryString(item);

    // Return a promise with the amazon request
    return $q(function(resolve, reject) {
      $http
      .get(queryURL)
      .success(function(itemData) {
        resolve(itemData);
      })
      .error(function(error) {
        reject(error);
      });

    });
  };

  return {getItemInfo};

});
