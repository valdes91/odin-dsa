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

	const sequence = fibsRecursive(num - 1);
	sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
	return sequence;
}

console.log(fibs(8));
console.log(fibsRecursive(8));
