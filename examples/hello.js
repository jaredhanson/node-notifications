var notifications = require('notifications');


notifications.addObserver('hello', function(notif) {
  console.log('Hello ' + notif.info.name + '!');
});

notifications.post('hello', null, { name: 'World' });
