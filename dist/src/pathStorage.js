'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PathStorage = function () {
  function PathStorage(options) {
    _classCallCheck(this, PathStorage);

    this.config = Object.assign(this.config || {
      autoExecute: true,
      useHashPath: false,
      realTimePath: false
    }, options || {});

    if (!window.location instanceof Location) {
      throw new Error(this.constructor.name + ' must use on browser environment.');
    }

    this.workSpace = {};

    this.load();
  }

  _createClass(PathStorage, [{
    key: 'assertLocalHashKey',
    value: function assertLocalHashKey() {
      if (this.localHashKey === undefined) {
        throw new Error(this.constructor.name + ' has not key.');
      }
    }
  }, {
    key: 'assertWorkSpace',
    value: function assertWorkSpace() {
      if (this.workSpace === undefined) {
        throw new Error(this.constructor.name + ' has not workspace.');
      }
    }
  }, {
    key: 'generateLocalKey',
    value: function generateLocalKey() {
      var pathKey = void 0,
          hashKey = void 0;
      pathKey = this.path.map(function (char) {
        return char.charCodeAt(0);
      }).join('');

      if (this.config.useHashPath) {
        hashKey = this.hashPath.map(function (char) {
          return char.charCodeAt(0);
        }).join('');
        pathKey = (isNaN(pathKey) ? '' : pathKey) + (isNaN(hashKey) ? '' : hashKey);
      }

      return pathKey;
    }
  }, {
    key: 'detectPath',
    value: function detectPath() {
      this.path = window.location.pathname.split('/');
      this.hashPath = window.location.hash.substr(1).split('/');

      this.path.shift();

      this.localHashKey = this.generateLocalKey();
      this.assertLocalHashKey();
    }
  }, {
    key: 'load',
    value: function load() {
      var pastKey = this.localHashKey;
      this.detectPath();

      if (pastKey !== undefined && pastKey !== this.localHashKey) {
        localStorage.setItem(pastKey, JSON.stringify(this.workSpace));
      }

      if (localStorage[this.localHashKey] === undefined) {
        localStorage.setItem(this.localHashKey, JSON.stringify({}));
      }

      this.workSpace = JSON.parse(localStorage.getItem(this.localHashKey)) || {};
    }
  }, {
    key: 'execute',
    value: function execute() {
      if (this.config.realTimePath) {
        this.detectPath();
      }

      localStorage.setItem(this.localHashKey, JSON.stringify(this.workSpace));
      this.length = Object.keys(this.workSpace).length;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.assertWorkSpace();

      this.workSpace = {};
      localStorage.setItem(this.localHashKey, null);
    }
  }, {
    key: 'getItem',
    value: function getItem(key) {
      if (this.config.realTimePath) {
        this.load();
      }

      return this.workSpace[key];
    }
  }, {
    key: 'key',
    value: function key(index) {
      var keys = void 0;
      if (this.config.realTimePath) {
        this.load();
      }
      keys = Object.keys(this.workSpace);

      return this.workSpace[keys[index]];
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      if (this.config.realTimePath) {
        this.load();
      }

      if (this.workSpace.hasOwnProperty(key)) {
        delete this.workSpace[key];
      }

      if (this.config.autoExecute) {
        this.execute();
      }
    }
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      if (this.config.realTimePath) {
        this.load();
      }

      this.workSpace[key] = value;

      if (this.config.autoExecute) {
        this.execute();
      }
    }
  }]);

  return PathStorage;
}();
//# sourceMappingURL=pathStorage.js.map