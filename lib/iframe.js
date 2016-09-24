define(function() {
  
  function IFrame(origin, rpcToken) {
    this._origin = origin;
    this._rpcToken = rpcToken;
  }
  
  IFrame.prototype.bind = function() {
    var self = this;
    
    window.addEventListener('message', function (event) {
      if (event.origin !== self._origin) { return; }
      if (event.source !== window.parent) { return; }
      // TODO: try/catch
      var msg = JSON.parse(event.data);
      if (msg.rpcToken !== self._rpcToken) { return; }

      console.log('msg: ');
      console.log(msg);
    
    });
    
    window.addEventListener('storage', function(e) {  
      console.log('GOT STORAGE EVENT!');
      console.log(e);
    });
    
    this._postEvent('idpReady');
  }
  
  IFrame.prototype._postEvent = function(type, params) {
    params = params || {};
    params.type = type;
    
    var msg = {
      method: 'fireIdpEvent',
      params: params,
      rpcToken: this._rpcToken
    }
    window.parent.postMessage(JSON.stringify(msg), this._origin);
  }
  
  
  return IFrame;

});
