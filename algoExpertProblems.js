/*
QUESTION 1: TWO NUMBER SUM - LEVEL: EASY
------------------------------------------
Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. If any two numbers in the input array sum up to the target sum, the funtion should return them in an array, in sorted order. If not, the funtion should rturn an empty array. Assume that there will be at most one pair of numbers summing to the target sum.
*/
// SOLUTION #1 - least optimal
function twoNumberSum(array, targetSum) {
  array.sort((num1, num2) => num1 - num2);
  for (let left = 0; left < array.length; left++){
    for (let right = array.length - 1; right > left; right--){
      if (array[left] + array[right] === targetSum) return [array[left], array[right]]
      else if (array[left] + array[right] > targetSum) continue
      else break;
    }
  }
  return [];
}

// SOLUTION #2 - pointer implementation: O(nlog(n)) time || O(1) space
function twoNumberSum(array, targetSum) {
  array.sort((num1, num2) => num1 - num2);
  let leftPointer = 0;
  let rightPointer = array.length - 1;
  while (leftPointer !== rightPointer) {
    if (array[leftPointer] + array[rightPointer] > targetSum) rightPointer--;
    else if (array[leftPointer] + array[rightPointer] < targetSum) leftPointer++;
    else return [array[leftPointer], array[rightPointer]];
  }
  return [];
}

// SOLUTION #3 - "hash table" implementation: O(n) time || O(n) space
function twoNumberSum(array, targetSum) {
  const numStorage = {};
  let requiredNum = 0;
  for (let i = 0; i < array.length; i++){
    requiredNum = targetSum - array[i];
    if (requiredNum in numStorage) {
      return [requiredNum, array[i]].sort((num1, num2) => num1 - num2)
    } else {
      numStorage[array[i]] = true;
    }
  }
  return [];
}

/*
QUESTION 2: FIND CLOSEST VALUE IN BST - LEVEL: EASY
----------------------------------------------------
Given a BST data structure consisiting of BST nodes and a target integer value, write a function that finds the closest value to that target value contained in the BST
*/

// SOLUTION 1 - iterative solution:
// average case: O(log(n) time || O(1) space
// worst case: O(n) time || O(1) space
function findClosestValueInBst(tree, target) {
  let closestValue = tree.value;
  if (closestValue === target) return closestValue;
  let direction = (target < tree.value) ? 'left' : 'right';


  while(tree[direction]){
    tree = tree[direction];
    closestValue = Math.abs(closestValue - target) < Math.abs(tree.value - target) ? closestValue : tree.value;
    if (closestValue === target) return closestValue;
    direction = (target < tree.value) ? 'left' : 'right';
  }
  return closestValue;
}

// SOLUTION 2 - recursive solution:
// average case: O(log(n)) time || O(log(n)) space
// worst case: O(n) time || O(n) space - when BST is essentially a linked list
let closestValue = Infinity;
function findClosestValueInBst(tree, target){
  closestValue = Math.abs(target - tree.value) < Math.abs(target - closestValue) ? tree.value : closestValue;
  let direction = (target < tree.value) ? 'left' : 'right';

  if (!tree[direction]){
    return closestValue;
  }
  return findClosestValueInBst(tree[direction], target);
}


/*
QUESTION 3: DEPTH-FIRST- SEARCH - LEVEL: EASY
----------------------------------------------------
Implement the depthFirstSearch method on the Node class, which takes in an empty array, traverses the tree using the Depth-first Search approach, stores all the Nodes' names in the input array , and returns it
*/

class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  addChild(name) {
    this.children.push(new Node(name));
    return this;
  }

  depthFirstSearch(array) {
    array.push(this.name);
    if (!this.children.length) {
      return array;
    } else {
      for (let i = 0; i < this.children.length; i++){
        (this.children[i]).depthFirstSearch(array)
      }
    }
    return array;
  }
}


/*
QUESTION 4: NTH FIBONACCI - LEVEL: EASY
----------------------------------------------------
Write a function that takes in an integer n and returns the nth Fibonacci number
Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13
*/

// SOLUTION 1 - recursive solution & no memoization:
// average case:  O(2^n) time ||  O(n) space

function fibonacci(n) {
  if (n === 1 || n === 2) return n - 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// SOLUTION 2 - recursive solution with memoization:
// average case:  O(n) time ||  O(n) space
function fibonacci(n, memoizationObj = {}) {
  if (n in memoizationObj) return memoizationObj[n];
  else if (n === 1 || n === 2) return n - 1;
  else {
    memoizationObj[n] = fibonacci(n - 1, memoizationObj) + fibonacci(n - 2, memoizationObj);
    return memoizationObj[n];
  }
}

// SOLUTION 3 - iterative solution with memoization
// average case: O(n) time || O(space

function fibonacci(n) {
  let memoizationObj = {1: 0, 2: 1};
  for (let i = 3; i <= n; i++){
    memoizationObj[i] = memoizationObj[i - 1] + memoizationObj[i - 2];
  }
  return memoizationObj[n];
}

// function fibonacci(n) {
//   const lastTwo = [0, 1];
//   for (let i = 3; i < n; i++){
//     lastTwo[0] = lastTwo[0] + lastTwo[1];
//   }
//   return lastTwo[0] + lastTwo[1];
// }

// fibonacci(6);
