/* Binary Tree Practice */

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

/* Depth First Search Algorithm */
/* Depth First Search use Stack */
/* Time Complexity O(n) and Space Complexity O(n) */

/* Non Recursive version you have create a 
new stack for using non itrative version */
const depthFirstSearch = (root) => {
  if (root === null) return [];

  const result = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    result.push(current.val);

    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }

  return result;
};

console.log("Depth First Search Itrative version");
console.log(depthFirstSearch(a));

/* Recursive Version you have don't need to create 
new stack insted you can use the javascript callstack for that*/
const depthFirstSearchRecur = (root) => {
  if (root === null) return [];

  const leftVal = depthFirstSearchRecur(root.left);
  const rightVal = depthFirstSearchRecur(root.right);

  return [root.val, ...leftVal, ...rightVal];
};

console.log("Depth First Search Recursive");
console.log(depthFirstSearchRecur(a));

/* Breath First Search Algorithm */
/* Breath First Search use Queue */
/* Time Complexity O(n) and Space Complexity O(n) */

/* Any Recursive code uses call stack under the hood and here the breath first search uses queue 
for that reason there is no staright forward way of using recursive terversal here*/
const breathFirstSearch = (root) => {
  if (root === null) return [];

  const values = [];
  const queue = [root];

  while (queue.length > 0) {
    const current = queue.shift();
    values.push(current.val);

    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }

  return values;
};

console.log("Breath First Search it have only itrative version");
console.log(breathFirstSearch(a));

/* Find a Node problem Tree include Problem */
/* Breath First Solution Itrative version */

const treeInclude_BFS = (root, target) => {
  if (root === null) return false;

  const queue = [root];
  while (queue.length > 0) {
    const current = queue.shift();
    if (current.val === target) return true;

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return false;
};

console.log("Tree Include Breath First Search Solution");
console.log(treeInclude_BFS(a, "e"));

/* Depth First Search Recursive Version */
const treeInclude_DFS = (root, target) => {
  if (root === null) return false; // this has to be check first if the root is null or empty tree
  if (root.val === target) return true;
  return (
    treeInclude_DFS(root.left, target) || treeInclude_DFS(root.right, target)
  );
};

console.log("Tree Include Depth First Search Solution - Recursive");
console.log(treeInclude_DFS(a, "e"));

/* Tree Sum Problem */

const _1 = new Node(3);
const _2 = new Node(11);
const _3 = new Node(4);
const _4 = new Node(5);
const _5 = new Node(7);
const _6 = new Node(12);

_1.left = _2;
_1.right = _3;
_2.left = _4;
_2.right = _5;
_3.right = _6;

/* Tree Sum problem with recursive solution */
const treeSum = (root) => {
  if (root === null) return 0; //base case
  return root.val + treeSum(root.left) + treeSum(root.right);
};

console.log("Tree Sum Recursive Version");
console.log(treeSum(_1));

/* Tree Sum problem with recursive solution */
/* This code works good but it is not the best design */
const treeSum_Itrative = (root) => {
  if (root === null) return 0; //base case

  let totalSum = 0;
  const queue = [root];
  while (queue.length > 0) {
    const current = queue.shift();
    totalSum += current.val;
    
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }
  return totalSum;
};

console.log("Tree Sum Itrative Version");
console.log(treeSum_Itrative(_1));

/* Find the minium value in the tree */

/* Itrative Value */
const treeMinValue_Itrative = (root) => {
  if (root === null) return Infinity; //base case
  let stack = [root];
  let minValue = Infinity;
  while (stack.length > 0) {
    const current = stack.pop();

    if (current.val < minValue) minValue = current.val;
    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);
  }
  return minValue;
}

console.log("Tree Min Value Itrative Version");
console.log(treeMinValue_Itrative(_1));

/* Recurcive Way */
const treeMinValue_Recursive = (root) => {
  if (root === null) return Infinity; //base case
  return Math.min(root.val, treeMinValue_Recursive(root.left), treeMinValue_Recursive(root.right));
}

console.log("Tree Min Value Recursive Version");
console.log(treeMinValue_Recursive(_1));


/* Max root to leaf path sum problem */
const maxPathSum = (root) => {
  if (root === null) return -Infinity; //base case
  if(root.left === null && root.right === null) return root.val; //base case
  const maxChildPathSum = Math.max(maxPathSum(root.left), maxPathSum(root.right));
  return maxChildPathSum + root.val;
}

console.log("Max Path Sum Recursive Version");
console.log(maxPathSum(_1));