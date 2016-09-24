define(function() {
  
  return function(options) {
    options = options || {};
    // TODO: Ensure this path for persistence makes sense.
    var path = options.path || 'oauth2/ss';
    
    return function setSessionSelector(params, cb) {
      // TODO: Validate params
    
      // TODO: Validate against policy, and origin of container page
    
      var policy = params.policy || 'default'
        , domain = params.domain
        , crossSubDomains = params.crossSubDomains || false
        , hint = params.hint
        , disabled = params.disabled || false;
    
      var key = [ path,
                  encodeURIComponent(policy),
                  encodeURIComponent(domain),
                  crossSubDomains ? '1' : '0'  // TODO: does this make sense?
                ].join('/');
      var val = JSON.stringify({ hint: hint, disabled: disabled });
      
      try {
        localStorage.setItem(key, val);
      } catch(ex) {
        return cb(null, false);
      }
      return cb(null, true);
    };
  };

});
