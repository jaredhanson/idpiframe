define(['./lib/iframe', 'querystring', 'exports'],
function(IFrame, qs, exports) {
  
  function postEvent(type) {
    
  }
  
  
  var iframe;
  
  exports.start = function() {
    
    var hash = window.location.hash.slice(1); // slice off leading `#`
    var q = qs.parse(hash);
    console.log(q)

    var origin = q.origin;
    var rpcToken = q.rpcToken;
    
    iframe = new IFrame(q.origin, q.rpcToken);
    iframe.bind();
  };
  
});
