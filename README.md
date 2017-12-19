# PathStorage
This library can use localStorage with unique on path.
You can apply this through npm(https://www.npmjs.com/package/pathstorage)

## Example

https://hsol.github.io/pathStorage

## Initialization
`new PathStorage(object options)`
Custom library options by object parameter

## Options
- Auto Execute(default: true)

   Auto execute values on localStorage when set, remove, clear item.

- Use Hash Path(default: false)

   Use hash path on divide.

- Real Time Path(default: false)

   Get path by real time.

## Methods (like a [Storage](https://developer.mozilla.org/ko/docs/Web/API/Storage) specs)
### PathStorage.key(Int index)
When passed a number n, this method will return the name of the nth key in the storage.

`var firstValue = pathStorage.key(0);`
                    
### PathStorage.getItem(String key)
When passed a key name, will return that key's value.

`var options = pathStorage.getItem('say');`
                    
### PathStorage.setItem(String key, Mixed value)
When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.

`pathStorage.setItem('say', {hello: 'world'});`
                    
### PathStorage.removeItem(String key)
When passed a key name, will remove that key from the storage.

`pathStorage.removeItem('say');`
                    
### PathStorage.clear()
When invoked, will empty all keys out of the storage.

`pathStorage.clear();`

## Example

```
var pathStorage = new PathStorage({
  autoExecute: true, // default
  useHashPath: false, // default
  realTimePath: false // default
});
```

Copyright 2017 HansolLim <dev.hansollim@gmail.com>

MIT LICENSE
