import LinkedList from './linkedlist.js';

const list = new LinkedList();

console.log('appending values...');
list.append('dog');
list.append('cat');
list.append('parrot');
list.append('hamster');
list.append('snake');
list.append('turtle');

console.log(list.toString());

console.log('prepending values');
list.prepend('beaver');
list.prepend('rat');

console.log(list.toString());
console.log(`list size: ${list.getSize()}`);
console.log(`value at index 8 should be undefined: it returns ${list.at(8)}`);
console.log(`value at index 7 should be turtle: it returns ${list.at(7)}`);
console.log(`value at index 3 should be cat: it returns ${list.at(3)}`);

console.log(`checking is list contains gator: ${list.contains('gator')}`);
console.log(`checking is list contains hamster: ${list.contains('hamster')}`);

console.log(`finding index for gator: ${list.findIndex('gator')}`);
console.log(`finding index for turtle: ${list.findIndex('turtle')}`);
console.log(`finding index for cat: ${list.findIndex('cat')}`);

console.log('popping everything...');
while (list.getSize() > 0) {
	console.log(list.toString());
	list.pop();
}

list.append('raptor');
console.log(list.toString());
list.prepend('piglet');
console.log(list.toString());

console.log(`HEAD: ${list.head().value}`);
console.log(`TAIL: ${list.tail().value}`);
