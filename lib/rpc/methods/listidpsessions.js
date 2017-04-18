define(['querystring'], function(qs) {
  
  return function(options) {
    options = options || {};
    var url = options.url || '/oauth2/iframe/rpc/listSessions';
    
    return function listIdpSessions(params, origin, cb) {
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
      
      var q = {
        client_id: params.clientId,
        ss_domain: params.sessionSelector.domain,
        scope: params.request.scope,
        origin: origin
      };
      xhr.open('GET', url + '?' + qs.stringify(q));
      xhr.send();
    };
  };

});
