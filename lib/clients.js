define(function() {
  
  function Clients() {
    this._clients = [];
  }
  
  Clients.prototype.add = function(clientID) {
    if (this._clients.indexOf(clientID) != -1 ) { return true; }
    this._clients.push(clientID);
    return true;
  }
  
  return Clients;

});
