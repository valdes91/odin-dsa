import LinkedList from './linkedlist.js';

class HashMap {
	constructor() {
		this.loadFactor = 0.75;
		this.capacity = 16;
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
