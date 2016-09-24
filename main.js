define(['exports'],
function(exports) {
  
  exports.start = function() {
    console.log(window.location)
    
    
    window.addEventListener('message', function (event) {
      console.log('GOT MESSAGE FROM!');
      console.log(event.origin);
      //console.log(event.source)
      console.info('data', event.data);
    
    });
  
    window.addEventListener('storage', function(e) {  
      console.log('GOT STORAGE EVENT!');
      console.log(e);
    });
    
    window.parent.postMessage(
      JSON.stringify({"method":"fireIdpEvent","params":{"type":"idpReady"},"rpcToken":"8462679"}),
      'http://localhost:3001'); // TODO: get this from hash
  };
  
});
