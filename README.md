# Notifications

Notifications provides an architecture for broadcasting notifications within a
[Node.js](http://nodejs.org/) application.

Notifications builds on Node's powerful concepts of [events](http://nodejs.org/docs/v0.6.4/api/events.html),
and introduces an more decoupled approach.  In order to receive events from an
object, the listener must first obtain a reference to the emitting object in
order to register as a listener.  This coupling of two objects can be
undesirable, especially when when it would join two otherwise independent
subsystems.

For these scenarios, a broadcast mechanism is introduced in which objects post
notifications to a notification center, which dispatches them to any registered
observers.

## Installation

    $ npm install notifications

## Usage

#### Register an Observer

Register an observer function with the notification center.  Whenever a
notification with the given `name` is posted, the function will be called.
The `notif` passed as an argument to the function has `object` and `info`
properties which contain related information.

    notifications.on('users.new', function(notif) {
      var user = notif.object;
      if (notif.info.lang == 'en') {
        email.send({ to: user.email }, 'Welcome ' + user.firstName + '!');
      } else {
        // localize emails!
      }
    });

#### Post a Notification

When an interesting event occurs in the application, post a notification to the
notification center.  In this example, a notification is posted whenever a new
user account is created.  Observers implement necessary post-processing logic,
such as sending welcome emails, and are fully decoupled.  The web application
and email delivery subsystems remain discreet components.

    app.post('/users', function(req, res) {
      // create a new user record in database
      var user = new User(...);
      user.save(function(err) {
        // user record saved, post a notification
        // observers will be notified, triggering welcome email, etc.
        notifications.post('users.new', user, { language: 'en' });
        res.redirect('/');
      });
    });
    
#### NotificationCenter Instances

A default `NotificationCenter` is the main export of the notifications module.
This instance is shared within the application, making it convenient to
broadcast notifications to disparate subsystems.  This is the recommended way
of using notifications.

If desired, separate `NotificationCenter` instances can be created as well.

    var nc = new notifications.NotificationCenter();
    
Notifications are only dispatched to observers registered with the
`NotificationCenter` they are posted to.  Having separate `NotificationCenter`
instances allows notifications to be contained within subsystems of the
application.

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

This module is inspired by, and patterned closely after, the [NSNotificationCenter](http://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/Notifications/Introduction/introNotifications.html)
class provided within Cocoa's Foundation Framework.

## License

(The MIT License)

Copyright (c) 2011 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
