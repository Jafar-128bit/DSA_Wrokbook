/* Binary Tree Practice */

// Define a Node class to represent each node in the binary tree
class Node {
  constructor(val) {
    this.val = val; // Value of the node
    this.left = null; // Pointer to the left child
    this.right = null; // Pointer to the right child
  }
}

// Create nodes for the binary tree
const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

// Build the binary tree structure
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

/* Depth First Search (DFS) Algorithm */
/* DFS uses a stack (explicit or implicit) to traverse the tree */
/* Time Complexity: O(n), Space Complexity: O(n) */

// Iterative version of DFS using an explicit stack
const depthFirstSearch = (root) => {
  if (root === null) return []; // If the tree is empty, return an empty array

  const result = []; // Array to store the traversal result
  const stack = [root]; // Initialize the stack with the root node
  while (stack.length > 0) {
    const current = stack.pop(); // Remove the top node from the stack
    result.push(current.val); // Add the node's value to the result

    // Push the right child first so that the left child is processed first
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }

  return result;
};

console.log("Depth First Search Iterative version");
console.log(depthFirstSearch(a));

// Recursive version of DFS using the call stack
const depthFirstSearchRecur = (root) => {
  if (root === null) return []; // Base case: if the tree is empty, return an empty array

  // Recursively traverse the left and right subtrees
  const leftVal = depthFirstSearchRecur(root.left);
  const rightVal = depthFirstSearchRecur(root.right);

  // Combine the current node's value with the left and right subtree values
  return [root.val, ...leftVal, ...rightVal];
};

console.log("Depth First Search Recursive");
console.log(depthFirstSearchRecur(a));

/* Breadth First Search (BFS) Algorithm */
/* BFS uses a queue to traverse the tree level by level */
/* Time Complexity: O(n), Space Complexity: O(n) */

// Iterative version of BFS using a queue
const breathFirstSearch = (root) => {
  if (root === null) return []; // If the tree is empty, return an empty array

  const values = []; // Array to store the traversal result
  const queue = [root]; // Initialize the queue with the root node

  while (queue.length > 0) {
    const current = queue.shift(); // Remove the front node from the queue
    values.push(current.val); // Add the node's value to the result

    // Add the left and right children to the queue (if they exist)
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }

  return values;
};

console.log("Breadth First Search (Iterative version only)");
console.log(breathFirstSearch(a));

/* Check if a tree includes a target value */
/* BFS Iterative version */
const treeInclude_BFS = (root, target) => {
  if (root === null) return false; // If the tree is empty, return false

  const queue = [root]; // Initialize the queue with the root node
  while (queue.length > 0) {
    const current = queue.shift(); // Remove the front node from the queue
    if (current.val === target) return true; // If the target is found, return true

    // Add the left and right children to the queue (if they exist)
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return false; // If the target is not found, return false
};

console.log("Tree Include (BFS Solution)");
console.log(treeInclude_BFS(a, "e"));

/* DFS Recursive version to check if a tree includes a target value */
const treeInclude_DFS = (root, target) => {
  if (root === null) return false; // Base case: if the tree is empty, return false
  if (root.val === target) return true; // If the target is found, return true

  // Recursively check the left and right subtrees
  return (
    treeInclude_DFS(root.left, target) || treeInclude_DFS(root.right, target)
  );
};

console.log("Tree Include (DFS Solution - Recursive)");
console.log(treeInclude_DFS(a, "e"));

/* Tree Sum Problem */
/* Calculate the sum of all node values in the tree */

// Create a new tree with numeric values
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

// Recursive solution for tree sum
const treeSum = (root) => {
  if (root === null) return 0; // Base case: if the tree is empty, return 0

  // Sum the current node's value with the left and right subtree sums
  return root.val + treeSum(root.left) + treeSum(root.right);
};

console.log("Tree Sum (Recursive Version)");
console.log(treeSum(_1));

// Iterative solution for tree sum using a queue
const treeSum_Itrative = (root) => {
  if (root === null) return 0; // Base case: if the tree is empty, return 0

  let totalSum = 0; // Initialize the total sum
  const queue = [root]; // Initialize the queue with the root node
  while (queue.length > 0) {
    const current = queue.shift(); // Remove the front node from the queue
    totalSum += current.val; // Add the node's value to the total sum

    // Add the left and right children to the queue (if they exist)
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }
  return totalSum;
};

console.log("Tree Sum (Iterative Version)");
console.log(treeSum_Itrative(_1));

/* Find the minimum value in the tree */

// Iterative solution to find the minimum value
const treeMinValue_Itrative = (root) => {
  if (root === null) return Infinity; // Base case: if the tree is empty, return Infinity

  let stack = [root]; // Initialize the stack with the root node
  let minValue = Infinity; // Initialize the minimum value to Infinity
  while (stack.length > 0) {
    const current = stack.pop(); // Remove the top node from the stack

    // Update the minimum value if the current node's value is smaller
    if (current.val < minValue) minValue = current.val;

    // Add the left and right children to the stack (if they exist)
    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);
  }
  return minValue;
};

console.log("Tree Min Value (Iterative Version)");
console.log(treeMinValue_Itrative(_1));

// Recursive solution to find the minimum value
const treeMinValue_Recursive = (root) => {
  if (root === null) return Infinity; // Base case: if the tree is empty, return Infinity

  // Find the minimum value among the current node, left subtree, and right subtree
  return Math.min(
    root.val,
    treeMinValue_Recursive(root.left),
    treeMinValue_Recursive(root.right)
  );
};

console.log("Tree Min Value (Recursive Version)");
console.log(treeMinValue_Recursive(_1));

/* Find the maximum root-to-leaf path sum */

// Recursive solution to find the maximum root-to-leaf path sum
const maxPathSum = (root) => {
  if (root === null) return -Infinity; // Base case: if the tree is empty, return -Infinity
  if (root.left === null && root.right === null) return root.val; // If it's a leaf node, return its value

  // Find the maximum path sum of the left and right subtrees
  const maxChildPathSum = Math.max(
    maxPathSum(root.left),
    maxPathSum(root.right)
  );

  // Add the current node's value to the maximum child path sum
  return maxChildPathSum + root.val;
};

console.log("Max Path Sum (Recursive Version)");
console.log(maxPathSum(_1));