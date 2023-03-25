define(['./lib/iframe', 'querystring', 'exports'],
function(IFrame, qs, exports) {
  
  var iframe;
  
  exports.start = function() {
    var hash = window.location.hash.substring(1); // slice off leading `#`
    var q = qs.parse(hash);
    
    // FIXME: Google's implemenation still delivers authResult from popup in this
    // condition.   Make that work.
    if (location.origin !== q.origin) {
      return;
    }
    
    // TODO: pass the clearCache option
    iframe = new IFrame(q.origin, q.rpcToken);
    iframe.bind();
  };
  
});
