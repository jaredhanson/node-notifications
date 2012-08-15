(function(root, factory) {
  if (typeof exports === 'object') {
    // Node.js
    factory(exports, module, require('./lib/index'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'module', './lib/index'], factory);
  }
}(this, function(exports, module, notifications) {
  exports = module.exports = notifications;
}));
