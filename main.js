define(['exports', 'querystring'],
function(exports, qs) {
  
  exports.start = function() {
    var hash = window.location.hash.slice(1); // slice off leading `#`
    var q = qs.parse(hash);
    console.log(q)

    var origin = q.origin;
    var rpcToken = q.rpcToken;
    
    
    window.addEventListener('message', function (event) {
      if (event.origin !== origin) { return; }
      if (event.source !== window.parent) { return; }
      // TODO: try/catch
      var msg = JSON.parse(event.data);
      if (msg.rpcToken !== rpcToken) { return; }

      console.log('msg: ');
      console.log(msg);
    
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
