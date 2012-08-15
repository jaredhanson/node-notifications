(function(root, factory) {
  if (typeof exports === 'object') {
    // Node.js
    factory(exports, module, require('./notificationcenter'), require('./notification'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'module', './notificationcenter', './notification'], factory);
  }
}(this, function(exports, module, NotificationCenter, Notification) {
  
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
  
}));
