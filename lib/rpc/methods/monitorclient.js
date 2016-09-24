define(function() {
  
  return function() {
    
    return function monitorClient(params, cb) {
      console.log('GOT MONITOR!');
      // TODO: Add this client to a registry
      
      cb(null, true);
    };
  };

});
