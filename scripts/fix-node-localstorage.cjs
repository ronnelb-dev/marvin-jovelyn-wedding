const store = new Map();

function createStorage() {
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key) {
      const normalizedKey = String(key);
      return store.has(normalizedKey) ? store.get(normalizedKey) : null;
    },
    key(index) {
      const keys = Array.from(store.keys());
      return keys[index] ?? null;
    },
    removeItem(key) {
      store.delete(String(key));
    },
    setItem(key, value) {
      store.set(String(key), String(value));
    },
  };
}

const hasBrokenLocalStorage =
  typeof globalThis.localStorage !== "undefined" &&
  typeof globalThis.localStorage?.getItem !== "function";

if (hasBrokenLocalStorage) {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: createStorage(),
  });
}
