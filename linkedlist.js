class Node {
	constructor(value = null) {
		this.value = value;
		this.nextNode = null;
	}
}

export default class LinkedList {
	constructor() {
		this.size = 0;
		this.listHead = null;
		this.listTail = null;
	}

	append(value) {
		const newNode = new Node(value);
		if (this.getSize() === 0) {
			this.listHead = newNode;
			this.listTail = newNode;
		} else {
			this.listTail.nextNode = newNode;
			this.listTail = newNode;
		}
		this.size++;
	}

	prepend(value) {
		if (this.getSize() === 0) {
			this.append(value);
		} else {
			const newNode = new Node(value);
			newNode.nextNode = this.listHead;
			this.listHead = newNode;
			this.size++;
		}
	}

	getSize() {
		return this.size;
	}

	head() {
		return this.listHead;
	}

	tail() {
		return this.listTail;
	}

	at(index) {
		if (index >= this.getSize()) return undefined;
		let currentNode = this.head();
		for (let i = 0; i < index; i++) {
			currentNode = currentNode.nextNode;
		}
		return currentNode.value;
	}

	pop() {
		if (this.getSize() === 0) return undefined;
		if (this.getSize() === 1) {
			let poppedNode = this.head();
			this.listHead = null;
			this.listTail = null;
			this.size--;
			return poppedNode.value;
		} else {
			let poppedNode = this.head();
			this.listHead = poppedNode.nextNode;
			this.size--;
			return poppedNode.value;
		}
	}

	contains(value) {
		let doesContain = false;
		let currentNode = this.head();
		while (currentNode !== null) {
			if (currentNode.value === value) {
				doesContain = true;
				break;
			}
			currentNode = currentNode.nextNode;
		}
		return doesContain;
	}

	findIndex(value) {
		let index = 0;
		let currentNode = this.head();
		while (currentNode !== null) {
			if (currentNode.value === value) {
				break;
			}
			index++;
			currentNode = currentNode.nextNode;
		}
		if (index >= this.getSize()) index = -1;
		return index;
	}

	toString() {
		let theList = '';
		if (this.getSize() === 0) return 'empty';
		else {
			let currentNode = this.head();
			while (currentNode !== null) {
				theList += `( ${currentNode.value} ) -> `;
				currentNode = currentNode.nextNode;
			}
			theList += 'null';
		}
		return theList;
	}
}
