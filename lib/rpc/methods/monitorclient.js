define([ 'querystring' ], function(qs) {
  
  return function(clients, options) {
    options = options || {};
    var url = options.url || '/oauth2/iframerpc';
    
    return function monitorClient(params, cb) {
      // TODO: Validate params
      console.log('monitorClient');
      console.log(params)
      console.log(options);
      
      // TODO: Maybe send this on load of iframe???
      
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        switch (xhr.readyState) {
        case 4:  // DONE
          // TODO: try/catch
          var res = JSON.parse(xhr.responseText);
          
          if (res.error) {
            // NOTE: Matches Google's implementaiton
            return cb(null, {});
          }
          
          if (res.valid) {
            // TODO: Ensure other evented messages are respecting not delivering messages
            // to unregistered clients.
            clients.add(params.clientId);
          }
          
          // NOTE: The IDP-IFrame specification indicates that the response
          // should have a `result` set to `true`.  However, Google's
          // implementation does not conform to this.
          //return cb(null, res.valid);
          
          var rv = { validOrigin: res.valid }
          if (res.blocked !== undefined) { rv.blocked = res.blocked; }
          if (res.suppressed !== undefined) { rv.suppressed = res.suppressed; }
          return cb(null, rv);
          break;
        }
      };
      
      
      var q = {};
      q.action = 'checkOrigin';
      q.client_id = params.clientId;
      q.origin = options.origin;
      
      xhr.open('GET', url + '?' + qs.stringify(q));
      xhr.send();
    };
  };

});
