/*
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


console.log(twoNumberSum([2, 0, -5, 25, 9, 10, -2, 15], 11))


