define([ 'querystring' ], function(qs) {
  
  return function(options) {
    options = options || {};
    var url = options.url || '/oauth2/iframerpc';
    
    return function getTokenResponse(params, origin, cb) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        switch (xhr.readyState) {
        case 4:  // DONE
          if (xhr.status != 200) {
            // TODO: Handle error responses
            return cb(null);
          }
          
          // TODO: try/catch
          var token = JSON.parse(xhr.responseText);
          
          // TODO: parse response and send it to container frame
          return cb(null, token);
          break;
        }
      };
      
      
      var q = params.request;
      q.action = 'issueToken';
      q.client_id = params.clientId;
      q.login_hint = params.loginHint;
      q.ss_domain = params.sessionSelector.domain;
      q.origin = origin;
      
      xhr.open('GET', url + '?' + qs.stringify(q));
      xhr.send();
    };
  };

});
