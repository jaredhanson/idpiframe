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
          if (xhr.status != 200) {
            // TODO: Handle error responses
            return cb(null);
          }
          
          // TODO: try/catch
          console.log(xhr.responseText)
          var res = JSON.parse(xhr.responseText);
          console.log(res)
          
          if (res.valid) {
            clients.add(params.clientId);
            
            // NOTE: The IDP-IFrame specification indicates that the response
            // should have a `result` set to `true`.  However, Google's
            // implementation does not confirm to this.
            //return cb(null, true);
            
            var rv = { validOrigin: res.valid }
            if (res.blocked !== undefined) { rv.blocked = res.blocked; }
            if (res.suppressed !== undefined) { rv.suppressed = res.suppressed; }
            return cb(null, rv);
          }
        
          
          //var rv = clients.add(params.clientId);
          //cb(null, rv);
          
          
          // TODO: parse response and send it to container frame
          //return cb(null, token);
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
