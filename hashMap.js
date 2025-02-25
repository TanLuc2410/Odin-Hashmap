export class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = Array.from({ length: capacity }, () => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  bucket(key) {
    const bucketIndex = this.hash(key);
    return this.buckets[bucketIndex % this.buckets.length];
  }

  entry(bucket, key) {
    for (let wantedKey of bucket) {
      if (wantedKey.key === key) return wantedKey;
    }
    return null;
  }

  resize() {
    const newCapacity = this.capacity * 2;
    const newBuckets = Array.from({ length: newCapacity }, () => []);

    for (let bucket of this.buckets) {
      for (let { key, value } of bucket) {
        const newBucket = newBuckets[this.hash(key) % newBuckets.length];
        newBucket.push({ key, value });
      }
    }

    this.capacity = newCapacity;
    this.buckets = newBuckets;
  }

  set(key, value) {
    if (this.size / this.capacity >= this.loadFactor) {
      this.resize();
    }

    const hashedBucket = this.bucket(key);
    const hasKey = this.entry(hashedBucket, key);

    if (hasKey) {
      hasKey.value = value;
      return;
    }
    hashedBucket.push({ key, value });
    this.size++;
  }

  get(key) {
    const hashedBucket = this.bucket(key);
    const hasKey = this.entry(hashedBucket, key);

    if (hasKey) return hasKey.value;
    return null;
  }

  has(key) {
    const hashedBucket = this.bucket(key);
    const hasKey = this.entry(hashedBucket, key);
    if (hasKey) return true;

    return false;
  }

  remove(key) {
    const hashedBucket = this.bucket(key);
    const index = hashedBucket.findIndex((entry) => entry.key === key);

    if (index !== -1) {
      hashedBucket.splice(index, 1);
      this.size--;
      return true;
    }

    return false;
  }

  length() {
    let count = 0;
    for (let bucket of this.buckets) {
      count += bucket.length;
    }
    return count;
  }

  clear() {
    for (let bucket of this.buckets) {
      bucket.length = 0;
      this.size = 0;
    }
  }

  keys() {
    let resultArray = [];
    for (let bucket of this.buckets) {
      resultArray = resultArray.concat(bucket.map((pair) => pair.key));
    }
    return resultArray;
  }

  values() {
    let resultArray = [];
    for (let bucket of this.buckets) {
      resultArray = resultArray.concat(bucket.map((pair) => pair.value));
    }
    return resultArray;
  }

  entries() {
    let resultArray = [];
    for (let bucket of this.buckets) {
      resultArray = resultArray.concat(
        bucket.map((pair) => {
          return [pair.key, pair.value];
        })
      );
    }
    return resultArray;
  }
}
