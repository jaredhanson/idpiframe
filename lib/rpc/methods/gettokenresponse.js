define([ 'querystring' ], function(qs) {
  
  return function(origin, options) {
    options = options || {};
    var url = options.url || '/oauth2/authorize';
    
    return function getTokenResponse(params, cb) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        switch (xhr.readyState) {
        case 4:  // DONE
          if (xhr.status != 200) {
            // TODO: Handle error responses
            return cb(null);
          }
          
          // TODO: parse response and send it to container frame
          return cb(null);
          break;
        }
      };
      
      // TODO: Pass client_id, scope and origin as URL params
      var q = params.request;
      q.client_id = params.clientId;
      // TODO: Add origin support to oauth2orize
      //q.origin = origin;
      q.prompt = 'none';
      q.response_mode = 'idpiframe';
      
      xhr.open('GET', url + '?' + qs.stringify(q));
      xhr.send();
    };
  };

});
