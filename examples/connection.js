var events = require('events');
var notifications = require('notifications');
var util = require('util');


function createConnection() {
  var conn = new Connection();
  notifications.post('newConnection', conn);
}


function Connection() {
  events.EventEmitter.call(this);
};

util.inherits(Connection, events.EventEmitter);

Connection.prototype.connect = function() {
  this.emit('connect');
}


notifications.on('newConnection', function(notif) {
  console.log('New connection!');
  notif.object.on('connect', function() {
    console.log('Connected!');
  });
  notif.object.connect();
});

createConnection();
