define(['querystring'], function(qs) {
  
  return function(options) {
    options = options || {};
    var url = options.url || '/oauth2/revoke';
    
    return function revoke(params, cb) {
      // TODO: Validate params
      
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        switch (xhr.readyState) {
        case 4:  // DONE
          if (xhr.status == 200) {
            return cb(null, {});
          }
          
          // TODO: try/catch
          var res = JSON.parse(xhr.responseText);
          
          if (res.error) {
            // NOTE: Matches Google's implementaiton
            return cb(null, { error: 'server_error', error_subtype: JSON.stringify(res, null, 2) });
          }
          
          // NOTE: shouldn't get here.  should maybe default to supplying some generic error here.
          return cb(null, {});
          break;
        }
      };
      
      var body = {
        token: params.token
      };
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(qs.stringify(body));
    };
  };

});
