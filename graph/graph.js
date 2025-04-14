class Node {
    constructor(data) {
        this.data = data;
        this.connections = [];
    }
}

class Graph {
    constructor() {
        this.structure = {};
    }

    addNode(data, nodeName) {
        if (this.structure[nodeName]) {
            console.log('Node already exists!');
            return;
        }
        const newNode = new Node(data);
        this.structure[nodeName] = newNode;
    }

    addEdge(fromVertex, toVertex) {
        if (!this.structure[fromVertex] || !this.structure[toVertex]) {
            console.log('One or both vertices do not exist!');
            return;
        }

        if (!this.structure[fromVertex].connections.includes(toVertex)) {
            this.structure[fromVertex].connections.push(toVertex);
        }
        if (!this.structure[toVertex].connections.includes(fromVertex)) {
            this.structure[toVertex].connections.push(fromVertex);
        }
    }

    getNeighbors(nodeName) {
        if (!this.structure[nodeName]) {
            console.log('Vertex does not exist!');
            return;
        }
        return this.structure[nodeName].connections;
    }

    getGraph() {
        return this.structure;
    }

    removeNode(nodeName) {
        if (!this.structure[nodeName]) {
            console.log("Vertex does not exist!");
            return;
        }
        delete this.structure[nodeName];
        Object.keys(this.structure).forEach(key => {
            const neighbors = this.structure[key];
            const index = neighbors.connections.indexOf(nodeName);
            if (index !== -1) neighbors.connections.splice(index, 1);
        });
    }

    removeEdge(fromVertex, toVertex) {
        if (!this.structure[fromVertex] || !this.structure[toVertex]) {
            console.log('One or both vertices do not exist!');
            return;
        }

        const fromIndex = this.structure[fromVertex].connections.indexOf(toVertex);
        const toIndex = this.structure[toVertex].connections.indexOf(fromVertex);
        if (fromIndex !== -1) this.structure[fromVertex].connections.splice(fromIndex, 1);
        if (toIndex !== -1) this.structure[toVertex].connections.splice(toIndex, 1);
    }
}

// Example Usage
const graph = new Graph();

graph.addNode('Data for A', 'A');
graph.addNode('Data for B', 'B');
graph.addNode('Data for C', 'C');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');

console.log(graph.getNeighbors('A')); // Output: ['B', 'C']
console.log(graph.getNeighbors('B')); // Output: ['A', 'C']
console.log(graph.getNeighbors('C')); // Output: ['A', 'B']

console.log(graph.getGraph()); // Output: Complete structure of the graph

graph.removeEdge('A', 'B');
console.log(graph.getNeighbors('A')); // Output: ['C']
console.log(graph.getNeighbors('B')); // Output: ['C']

graph.removeNode('C');
console.log(graph.getGraph()); // Output: Graph structure without node 'C'