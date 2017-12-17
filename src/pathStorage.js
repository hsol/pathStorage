'use strict';

class PathStorage {
  constructor(options) {
    this.config = Object.assign((this.config || {
      autoExecute: true,
      useHashPath: false,
      realTimePath: false,
    }), (options || {}));

    if (!window.location instanceof Location) {
      throw new Error(`${this.constructor.name} must use on browser environment.`);
    }

    this.workSpace = {};

    this.load();
  }

  assertLocalHashKey() {
    if (this.localHashKey === undefined) {
      throw new Error(`${this.constructor.name} has not key.`);
    }
  }

  assertWorkSpace() {
    if (this.workSpace === undefined) {
      throw new Error(`${this.constructor.name} has not workspace.`);
    }
  }

  generateLocalKey() {
    let pathKey, hashKey;
    pathKey = this.path
    .map((char) => {
      return char.charCodeAt(0);
    }).join('');

    if(this.config.useHashPath) {
      hashKey = this.hashPath
      .map((char) => {
        return char.charCodeAt(0);
      }).join('');
      pathKey = (isNaN(pathKey) ? '' : pathKey) + (isNaN(hashKey) ? '' : hashKey);
    }

    return pathKey;
  }

  get length() {
    this.assertWorkSpace();

    return Object.keys(this.workSpace).length;
  }

  detectPath() {
    this.path = window.location.pathname.split('/');
    this.hashPath = (window.location.hash.substr(1)).split('/');

    this.path.shift();

    this.localHashKey = this.generateLocalKey();
    this.assertLocalHashKey();
  }

  load() {
    let pastKey = this.localHashKey;
    this.detectPath();

    if(pastKey !== undefined && pastKey !== this.localHashKey) {
      localStorage.setItem(pastKey, JSON.stringify(this.workSpace));
    }

    if (localStorage[this.localHashKey] === undefined) {
      localStorage.setItem(this.localHashKey, JSON.stringify({}));
    }

    this.workSpace = JSON.parse(localStorage.getItem(this.localHashKey)) || {};
  }

  execute() {
    if (this.config.realTimePath) {
      this.detectPath();
    }

    localStorage.setItem(this.localHashKey, JSON.stringify(this.workSpace));
  }

  clear() {
    this.assertWorkSpace();

    this.workSpace = {};
    localStorage.setItem(this.localHashKey, null);
  };

  getItem(key) {
    if (this.config.realTimePath) {
      this.load();
    }

    return this.workSpace[key];
  };

  key(index) {
    let keys;
    if (this.config.realTimePath) {
      this.load();
    }
    keys = Object.keys(this.workSpace);

    return this.workSpace[keys[index]];
  };

  removeItem(key) {
    if (this.config.realTimePath) {
      this.load();
    }

    if (this.workSpace.hasOwnProperty(key)) {
      delete this.workSpace[key];
    }

    if(this.config.autoExecute) {
      this.execute();
    }
  };

  setItem(key, value) {
    if (this.config.realTimePath) {
      this.load();
    }

    this.workSpace[key] = value;

    if(this.config.autoExecute) {
      this.execute();
    }
  };
}
