require.paths.unshift("../lib");
var notifications = require('notifications');


notifications.defaultCenter().addObserver('hello', function(notif) {
  console.log('Hello!');
});

notifications.defaultCenter().post('hello', null, {});
