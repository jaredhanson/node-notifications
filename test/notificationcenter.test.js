var assert = require('assert');
var NotificationCenter = require('notifications/notificationcenter');
var Notification = require('notifications/notification');


/* Sender */
function Sender(nc) {
  this.notificationCenter = nc;
};

Sender.prototype.postNotification = function(name, info) {
  this.notificationCenter.post(name, this, info);
};

/* Observer */
function Observer(nc) {
  this.notificationCenter = nc;
  this.observed = [];
};

Observer.prototype.observe = function(name, object) {
  var self = this;
  this.notificationCenter.addObserver(name, object, function(notif) {
    self.observed.push(notif);
  });
};


module.exports = {
  
  'test add observer for notification with a particular name from a specific sender': function() {
    var nc = new NotificationCenter();
    nc.addObserver('notification', this, function(){});
    assert.equal(nc._entries[0][0], 'notification');
    assert.equal(nc._entries[0][1], this);
    assert.equal(typeof nc._entries[0][2], 'function');
  },
  
  'test add observer for notifications with a particular name from any sender': function() {
    var nc = new NotificationCenter();
    
    nc.addObserver('notification', function(){});
    assert.equal(nc._entries[0][0], 'notification');
    assert.equal(nc._entries[0][1], null);
    assert.equal(typeof nc._entries[0][2], 'function');
    
    nc.addObserver('notification', null, function(){});
    assert.equal(nc._entries[1][0], 'notification');
    assert.equal(nc._entries[1][1], null);
    assert.equal(typeof nc._entries[1][2], 'function');
  },
  
  'test add observer for notifications from a specific sender': function() {
    var nc = new NotificationCenter();
    
    nc.addObserver(this, function(){});
    assert.equal(nc._entries[0][0], null);
    assert.equal(nc._entries[0][1], this);
    assert.equal(typeof nc._entries[0][2], 'function');
    
    nc.addObserver(null, this, function(){});
    assert.equal(nc._entries[1][0], null);
    assert.equal(nc._entries[1][1], this);
    assert.equal(typeof nc._entries[1][2], 'function');
  },
  
  'test add observer for all notifications': function() {
    var nc = new NotificationCenter();
    
    nc.addObserver(function(){});
    assert.equal(nc._entries[0][0], null);
    assert.equal(nc._entries[0][1], null);
    assert.equal(typeof nc._entries[0][2], 'function');
    
    nc.addObserver(null, function(){});
    assert.equal(nc._entries[1][0], null);
    assert.equal(nc._entries[1][1], null);
    assert.equal(typeof nc._entries[1][2], 'function');
    
    nc.addObserver(null, null, function(){});
    assert.equal(nc._entries[2][0], null);
    assert.equal(nc._entries[2][1], null);
    assert.equal(typeof nc._entries[2][2], 'function');
  },
  
  'test remove observer for notification with a particular name from a specific sender': function() {
    var s1 = new Sender();
    var s2 = new Sender();
    var nc = new NotificationCenter();
    var f = function(){};
    nc.addObserver('notification', s1, f);
    nc.addObserver('notification', s2, f);
    assert.length(nc._entries, 2);
    
    nc.removeObserver('notification', s1, f);
    assert.length(nc._entries, 1);
    assert.equal(nc._entries[0][0], 'notification');
    assert.equal(nc._entries[0][1], s2);
    assert.equal(nc._entries[0][2], f);
  },
  
  'test remove observer for notifications with a particular name from any sender': function() {
    var s1 = new Sender();
    var s2 = new Sender();
    var nc = new NotificationCenter();
    var f = function(){};
    nc.addObserver('notification-1', s1, f);
    nc.addObserver('notification-1', s2, f);
    nc.addObserver('notification-2', s2, f);
    assert.length(nc._entries, 3);
    
    nc.removeObserver('notification-1', f);
    assert.length(nc._entries, 1);
    assert.equal(nc._entries[0][0], 'notification-2');
    assert.equal(nc._entries[0][1], s2);
    assert.equal(nc._entries[0][2], f);
  },
  
  'test remove observer for notifications from a specific sender': function() {
    var s1 = new Sender();
    var s2 = new Sender();
    var nc = new NotificationCenter();
    var f = function(){};
    nc.addObserver('notification-1', s1, f);
    nc.addObserver('notification-1', s2, f);
    nc.addObserver('notification-2', s2, f);
    assert.length(nc._entries, 3);
    
    nc.removeObserver(s2, f);
    assert.length(nc._entries, 1);
    assert.equal(nc._entries[0][0], 'notification-1');
    assert.equal(nc._entries[0][1], s1);
    assert.equal(nc._entries[0][2], f);
  },
  
  'test remove observer for all notifications': function() {
    var s1 = new Sender();
    var s2 = new Sender();
    var s3 = new Sender();
    var nc = new NotificationCenter();
    var f1 = function(){};
    var f2 = function(){};
    nc.addObserver('notification-1', s1, f1);
    nc.addObserver('notification-2', s2, f1);
    nc.addObserver('notification-3', s3, f2);
    assert.length(nc._entries, 3);
    
    nc.removeObserver(f1);
    assert.length(nc._entries, 1);
    assert.equal(nc._entries[0][0], 'notification-3');
    assert.equal(nc._entries[0][1], s3);
    assert.equal(nc._entries[0][2], f2);
  },
  
  'test observe notification with a particular name from a specific sender' : function() {
    var nc = new NotificationCenter();
    var o = new Observer(nc);
    var s1 = new Sender(nc);
    var s2 = new Sender(nc);
    o.observe('notification', s1);
    
    s2.postNotification('notification', { foo: 'baz' });
    assert.length(o.observed, 0);
    s1.postNotification('notification', { foo: 'bar' });
    assert.length(o.observed, 1);
  },
  
  'test observe notification with a particular name from any sender' : function() {
    var nc = new NotificationCenter();
    var o = new Observer(nc);
    var s1 = new Sender(nc);
    var s2 = new Sender(nc);
    o.observe('notification', null);
    
    s2.postNotification('notification', { foo: 'baz' });
    assert.length(o.observed, 1);
    s1.postNotification('notification', { foo: 'bar' });
    assert.length(o.observed, 2);
  },
  
  'test observe notifications from a specific sender' : function() {
    var nc = new NotificationCenter();
    var o = new Observer(nc);
    var s1 = new Sender(nc);
    var s2 = new Sender(nc);
    o.observe(null, s1);

    s2.postNotification('notification', { foo: 'baz' });
    assert.length(o.observed, 0);
    s1.postNotification('notification-1', { item: '1' });
    assert.length(o.observed, 1);
    s1.postNotification('notification-2', { item: '2' });
    assert.length(o.observed, 2);
  },
  
  'test observe all notifications' : function() {
    var nc = new NotificationCenter();
    var o = new Observer(nc);
    var s1 = new Sender(nc);
    var s2 = new Sender(nc);
    o.observe(null, null);
    
    s1.postNotification('notification-1', { item: '1' });
    assert.length(o.observed, 1);
    s2.postNotification('notification-2', { item: '2' });
    assert.length(o.observed, 2);
  },
  
  'test post notification with name object and info' : function() {
    var nc = new NotificationCenter();
    var o = new Observer(nc);
    var s = new Sender();
    o.observe('notification', s);
    
    nc.post('notification', s, { foo: 'bar' });
    assert.equal(o.observed[0].name, 'notification');
    assert.equal(o.observed[0].object, s);
    assert.equal(o.observed[0].info['foo'], 'bar');
  },
  
  'test post notification with name and object' : function() {
    var nc = new NotificationCenter();
    var o = new Observer(nc);
    var s = new Sender();
    o.observe('notification', s);
    
    nc.post('notification', s);
    assert.equal(o.observed[0].name, 'notification');
    assert.equal(o.observed[0].object, s);
    assert.equal(o.observed[0].info, null);
  },
  
  'test post notification with notification' : function() {
    var nc = new NotificationCenter();
    var o = new Observer(nc);
    var s = new Sender();
    o.observe('notification', s);
    
    var n = new Notification('notification', s);
    nc.post(n);
    assert.equal(o.observed[0].name, 'notification');
    assert.equal(o.observed[0].object, s);
    assert.equal(o.observed[0].info, null);
  }

}
