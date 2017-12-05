describe('pathStorage', function () {
  const testKey = 'test';
  let hash = new Date().getTime();

  it('I/O', function () {
    pathStorage.setItem(testKey, hash.toString());
    expect(pathStorage.getItem(testKey)).toBe(hash.toString());

    pathStorage.removeItem(testKey);
    expect(pathStorage.getItem(testKey)).toBe(null);
  });

  it('clear', function () {
    pathStorage.clear();
    expect(pathStorage.getItem(testKey)).toBe(null);
  });
});
