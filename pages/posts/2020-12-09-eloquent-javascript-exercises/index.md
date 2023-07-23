---
slug: eloquent-javascript-exercises
title: "My solutions to exercises in 'Eloquent JavaScript'"
date: "2020-12-09"
published: true
---

*Last update: December 10th, 2020*

# Chapter 4: Data Structures: Objects and Arrays

## Exercise: Arrays and Lists

### Exercise Description

A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.

```js
let list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};
```

Write a function `arrayToList` that builds up a list structure like the one shown when given `[1,2,3]` as argument. Also write a `listToArray` function that produces an array from a list. Then add a helper function `prepend`, which takes an element and a list and creates a new list that adds the element to the front of the input list, and `nth`, which takes a list and a number and returns the element at the given position in the list (with zero refeerring to the first element) or `underfined` when there is no such element.


### My solution
[codepen](https://codepen.io/jessems/pen/OJRbKLg)

```js
function arrayToList(inputArray) {
	let list = {};
  if (inputArray.length > 0) {
      list = prepend(inputArray[0], arrayToList(inputArray.slice(1)));
  } else {
    return null;
  }
  return list;
}

function prepend(el, list) {
	return {value: el, rest: list};
}

console.log(arrayToList([1,3,5]))
// returns:
//
//  {
//  value:1,
//  rest: {
//      value:3,
//      rest: {
//          value:5,
//          rest:null
//          }
//      }
//  }

function listToArray(inputList) {
	currentArray = [inputList.value];
  if (inputList.rest) {
    currentArray = currentArray.concat(listToArray(inputList.rest));
  }
  return currentArray;
}

console.log(listToArray({value: 1, rest: {value: 2, rest: {value:3, rest: null}}}))

// returns:
// [1, 2, 3]

function nth(list, nr) {
	if (nr == 0) {
    return list.value
  } else {
  	return nth(list.rest, nr-1)
  }
}

console.log(nth({value: 1, rest: {value: 2, rest: {value:3, rest: null}}},1))

// returns:
// 2
```

## Exercise: Deep Comparison

### Exercise Description

Write a function `deepEqual` that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to `deepEqual`. 

To find out whether values should be compared directly (use the `===` for that) or have their properties compared, you can use the `typeof` operator. If it produces `"object"` for both values, you should do a deep comparison. But you have to take on silly exception into account: because of a historical accident, `typeof null` also produces `"object"`.

### My solution (WIP)
[codepen](https://codepen.io/jessems/pen/LYRbKqP)

```js
function deepEqual(first, second, indentation='') {
	if (typeof first === typeof second) {
		if (typeof first === "object") {
      if (first !== null) {
        firstKeys = Object.keys(first);
        secondKeys = Object.keys(second);
        if (firstKeys.length == secondKeys.length) {
          trackInequalities = [];
          for (i=0; i<=firstKeys.length-1; i++) {
            trackInequalities.push(deepEqual(first[firstKeys[i]],second[secondKeys[i]], '    '));
          }
          return !trackInequalities.includes(false)
        } else {
          // Different amount of keys
          return false;
        }  
      } else {
        // Both are null
        return true; 
      }
		} else {
			return first === second
		}
	} else {
		return false;
	}
}

function test(assertion, expected, actual) {
  console.log(assertion, expected === actual ? 'OK' : 'FAILED')
}

test('Shallow deepEqual with same identities should yield true', true, deepEqual(1,1))
test('Shallow deepEqual with different identities should yield false', false, deepEqual(1,2))
test('Deep deepEqual with same identities should yield true', true, deepEqual({value: 'test', rest: {value: 'test2', rest: null}}, {value: 'test', rest: {value: 'test2', rest: null}}))
test('Deep deepEqual with different identities should yield false', false, deepEqual({value: 'test', rest: {value: 'test2', rest: null}}, {value: 'test', rest: {value: 'diff', rest: null}}))
test('Deep deepEqual with identical objects containing arrays should yield true', true, deepEqual({value: 'test', rest: ['test', 'test2', 'test3']}, {value: 'test', rest: ['test', 'test2', 'test3']}))
```

# Chapter 5: Higher-Order Functions

## Exercise: Flattening

[codepen](https://codepen.io/jessems/pen/XWjMMRO)

Use the `reduce` method in combination with the `concat` method to "flatten" an array of arrays into a single array that has all the elements of the original arrays.

```js
function flatten(inputArray) {
  return inputArray.reduce((a,c) => {
    if(Array.isArray(c)) {
      return a.concat(flatten(c))
    } else {
      return a.concat(c);
    }
  }, [])
}

a = ['1', '2', ['3', ['4']]];

console.log(flatten(a)); // returns ["1, "2", "3", "4"]
```

## Exercise: Your own loop

[codepen](https://codepen.io/jessems/pen/XWjMMRO)

Write a higher-order function `loop` that provides something like a `for` loop statement. It takes a value, a test function, an update function, and a body function. Each iteration, it first runs the test function on the current loop value and stops if that returns false. Then it calls the body function, giving it the current value. Finally, it calls the update function to create a new value and starts from the beginning.

When defining the function, you can use a regular loops to do the actual looping.

```js
function loop(value, testFunction, updateFunction, bodyFunction) {
  console.log(value);
  for(i=value; testFunction(i); i=updateFunction(i)) {
    bodyFunction(i);
  }
}

loop(0, i=>i<=10, i=>++i, console.log); // Returns 1-10
```

## Exercise: Everything

[codepen](https://codepen.io/jessems/pen/XWjMMRO)

Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the `some` method.

```js
// Using a loop
function every(inputArray, predicate) {
  trackInequality = [];
  for (let el of inputArray) {
    if (!predicate(el)) {
      trackInequality.push(true)
    }
  }
  if (trackInequality.length > 0) {
    return false;
  } else {
    return true;
  }
}

console.log(every([1,2,3,4,5], x=>x<10)) // returns true
console.log(every([6,7,8,9,10], x=>x<10)) // returns false

// Using the some method
function everySome(inputArray, predicate) {
  return inputArray.some(predicate);
}

console.log(everySome([1,2,3,4,5], x=>x>=10)) // returns false
console.log(everySome([6,7,8,9,10], x=>x>=10)) // returns true
```

## Exercise: Dominant writing direction

[codepen](https://codepen.io/jessems/pen/XWjMMRO)

Write a function that computes the dominant writing direction in a string of text. Remember that each script object has a direction property that can be "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).

The dominant direction is the direction of a majority of the characters that have a script associated with them. The characterScript and countBy functions defined earlier in the chapter are probably useful here.


```js
function dominantDirection(text) {
  // Your code here.
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : 'none';
  }).filter(({name}) => name != 'none');
  let total = scripts.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No scripts found"
  
  if scripts.length == 0 return 'ltr';

  return scripts.reduce((a,b) => a.count > b.count ? a : b).name
  
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
```

# Chapter 6: The Secret Life of Objects

## Exercise: A Vector Type

Write a class `Vec` that represents a vector in two-dimensional space. It takes `x` and `y` parameters (numbers), which it should save to properties of the same name.

Give the `Vec` prototype two methods, `plus` and `minus`, that take another vector as a parameter and return a new vector that has the saum or difference of the two vectors' (`this` and the parameter) `x` and `y` values.

Add a getter property `length` to the prototype that computes the length of the vector–that is, the distance of the point `(x, y)` from the origin `(0,0)`.

```js
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  plus(vector) {
    let newVector = new Vec(vector.x + this.x, vector.y + this.y);
    return newVector;
  }
  
  minus(vector) {
    let newVector = new Vec(vector.x - this.x, vector.y - this.y);
    return newVector;
  }
  
  get length() {
    return Math.sqrt(this.x**2 + this.y**2);
  }
}

exampleVector = new Vec(5,7);

console.log(exampleVector.length); // returns 8.6023
console.log(exampleVector.plus(new Vec(5,3))); // returns {x: 10, y: 10}
```

## Exercise: Groups

Write a class called `Group` (since `Set` is already taken). Like `Set`, it has `add`, `delete`, and `has` methods. Its constructor creates an empty group, `add` adds a value to the group (but only if it isn't already a member), `delete` removes its argument from the group (if it was a member), and `has` returns a Boolean value indicating whether its argument is a member of the group.

Use the `===` operator, or something equivalent such as `indexOf`, to determine whether two values are the same.

Give the class a static `from` method that takes an iterable object as argument and creates a group that contains all the values produced by iterating over it.

```js
class Group {
  constructor() {
    this.group = [];
    return this;
  }
    
  add(value) {
    if (!this.has(value)) {
      this.group.push(value);
      return this;
    }
  }
  
  delete(value) {
    if (this.has(value)) {
      this.group = this.group.filter(x => x !== value)
      return this;
    }
  }
  
  has(value) {
    return this.group.includes(value)
  }
  
  from(iterableObject) {
    for (let value of iterableObject) {
      this.add(value);
    }
    return this;
  }
}
```

## Exercise: Iterable Groups

Make the `Group` class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren't clear on the exact form of the interface anymore.

```js
class GroupIterator {
  constructor(group) {
    this.x = 0;
    this.group = group.group;
  }
  
  next() {
    if (this.x === this.group.length) return {done: true};
    
    let value = this.group[this.x];
    this.x++
    
    return {value, done: false}
  }
}

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
}

for (let el of group.from([4,5,6])) {
  console.log(el); // Returns 4 \ 5 \ 6
}
```

## Exercise: Borrowing a Method

Can you think of a way to call `hasOwnProperty` on an object that has its own property by that name?

```js
class MyObject {
  constructor() {
  }
  
  hasOwnProperty(thisVarWillBeIgnored) {
    console.log("I do what I want");
  }
}

let myObject = new MyObject("hopeful");

myObject.hasOwnProperty('test'); // returns "I do what I want"
console.log(Object.hasOwnProperty.call(this,'test'));  // returns false
```

# Chapter 7

## Exercise: Measuring a Robot

[codepen](https://codepen.io/jessems/pen/yLapeoL)

Write a function `compareRobots` that takes two robots (and their starting memory). It should generate 100 tasks and let each of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.

```js
function compareRobots(robotOne, robotTwo) {
  robotOneResults = [];
  robotTwoResults = [];
  for (let i=0; i<100; i++) {
    let villageState = VillageState.random();
    robotOneResults.push(runRobot(villageState, robotOne, []));
    robotTwoResults.push(runRobot(villageState, robotTwo, []));
  }
  console.log(`Robot 1: ${getAverage(robotOneResults)}`);
  console.log(`Robot 2: ${getAverage(robotTwoResults)}`);
}

function getAverage(inputArray) {
  return inputArray.reduce((acc, c) => (acc + c)) / inputArray.length;
}

compareRobots(goalOrientedRobot, randomRobot); // See codepen or the book for the definition of these robots
// > Robot 1: 16.69
// > Robot 2: 92.04

```

## Exercise: Robot Efficiency

[codepen](https://codepen.io/jessems/pen/yLapeoL)

Can you write a robot that finishes the task faster than `goalOrientedRobot`? If you observe that robot's behavior, what obviously stupid thing does it do? How could those be improved?

### My Answer

Here's `goalOrientedRobot`:

```js
function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if(parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)}
}
```

One 'stupid' thing that `goalOrientedRobot` does is that when the route array is empty, it determines its next step based on the parcel with index `0` in the `parcels` array. It would probably be more efficient to, instead, determine which parcel is closest to the current location, and start with that one.

```js
function nearestParcelRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[getNearestParcelIndex(place, parcels)];
    if(parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)}
}


function getNearestParcelIndex(currentLocation, parcels) {
  let nearestParcelLocation = '';
  let shortestRouteSoFar = 99;
  let index = -1;
  for (let parcel of parcels) {
    index++;
    route = findRoute(roadGraph, currentLocation, parcel.place);
    if (route.length < shortestRouteSoFar) {
      shortestRouteSoFar = route.length;
      console.log(shortestRouteSoFar);
      indexForShortestRoute = index;
    }
  }
  return indexForShortestRoute;
}

compareRobots(goalOrientedRobot, nearestParcelRobot);
// > Robot 1: 17.44
// > Robot 2: 16.35
```

## Exercise: Persistent Group

```js
class PGroup {
  constructor(inputArray) {
    this.members = inputArray;
  }
  
  add(value) {
    if (this.has(value)) return this;
    return new PGroup([...this.members, value]);
  }
  
  delete(value) {
    if (!this.has(value)) return this;
    return new PGroup(this.members.filter(x => x !== value));
  }
  
  has(value) {
    return this.members.includes(value);
  }
  
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
```