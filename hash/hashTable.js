const hashFunction = require('./hashFunction');

class HashTable {
    constructor(size) {
        this.size = size;
        this.buckets = Array(size).fill(null).map(() => []);
    }

    // Simple hash function to calculate hash code
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    // Insert a key-value pair into the hash table
    insert(key, value) {
        const index = this.hash(key);
        console.log(index);
        const bucket = this.buckets[index];

        // Check if the key already exists in the bucket
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        // If key does not exist, add a new key-value pair
        bucket.push([key, value]);
    }

    // Retrieve the value for a given key
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }

        return null;
    }

    // Remove a key-value pair from the hash table
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return;
            }
        }
    }
}

// Example usage
const hashTable = new HashTable(5);

hashTable.insert('apple', 1);
hashTable.insert('banana', 2);
hashTable.insert('cherry', 3);

// Handling collision: inserting a key that hashes to the same index
hashTable.insert('paple', 4); // Assuming 'paple' hashes to the same index as 'apple'

console.log(hashTable.get('apple')); // Output: 1
console.log(hashTable.get('banana')); // Output: 2
console.log(hashTable.get('cherry')); // Output: 3
console.log(hashTable.get('paple')); // Output: 4

// hashTable.remove('banana');
console.log(hashTable.get('banana')); // Output: null

console.log(hashTable.buckets); // Output: Array representation of the hash table with linked lists
