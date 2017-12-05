describe('localStorage', function () {
  const testKey = 'test';
  let hash = new Date().getTime();

  it('I/O', function () {
    localStorage.setItem(testKey, hash.toString());
    expect(localStorage.getItem(testKey)).toBe(hash.toString());

    localStorage.removeItem(testKey);
    expect(localStorage.getItem(testKey)).toBe(null);
  });

  it('clear', function () {
    localStorage.clear();
    expect(localStorage.getItem(testKey)).toBe(null);
  });
});
