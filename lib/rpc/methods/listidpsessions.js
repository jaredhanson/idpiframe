define(function() {
  
  return function(options) {
    options = options || {};
    var url = options.url || '/oauth2/idpiframe/sessions';
    
    return function listIdpSessions(params, cb) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        switch (xhr.readyState) {
        case 4:  // DONE
          if (xhr.status != 200) {
            // TODO: Handle error responses
            return cb(null);
          }
          
          // TODO: try/catch
          var sessions = JSON.parse(xhr.responseText);
          
          // TODO: Need to add the following to the result:
          // first_issued_at
          // expires_at
          // scope
          
          return cb(null, sessions);
          break;
        }
      };
      
      // TODO: Pass client_id, scope and origin as URL params
      
      xhr.open('GET', url);
      xhr.send();
    };
  };

});
