export class HashSet {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = Array.from({ length: capacity }, () => []);
    this.size = 0; // Track the number of keys in the HashSet
  }

  // Hash function
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  // Determine the bucket index for a key
  bucket(key) {
    const bucketIndex = this.hash(key);
    return this.buckets[bucketIndex % this.buckets.length];
  }

  // Check if the key exists in the bucket
  // Helper function (similar to entry() method of HashMap)
  contains(bucket, key) {
    return bucket.some((entry) => entry === key);
  }

  // Resize the HashSet when the load factor is exceeded
  resize() {
    const newCapacity = this.capacity * 2;
    const newBuckets = Array.from({ length: newCapacity }, () => []);

    for (let bucket of this.buckets) {
      for (let key of bucket) {
        const newBucket = newBuckets[this.hash(key) % newCapacity];
        newBucket.push(key);
      }
    }

    this.capacity = newCapacity;
    this.buckets = newBuckets;
  }

  // Add a key to the HashSet
  // Similar to set() method of HashMap
  add(key) {
    // Resize if the load factor is exceeded
    if (this.size / this.capacity >= this.loadFactor) {
      this.resize();
    }

    const hashedBucket = this.bucket(key);
    if (!this.contains(hashedBucket, key)) {
      hashedBucket.push(key);
      this.size++; // Increment size when adding a new key
    }
  }

  // Check if the HashSet contains a key
  // Similar to has() method of HashMap
  containsKey(key) {
    const hashedBucket = this.bucket(key);
    return this.contains(hashedBucket, key);
  }

  // Remove a key from the HashSet
  remove(key) {
    const hashedBucket = this.bucket(key);
    const index = hashedBucket.indexOf(key);

    if (index !== -1) {
      hashedBucket.splice(index, 1);
      this.size--;
      return true;
    }

    return false;
  }

  // Get the number of keys in the HashSet
  // This is similar to length() but the logic is simply based on this.size instead of looping to count
  size() {
    return this.size;
  }

  // Clear all keys from the HashSet
  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  // Get all keys in the HashSet
  keys() {
    let resultArray = [];
    for (let bucket of this.buckets) {
      resultArray = resultArray.concat(bucket);
    }
    return resultArray;
  }
}
