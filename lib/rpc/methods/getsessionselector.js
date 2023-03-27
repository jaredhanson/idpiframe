define(function() {
  
  return function(options) {
    options = options || {};
    // TODO: Ensure this path for persistence makes sense.
    var path = options.path || 'oauth2/ss';
    
    return function getSessionSelector(params, cb) {
      if (!params.domain) { return cb('bad_request'); }
      
      // TODO: Validate against policy, and origin of container page
      
      // NOTE: `params.policy` appears to be ignored in Google's implementation.  Defaulting it here for simplification
      
      var policy = 'default' // params.policy || 'default'
        , domain = params.domain
        , crossSubDomains = params.crossSubDomains || false;
      
      var key = [ path,
                  encodeURIComponent(policy),
                  encodeURIComponent(domain),
                  crossSubDomains ? '1' : '0'  // TODO: does this make sense?
                ].join('/');
      
      var val = window.localStorage.getItem(key);
      if (!val) { return cb(null); }
      
      // TODO: try/catch
      val = JSON.parse(val);
      return cb(null, val);
    };
  };

});
