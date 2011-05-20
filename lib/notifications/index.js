var NotificationCenter = require('./notificationcenter');

exports.NotificationCenter = NotificationCenter;


var _defaultCenter;

exports.defaultCenter = function() {
  if (!_defaultCenter) {
    _defaultCenter = new NotificationCenter();
  }
  return _defaultCenter;
}
