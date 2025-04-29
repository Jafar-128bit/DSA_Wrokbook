/* Graph Data Structues and Algorithms */
/* Two types of graph Directed Graph and Un-Directed Graph */
/* Graph is a collection of nodes and edges */
/* Graph is a non-linear data structure */

const graph = {
    a: ['c', 'b'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
}
/* Depth First Search follows a direction throught out the search */

/* Depth First Search - Itrative method uses a custom stack to store nodes */
const depthFirstPrintITR = (graph, source) => {
    const stack = [source];

    while(stack.length > 0) {
        const current = stack.pop();
        console.log(current);
        for (let neighbor of graph[current]) {
            stack.push(neighbor);
        }
    }
}
console.log("Depth Firs Search Iterative");
depthFirstPrintITR(graph, 'a');


/* Depth First Search - Recursive method uses a callstack to store nodes */
const depthFirstPrintREC = (graph, source) => {
    if (source === undefined) return;

    console.log(source);
    for (let neighbor of graph[source]) {
        depthFirstPrintREC(graph, neighbor);
    }
}
console.log("Depth Firs Search Recursive");
depthFirstPrintREC(graph, 'a');

/* Breath First Search check in all the direction of the graph */
/* Breath First Search -  Uses Queue it is better to use it with in Itrative method only */
const breadthFirstPrint = (graph, source) => {
    const queue = [source];

    while(queue.length > 0) {
        const current = queue.shift();
        console.log(current);
        for (let neighbor of graph[current]) {
            queue.push(neighbor);
        }
    }
}

console.log("Breath First Search Iterative");
breadthFirstPrint(graph, 'a');