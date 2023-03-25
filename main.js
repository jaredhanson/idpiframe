define(['./lib/iframe', 'querystring', 'exports'],
function(IFrame, qs, exports) {
  
  var iframe;
  
  exports.start = function() {
    var hash = window.location.hash.substring(1); // slice off leading `#`
    var q = qs.parse(hash);
    
    
    // TODO: Implement check so that idpReady event is not sent if q.origin isn't valid.
    // FIXME: Google's implemenation still delivers authResult from popup in this
    // condition.   Make that work.
    // TODO: Test what happens if iframe receives a message in this condition (ie, monitorClient)
    //if (location.origin !== q.origin) {
    //  return;
    //}
    
    // TODO: pass the clearCache option
    iframe = new IFrame(q.origin, q.rpcToken);
    iframe.bind();
  };
  
});
