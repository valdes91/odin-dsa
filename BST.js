import mergeSort from './mergesort.js';

class TreeNode {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}

	isLeafNode() {
		return this.left === null && this.right === null;
	}

	hasOnlyRightChild() {
		return this.left === null && this.right !== null;
	}

	hasOnlyLeftChild() {
		return this.left !== null && this.right === null;
	}
}

class Tree {
	constructor(arr) {
		this.root = this.buildTree(arr);
	}

	buildTree(arr) {
		const sortedArrUnique = [...new Set(mergeSort(arr))];
		return this.buildTreeRecursive(sortedArrUnique, 0, sortedArrUnique.length - 1);
	}

	buildTreeRecursive(arr, start, end) {
		if (start > end) return null;
		const mid = Math.trunc((start + end) / 2);

		const root = new TreeNode(arr[mid]);
		root.left = this.buildTreeRecursive(arr, start, mid - 1);
		root.right = this.buildTreeRecursive(arr, mid + 1, end);

		return root;
	}

	insert(value) {
		this.root = this.insertRecursive(this.root, value);
	}

	insertRecursive(node, value) {
		if (node === null) return new TreeNode(value);

		if (value < node.data) {
			node.left = this.insertRecursive(node.left, value);
		} else if (value > node.data) {
			node.right = this.insertRecursive(node.right, value);
		} else if (value === node.data) {
			console.log('value already exists in this node. no action taken');
		}

		return node;
	}

	delete(value) {
		this.root = this.deleteRecursive(this.root, value);
	}

	deleteRecursive(node, value) {
		// need to check if node to be deleted is a leaf, has one child or 2 children

		// check if the tree even has a node or if weve reached the end without a match
		if (node === null) {
			return node;
		}

		// keep traversing if its not the matching value
		if (node.data < value) {
			node.right = this.deleteRecursive(node.right, value);
		} else if (node.data > value) {
			node.left = this.deleteRecursive(node.left, value);
		} else {
			// once theres a match, determine amount of child nodes
			if (node.isLeafNode()) return null;
			if (node.hasOnlyLeftChild()) return node.left;
			if (node.hasOnlyRightChild()) return node.right;

			// if we reach here, theres 2 child nodes. find the successor in the right subtree with lowest value
			const successor = this.findSuccessor(node);
			node.data = successor.data;
			node.right = this.deleteRecursive(node.right, successor.data);
		}
		return node;
	}

	findSuccessor(node) {
		let subTree = node.right;
		while (subTree.left !== null) {
			subTree = subTree.left;
		}
		return subTree;
	}

	find(value) {
		//const foundNode = this.findRecursive(this.root, value);
		let curr = this.root;
		let isFound = false;
		let foundNode = null;
		while (curr !== null && !isFound) {
			if (value < curr.data) curr = curr.left;
			else if (value > curr.data) curr = curr.right;
			else {
				foundNode = curr;
				isFound = true;
			}
		}

		return foundNode;
	}

	levelOrderForEach(callback) {
		if (callback === undefined) throw Error('You must pass a callback');

		const nodesToVisit = [];
		nodesToVisit.push(this.root);

		while (nodesToVisit.length > 0) {
			let nextNode = nodesToVisit.shift();
			callback(nextNode);
			if (nextNode.left !== null) nodesToVisit.push(nextNode.left);
			if (nextNode.right !== null) nodesToVisit.push(nextNode.right);
		}
	}
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};

// tests
const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
myTree.insert(6345);
prettyPrint(myTree.root);
myTree.delete(0);
prettyPrint(myTree.root);
myTree.delete(6345);
prettyPrint(myTree.root);
myTree.delete(9);
prettyPrint(myTree.root);
myTree.delete(4);
prettyPrint(myTree.root);
myTree.delete(8);
prettyPrint(myTree.root);
const foundNode = myTree.find(324);
const notFoundNode = myTree.find(11);
console.log(`Result for finding existing value of 67: ${foundNode.data}`);
console.log(`Result for finding nonexisting value of 11: ${notFoundNode}`);
console.log('Testing level order for each...');
myTree.levelOrderForEach((node) => console.log(`NODE VALUE: ${node.data}`));
try {
	myTree.levelOrderForEach();
} catch (e) {
	console.log('Error detected');
	console.log(e.message);
}
