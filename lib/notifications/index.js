/**
 * Module dependencies.
 */
var NotificationCenter = require('./notificationcenter')
  , Notification = require('./notification');


/**
 * Export default singleton.
 *
 * @api public
 */
exports = module.exports = new NotificationCenter();

/**
 * Expose constructors.
 */
exports.NotificationCenter = NotificationCenter;
exports.Notification = Notification;
