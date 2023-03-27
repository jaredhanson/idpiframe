define(['./clients',
        './rpc/server',
        './rpc/methods/monitorclient',
        './rpc/methods/getsessionselector',
        './rpc/methods/setsessionselector',
        './rpc/methods/gettokenresponse',
        './rpc/methods/listidpsessions',
        './rpc/methods/revoke'
       ],
function(Clients, RPCServer, monitorClient, getSessionSelector, setSessionSelector, getTokenResponse, listIdpSessions, revoke) {
  
  function IFrame(origin, rpcToken) {
    this._origin = origin;
    this._rpcToken = rpcToken;
    this._clients = new Clients();
    
    this._sessionSelectorPath = 'oauth2/ss';
    
    this._rpcServer = new RPCServer();
    this._rpcServer.expose(monitorClient(this._clients, { origin: origin }));
    this._rpcServer.expose(getSessionSelector());
    this._rpcServer.expose(setSessionSelector());
    this._rpcServer.expose(getTokenResponse());
    this._rpcServer.expose(listIdpSessions());
    this._rpcServer.expose(revoke());
    
    this._storageRelayPath = 'tmp/oauth/relay/';
  }
  
  IFrame.prototype.bind = function() {
    var self = this;
    
    this._rpcServer.listen(this._origin, this._rpcToken);
    
    window.addEventListener('storage', function(ev) {
      console.log('STORAGE EVENT!');
      console.log(ev.key);
      console.log(ev.newValue);
      console.log(ev.oldValue);
      
      if (ev.key.indexOf(self._sessionSelectorPath + '/') == 0) {
        var comps = ev.key.split('/');
        
        
        // TODO: try/catch
        var value = JSON.parse(ev.newValue);
        
        var params = {
          newValue: value,
          domain: decodeURIComponent(comps[3]),
          crossSubDomains: comps[4] == '1' ? true : false
        }
        
        // TODO: Only post this to registered clients that match the session selector???
        self._postEvent('sessionSelectorChanged', params);
        return;
      }
      
      
      
      // The sessionrelay will write an authorization response to a temporary
      // location in localStorage, and then remove the response after a short
      // delay.  When the response is removed, an event is triggered where
      // `newValue` is null.  Filter out said events.
      if (ev.newValue == null) { return; }
      if (ev.key.indexOf(self._storageRelayPath) != 0) { return; }
      
      var key = ev.key.split('/')
        , ares, origin, clientID, rid;
      
      if (key.length != 6) {
        console && console.log('Encountered invalid storage key while relaying authorization response');
        return;
      }
      
      origin = decodeURIComponent(key[3]);
      clientID = decodeURIComponent(key[4]);
      rid = decodeURIComponent(key[5]);
      
      if (origin !== self._origin) { return; }
      
      // TODO: try/catch
      ares = JSON.parse(ev.newValue);
      
      self._postEventToClient(clientID, 'authResult', { id: rid, authResult: ares });
    });
    
    // TODO: Implement check for cookieDisabled or not, per Google's implementation.
    var params = {
      cookieDisabled: false
    };
    this._postEvent('idpReady', params);
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
  
  IFrame.prototype._postEventToClient = function(clientID, type, params) {
    // TODO: Check if clientID is being monitored, and return if not
    
    params = params || {};
    params.clientId = clientID;
    
    this._postEvent(type, params);
  }
  
  
  return IFrame;

});
