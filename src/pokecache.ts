export type CacheEntry<T> = {
  createdAt: number
  val: T
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(n: number) {
    this.#interval = n;
    this.#startReapLoop();
  }
  add<T>(key: string, val: T) {
    this.#cache.set(key, { createdAt: Date.now(), val: val })
  }
  get<T>(key: string) {
    const entry = this.#cache.get(key);
    if (entry !== undefined) {
      return entry.val as T;
    }
    return undefined;
  }
  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  #reap() {
    const now = Date.now();
    for (const [key, entry] of this.#cache) {
      if (now - entry.createdAt >= this.#interval) {
        this.#cache.delete(key);
      }
    }
  }
  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId)
      this.#reapIntervalId = undefined
    }
  }
}
