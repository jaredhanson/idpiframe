define([ 'querystring' ], function(qs) {
  
  return function(options) {
    options = options || {};
    var url = options.url || '/oauth2/iframerpc';
    
    return function getTokenResponse(params, origin, cb) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
        switch (xhr.readyState) {
        case 4:  // DONE
          // TODO: try/catch
          var res = JSON.parse(xhr.responseText);
          
          if (res.error) {
            // NOTE: Matches Google's implementaiton
            if (xhr.status != 200) {
              return cb(null, { error: 'server_error', error_subtype: JSON.stringify(res, null, 2) });
            }
            return cb(null, { error: res.error.toLowerCase(), detail: res.detail, thrown_by: 'server' });
          }
          
          var now =  Date.now();
          res.first_issued_at = now;
          if (res.expires_in) {
            res.expires_at = res.first_issued_at + (res.expires_in * 1000);
          }
          
          var cres = {
            cookieHash: 'TODO', // TODO: what is this
            cachedValue: {
              ia: res,
              responseType: params.request.response_type
            }
          }
          
          // NOTE: Google's cache keys are constructed from the following
          //       template:
          //       oauth2_tr::{origin}::{clientId}::_tr_
          
          var key = [ 'oauth2_tr',
            origin,
            params.clientId,
            '_tr_'
          ].join('::');
          
          sessionStorage.setItem(key, JSON.stringify(cres));
          
          
          // TODO: look up values in cache under right conditions
          
          // TODO: session_state seems to be missing here from server.
          
          return cb(null, res);
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
