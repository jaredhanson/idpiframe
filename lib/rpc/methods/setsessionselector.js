define(function() {
  
  return function(options) {
    options = options || {};
    // TODO: Ensure this path for persistence makes sense.
    var path = options.path || 'oauth2/ss';
    
    return function setSessionSelector(params, cb) {
      if (!params.domain) { return cb('bad_request'); }
      
      // TODO: Validate domain against origin, and reject if needed
      // TODO: Validate against policy, and origin of container page
    
      var policy = params.policy || 'default'
        , domain = params.domain
        , crossSubDomains = params.crossSubDomains || false
        , hint = params.hint
        , disabled = params.disabled || false;
    
      // NOTE: Google's cache keys are constructed from the following
      //       template:
      //       oauth2_ss::{origin}::{crossSubDomains ? '1' : '0'}::{policy.toUpperCase()}::_ss_
    
      var key = [ path,
                  encodeURIComponent(policy),
                  encodeURIComponent(domain),
                  crossSubDomains ? '1' : '0'  // TODO: does this make sense?
                ].join('/');
      
      // TODO: trigger session selector changed event
      
      try {
        hint ? localStorage.setItem(key, JSON.stringify({ hint: hint, disabled: disabled }))
             : localStorage.removeItem(key);
      } catch(ex) {
        return cb(null, false);
      }
      return cb(null, true);
    };
  };

});
