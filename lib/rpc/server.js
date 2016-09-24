define(function() {
  
  function Server() {
    this._methods = {};
  }
  
  Server.prototype.expose = function(name, method) {
    if (!method) {
      method = name;
      name = method.name;
    }
    console.log('REG FUNC NAME: ' + name);
    this._methods[name] = method;
  };
  
  Server.prototype.listen = function(origin, rpcToken) {
    var self = this;
    window.addEventListener('message', function (ev) {
      if (ev.origin !== origin) { return; }
      if (ev.source !== window.parent) { return; }
      // TODO: try/catch
      var req = JSON.parse(ev.data);
      if (req.rpcToken !== rpcToken) { return; }

      console.log('msg: ');
      console.log(req);
      
      function respond(err, res) {
        if (err) {
          // TODO: format error response
          console.log(err);
        }
        
        if (req.id === undefined) { return; }
        
        var msg = {
          id: req.id,
          result: res,
          rpcToken: rpcToken
        }
        window.parent.postMessage(JSON.stringify(msg), origin);
      }
      
      
      var method = self._methods[req.method];
      if (method) {
        
        
        method(req.params, respond)
      } else {
        // TODO:
        respond(new Error('Method Not Found'));
      }
      
    });
    
  };
  
  return Server;

});
