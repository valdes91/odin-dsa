function fibs(num) {
	// returns n fibonacci numbers
	const sequence = [];
	for (let i = 0; i < num; i++) {
		if (sequence.length < 2) {
			sequence.push(i);
		} else {
			sequence.push(sequence[i - 1] + sequence[i - 2]);
		}
	}

	return sequence;
}

function fibsRecursive(num) {
	if (num === 1) {
		return [0];
	} else if (num === 2) {
		return [0, 1];
	}

	return [
		...fibsRecursive(num - 1),
		fibsRecursive(num - 1)[num - 2] + fibsRecursive(num - 1)[num - 3],
	];
}

console.log(fibs(8));
console.log(fibsRecursive(8));
