define(function() {
  
  return function(clients) {
    
    return function monitorClient(params, cb) {
      // TODO: Validate params
      
      var rv = clients.add(params.clientId);
      cb(null, rv);
    };
  };

});
