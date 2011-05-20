var Notification = require('./notification');


function NotificationCenter() {
  this._observers = [];
};

NotificationCenter.prototype.addObserver = function(name, sender, fn) {
  if (typeof sender == 'function') { fn = sender, sender = null; }
  if (typeof name == 'object' && name) { sender = name, name = null; }
  if (typeof name == 'function') { fn = name, sender = null, name = null; }
  this._observers.push([name, sender, fn]);
};

NotificationCenter.prototype.removeObserver = function(name, sender, fn) {
  if (typeof sender == 'function') { fn = sender, sender = null; }
  if (typeof name == 'object' && name) { sender = name, name = null; }
  if (typeof name == 'function') { fn = name, sender = null, name = null; }
  
  var matches = [];
  for (var i = 0, len = this._observers.length; i < len; i++) {
    var observer = this._observers[i];
    if ( (observer[2] === fn) && ((observer[0] === name) || !name) && ((observer[1] === sender) || !sender) ) {
      matches.push(observer);
    }
  }
  for (var i = 0, len = matches.length; i < len; i++) {
    var idx = this._observers.indexOf(matches[i]);
    this._observers.splice(idx, 1);
  }
};

NotificationCenter.prototype.post = function(name, object, info) {
  var notification = (name instanceof Notification) ? name : new Notification(name, object, info);
  var observers = this._observers.slice(0);
  for (var i = 0, len = observers.length; i < len; i++) {
    var observer = observers[i];
    if ( ((observer[0] === notification.name) || !observer[0]) && ((observer[1] === notification.object) || !observer[1]) ) {
      observer[2].call(this, notification);
    }
  }
};


module.exports = NotificationCenter;
