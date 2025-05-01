/* Graph Data Structures and Algorithms */
/* A graph is a collection of nodes (vertices) and edges (connections between nodes). */
/* There are two types of graphs: Directed Graphs (edges have direction) and Undirected Graphs (edges have no direction). */
/* Graphs are non-linear data structures commonly used to represent networks like social networks, road maps, etc. */

const graph = {
    a: ['c', 'b'], // Node 'a' is connected to 'c' and 'b'
    b: ['d'],      // Node 'b' is connected to 'd'
    c: ['e'],      // Node 'c' is connected to 'e'
    d: ['f'],      // Node 'd' is connected to 'f'
    e: [],         // Node 'e' has no connections
    f: []          // Node 'f' has no connections
};

/* Depth First Search (DFS) explores as far as possible along each branch before backtracking. */
/* DFS can be implemented iteratively or recursively. */

/* Iterative DFS uses a custom stack to store nodes for traversal. */
const depthFirstPrintITR = (graph, source) => {
    const stack = [source]; // Initialize stack with the source node

    while (stack.length > 0) {
        const current = stack.pop(); // Remove the last node from the stack
        console.log(current); // Print the current node
        for (let neighbor of graph[current]) {
            stack.push(neighbor); // Add neighbors to the stack
        }
    }
};
console.log("Depth First Search Iterative");
depthFirstPrintITR(graph, 'a');

/* Recursive DFS uses the call stack to store nodes for traversal. */
const depthFirstPrintREC = (graph, source) => {
    if (source === undefined) return; // Base case: if source is undefined, return

    console.log(source); // Print the current node
    for (let neighbor of graph[source]) {
        depthFirstPrintREC(graph, neighbor); // Recursively visit neighbors
    }
};
console.log("Depth First Search Recursive");
depthFirstPrintREC(graph, 'a');

/* Breadth First Search (BFS) explores all neighbors of a node before moving to the next level. */
/* BFS is typically implemented iteratively using a queue. */
const breadthFirstPrint = (graph, source) => {
    const queue = [source]; // Initialize queue with the source node

    while (queue.length > 0) {
        const current = queue.shift(); // Remove the first node from the queue
        console.log(current); // Print the current node
        for (let neighbor of graph[current]) {
            queue.push(neighbor); // Add neighbors to the queue
        }
    }
};

console.log("Breadth First Search Iterative");
breadthFirstPrint(graph, 'a');

/* Has Path Problem: Determine if there is a path between two nodes in a graph. */
/* Time Complexity: O(e) where e is the number of edges. */
/* Space Complexity: O(n) where n is the number of nodes. */

const graph1 = {
    f: ['g', 'i'], // Node 'f' is connected to 'g' and 'i'
    g: ['h'],      // Node 'g' is connected to 'h'
    h: [],         // Node 'h' has no connections
    i: ['g', 'k'], // Node 'i' is connected to 'g' and 'k'
    j: ['i'],      // Node 'j' is connected to 'i'
    k: []          // Node 'k' has no connections
};

/* Recursive solution for the Has Path Problem. */
const hasPathREC = (graph, source, destination) => {
    if (source === destination) return true; // Base case: source equals destination
    if (!graph[source]) return false; // If source does not exist in the graph, return false

    for (let neighbor of graph[source]) {
        if (hasPathREC(graph, neighbor, destination) === true) return true; // Recursively check neighbors
    }
    return false;
};

console.log("Has Path Recursive");
console.log(hasPathREC(graph1, 'f', 'k')); // Check if there is a path from 'f' to 'k'

/* Iterative solution for the Has Path Problem using BFS. */
const hasPathITR = (graph, source, destination) => {
    const queue = [source]; // Initialize queue with the source node

    while (queue.length > 0) {
        const current = queue.shift(); // Remove the first node from the queue
        if (current === destination) return true; // If current node is the destination, return true
        for (let neighbor of graph[current]) {
            queue.push(neighbor); // Add neighbors to the queue
        }
    }
    return false;
};

console.log("Has Path Iterative");
console.log(hasPathITR(graph1, 'f', 'k')); // Check if there is a path from 'f' to 'k'

/* Build Graph: Convert an array of edges into an adjacency list representation of a graph. */
const edges1 = [
    ['i', 'j'], // Edge between 'i' and 'j'
    ['k', 'i'], // Edge between 'k' and 'i'
    ['m', 'k'], // Edge between 'm' and 'k'
    ['k', 'l'], // Edge between 'k' and 'l'
    ['o', 'n'], // Edge between 'o' and 'n'
];

const buildGraph = (edges) => {
    const graph = {};

    for (let edge of edges) {
        const [a, b] = edge; // Destructure edge into nodes 'a' and 'b'
        if (!(a in graph)) graph[a] = []; // Initialize adjacency list for 'a' if not present
        if (!(b in graph)) graph[b] = []; // Initialize adjacency list for 'b' if not present
        graph[a].push(b); // Add 'b' to 'a's adjacency list
        graph[b].push(a); // Add 'a' to 'b's adjacency list (undirected graph)
    }

    return graph;
};

console.log("Graph Build from Edges");
const graph2 = buildGraph(edges1); // Build graph from edges
console.log(graph2);

/* Recursive solution for the Has Path Problem in an undirected graph. */
const visitedNode = new Set(); // Set to keep track of visited nodes

const hasPath_undirectedGraph_Recursive = (graph, source, destination, visited) => {
    if (source === destination) return true; // Base case: source equals destination
    if (!graph[source]) return false; // If source does not exist in the graph, return false
    if (visited.has(source)) return false; // If source is already visited, return false

    visited.add(source); // Mark the source as visited

    for (let neighbor of graph[source]) {
        if (hasPath_undirectedGraph_Recursive(graph, neighbor, destination, visited) === true) return true; // Recursively check neighbors
    }
    return false;
};

/* Check if there is a path between two nodes in an undirected graph. */
const undirectedGraph = (edges, nodeA, nodeB) => {
    const graph = buildGraph(edges); // Build graph from edges
    return hasPath_undirectedGraph_Recursive(graph, nodeA, nodeB, visitedNode); // Check for path
};

console.log("Visited Node Set", visitedNode); // Print visited nodes
console.log("Undirected Graph Path Check");
console.log(undirectedGraph(edges1, 'i', 'l')); // Check if there is a path from 'i' to 'l'