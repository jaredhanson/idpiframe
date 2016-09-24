define(function() {
  
  return function(options) {
    options = options || {};
    // TODO: Ensure this path for persistence makes sense.
    var path = options.path || 'oauth2/ss';
    
    return function getSessionSelector(params, cb) {
      // TODO: Validate params
      
      // TODO: Validate against policy, and origin of container page
      
      var policy = params.policy || 'default'
        , domain = params.domain
        , crossSubDomains = params.crossSubDomains || false;
      
      var key = [ path,
                  encodeURIComponent(policy),
                  encodeURIComponent(domain),
                  crossSubDomains ? '1' : '0'  // TODO: does this make sense?
                ].join('/');
      
      console.log(key)
      var val = window.localStorage.getItem(key);
      console.log('GOT VALUE!');
      console.log(val);
      
      if (!val) { return cb(null); }
      
      // TODO: try/catch
      val = JSON.parse(val);
      
      cb(null, val);
    };
  };

});
