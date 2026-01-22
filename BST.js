import mergeSort from './mergesort.js';

class TreeNode {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
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
prettyPrint(myTree.root);
