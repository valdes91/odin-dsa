function mergeSort(array) {
	//base case: array is length 1
	if (array.length <= 1) return array;
	else {
		// sort the left and right arrays
		const midPoint = Math.floor(array.length / 2);
		const leftSide = mergeSort(array.slice(0, midPoint));
		const rightSide = mergeSort(array.slice(midPoint));
		// once we get here, its time to merge both sides
		return merge(leftSide, rightSide);
	}
}

function merge(leftArr, rightArr) {
	let leftIndex = 0;
	let rightIndex = 0;
	const sortedArr = [];

	while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
		if (leftArr[leftIndex] <= rightArr[rightIndex]) {
			sortedArr.push(leftArr[leftIndex]);
			leftIndex++;
		} else {
			sortedArr.push(rightArr[rightIndex]);
			rightIndex++;
		}
	}

	while (leftIndex < leftArr.length) {
		sortedArr.push(leftArr[leftIndex]);
		leftIndex++;
	}

	while (rightIndex < rightArr.length) {
		sortedArr.push(rightArr[rightIndex]);
		rightIndex++;
	}

	return sortedArr;
}

console.log(mergeSort([]));
console.log(mergeSort([73]));
console.log(mergeSort([1, 2, 3, 4, 5]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));
