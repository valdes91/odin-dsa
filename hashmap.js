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
		return !(index < 0 || index >= this.buckets.length);
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
			}
			console.log('list after updating');
			console.log(bucketList.toString());
		} else {
			console.log('not valid index');
		}
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
}

const hashmap = new HashMap();
hashmap.set('The Oddysey', 'matt damon');
hashmap.set('Dostoevsky', 'Crime and Punishment');
hashmap.set('Miller', 'Circe');
hashmap.set('Dostoevsky', 'White Nights');
console.log('Looking for Miller...');
console.log(hashmap.get('Miller'));
console.log('looking for Dostoevsky...');
console.log(hashmap.get('Dostoevsky'));
console.log('looking for nonexistent Homer...');
console.log(hashmap.get('Homer'));
console.log(`Checking if hashmap has key "Miller": ${hashmap.has('Miller')}`);
console.log(`Checking if hashmap has nonexistent key "Homer": ${hashmap.has('Homer')}`);
console.log(`Checking if hashmap has key "Dostoevsky": ${hashmap.has('Dostoevsky')}`);
console.log(`keys in the hashmap: ${hashmap.getKeys()}`);
console.log(`values in the hashmap: ${hashmap.getValues()}`);
console.log(`all entries in the hashmap: ${hashmap.getEntries()}`);
console.log(`attempting to remove nonexistent key Marx: ${hashmap.remove('marx')}`);
console.log(`attempting to remove existing key Dostoevsky: ${hashmap.remove('Dostoevsky')}`);
console.log(`entries now: ${hashmap.getEntries()}`);
