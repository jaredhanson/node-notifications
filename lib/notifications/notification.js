/**
 * `Notification` constructor.
 *
 * A `Notification` encapsulates information so that it can be broadcast to
 * other objects via a `NotificationCenter`.  A notification contains a `name`,
 * `object`, and optional `info` hash.  The `name` is a string that uniquely
 * identifies the type of notification.  The `object` is any object that the
 * poster of the notification wants to send to the observers (typically, it is
 * the object that posted the notification).  The `info` is any related
 * information, if any, contained in an object literal.
 *
 * Examples:
 *
 *    new Notification('myClass.interestingEvent', this);
 *
 *    new Notification('myClass.otherInterestingEvent', this, { foo: 'bar' });
 *
 * @param {String} name
 * @param {Object} object
 * @param {Object} info
 * @api public
 */
function Notification(name, object, info) {
  this.name = name;
  this.object = object;
  this.info = info;
};


/**
 * Expose `Notification`.
 */
module.exports = Notification;
