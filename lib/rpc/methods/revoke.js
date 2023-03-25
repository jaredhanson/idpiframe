define(['querystring'], function(qs) {
  
  return function(options) {
    options = options || {};
    var url = options.url || '/oauth2/revoke';
    
    return function revoke(params, cb) {
      console.log('TODO: revoke');
      console.log(params);
      
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        switch (xhr.readyState) {
        case 4:  // DONE
          if (xhr.status != 200) {
            // TODO: Handle error responses
            return cb(null);
          }
          
          console.log('GOT REVOKE RESPONSE');
          console.log(xhr.responseText)
          
          // TODO: try/catch
          //var sessions = JSON.parse(xhr.responseText);
          
          // TODO: Need to add the following to the result:
          // first_issued_at
          // expires_at
          // scope
          
          //return cb(null, sessions);
          return cb(null);
          break;
        }
      };
      
      var body = {
        token: params.token
      };
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(qs.stringify(body));
      
      // TODO
      //cb(null);
    };
  };

});
