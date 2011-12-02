/**
 * Module dependencies.
 */
var Notification = require('./notification');


/**
 * `NotificationCenter` constructor.
 *
 * A `NotificationCenter` manages the sending and receiving of notifications
 * within an application.
 *
 * @api public
 */
function NotificationCenter() {
  this._entries = [];
};

/**
 * Adds an entry to the notification dispatch table for the specified
 * notification.
 *
 * @param {String} name
 * @param {Object} sender
 * @param {Object} info
 * @api public
 */
NotificationCenter.prototype.addObserver = 
NotificationCenter.prototype.on = function(name, sender, fn) {
  if (typeof sender == 'function') { fn = sender, sender = null; }
  if (typeof name == 'object' && name) { sender = name, name = null; }
  if (typeof name == 'function') { fn = name, sender = null, name = null; }
  this._entries.push([name, sender, fn]);
};

NotificationCenter.prototype.removeObserver = function(name, sender, fn) {
  if (typeof sender == 'function') { fn = sender, sender = null; }
  if (typeof name == 'object' && name) { sender = name, name = null; }
  if (typeof name == 'function') { fn = name, sender = null, name = null; }
  
  var matches = [];
  for (var i = 0, len = this._entries.length; i < len; i++) {
    var entry = this._entries[i];
    if ( (entry[2] === fn) && ((entry[0] === name) || !name) && ((entry[1] === sender) || !sender) ) {
      matches.push(entry);
    }
  }
  for (var i = 0, len = matches.length; i < len; i++) {
    var idx = this._entries.indexOf(matches[i]);
    this._entries.splice(idx, 1);
  }
};

NotificationCenter.prototype.post = function(name, object, info) {
  var notification = (name instanceof Notification) ? name : new Notification(name, object, info);
  var entries = this._entries.slice(0);
  for (var i = 0, len = entries.length; i < len; i++) {
    var entry = entries[i];
    if ( ((entry[0] === notification.name) || !entry[0]) && ((entry[1] === notification.object) || !entry[1]) ) {
      entry[2].call(this, notification);
    }
  }
};


module.exports = NotificationCenter;
