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
          //var body = JSON.parse(xhr.responseText);
          //console.log(body)
          
          // TODO: parse response and send it to container frame
          //return cb(null, token);
          break;
        }
      };
      
      
      var q = {};
      q.action = 'checkOrigin';
      q.origin = options.origin;
      q.client_id = params.clientId;
      
      
      xhr.open('GET', url + '?' + qs.stringify(q));
      xhr.send();
      
      var rv = clients.add(params.clientId);
      cb(null, rv);
    };
  };

});
