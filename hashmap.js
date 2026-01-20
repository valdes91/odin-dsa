import LinkedList from './linkedlist.js';

class HashMap {
	constructor() {
		this.loadFactor = 0.75;
		this.capacity = 16;
		this.keys = 0;
		this.buckets = Array.from({ length: this.capacity }, () => new LinkedList());
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}
		return hashCode;
	}

	isValidIndex(index) {
		return !(index < 0 || index >= this.capacity);
	}

	set(key, value) {
		const bucketIndex = this.hash(key);
		if (this.isValidIndex(bucketIndex)) {
			// go to bucket and check for nodes
			const bucketList = this.buckets[bucketIndex];
			// try to update an existing node with the key, append if fails
			const newEntry = { key, value };
			if (!bucketList.update(newEntry)) {
				bucketList.append(newEntry);
				this.keys++;
				if (this.keys > this.loadFactor * this.capacity) {
					this.growBuckets();
				}
			}
		} else {
			console.log('not valid index');
		}
	}

	growBuckets() {
		console.log('enough entries have been added to regrow the map. redistributing...');
		this.capacity *= 2;
		const newBuckets = Array.from({ length: this.capacity }, () => new LinkedList());
		// copy every node in the current bucket list to the newBuckets with new hashes
		for (let i = 0; i < this.buckets.length; i++) {
			let bucketNode = this.buckets[i].head();
			while (bucketNode !== null) {
				const nodeValue = { key: bucketNode.value.key, value: bucketNode.value.value };
				const hashIndex = this.hash(nodeValue.key);
				if (this.isValidIndex(hashIndex)) {
					newBuckets[hashIndex].append(nodeValue);
				} else {
					console.log('invalid index???');
				}
				bucketNode = bucketNode.nextNode;
			}
		}
		this.buckets = newBuckets;
	}

	get(key) {
		const bucketIndex = this.hash(key);
		if (this.isValidIndex(bucketIndex)) {
			const bucketList = this.buckets[bucketIndex];
			const returnedValue = bucketList.retrieve(key);
			return returnedValue;
		} else return null;
	}

	has(key) {
		let hasKey = false;
		const bucketIndex = this.hash(key);
		if (this.isValidIndex(bucketIndex)) {
			const bucket = this.buckets[bucketIndex];
			if (bucket.contains(key)) {
				hasKey = true;
			}
		}
		return hasKey;
	}

	remove(key) {
		let removed = false;
		const bucketIndex = this.hash(key);
		if (this.isValidIndex(bucketIndex)) {
			const bucket = this.buckets[bucketIndex];
			if (bucket.remove(key)) {
				removed = true;
			}
		}
		return removed;
	}

	length() {
		return this.keys;
	}

	clear() {
		let bucketIndex = 0;
		for (let i = 0; i < this.buckets.length; i++) {
			const bucket = this.buckets[bucketIndex];
			while (bucket.getSize() > 0) {
				bucket.pop();
			}
		}
	}

	getKeys() {
		const hashMapKeys = [];
		for (let i = 0; i < this.buckets.length; i++) {
			const bucket = this.buckets[i];
			let node = bucket.head();
			while (node !== null) {
				const key = node.value.key;
				hashMapKeys.push(key);
				node = node.nextNode;
			}
		}
		return hashMapKeys;
	}

	getValues() {
		const hashMapValues = [];
		for (let i = 0; i < this.buckets.length; i++) {
			const bucket = this.buckets[i];
			let node = bucket.head();
			while (node !== null) {
				const value = node.value.value;
				hashMapValues.push(value);
				node = node.nextNode;
			}
		}
		return hashMapValues;
	}

	getEntries() {
		const hashMapEntries = [];
		for (let i = 0; i < this.buckets.length; i++) {
			const bucket = this.buckets[i];
			let node = bucket.head();
			while (node !== null) {
				const entry = node.value;
				hashMapEntries.push([entry.key, entry.value]);
				node = node.nextNode;
			}
		}
		return hashMapEntries;
	}

	printBuckets() {
		for (let i = 0; i < this.buckets.length; i++) {
			const bucket = this.buckets[i];
			console.log(bucket.toString());
		}
	}
}

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log(test.printBuckets());
test.set('apple', 'envy');
console.log(`hashmap length: ${test.length()} and capacity: ${test.capacity}`);
test.set('banana', 'boat');
console.log(`hashmap length: ${test.length()} and capacity: ${test.capacity}`);
test.set('carrot', 'cake');
console.log(`hashmap length: ${test.length()} and capacity: ${test.capacity}`);
test.set('moon', 'silver');
console.log(`hashmap length: ${test.length()} and capacity: ${test.capacity}`);
console.log(test.printBuckets());
