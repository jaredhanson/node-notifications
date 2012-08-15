var assert = require('assert');
var Notification = require('notification');


module.exports = {
  
  'test constructor': function() {
    var notif = new Notification('hello', this, { name: 'world' });
    assert.equal(notif.name, 'hello');
    assert.equal(notif.object, this);
    assert.equal(notif.info['name'], 'world');
  }

}
