class Node {
    constructor(data) {
        this.data = data;
        this.connections = new Set();
    }
}

class WeightList {
    constructor() {
        this.weightList = {};
        this.maxOrderCount = 0;
    }

    addConnection(node1, node2) {
        const connectionKey = this._createConnectionKey(node1, node2);
        if (!this.weightList[connectionKey]) {
            this.weightList[connectionKey] = {
                nodeConnection: [node1, node2],
                orderCount: 0,
                weight: 0,
            };
        }
    }

    addWeight(node1, node2, orderCount) {
        const connectionKey = this._createConnectionKey(node1, node2);
        const connection = this.weightList[connectionKey];
        connection.orderCount = orderCount;

        if (orderCount > this.maxOrderCount) {
            this.maxOrderCount = orderCount;
        }

        this._updateWeights();
    }

    _updateWeights() {
        if (this.maxOrderCount === 0) return; // Avoid division by zero

        Object.values(this.weightList).forEach(item => {
            item.weight = (item.orderCount / this.maxOrderCount).toFixed(4);
        });
    }

    deleteConnection(node1, node2) {
        const connectionKey = this._createConnectionKey(node1, node2);
        if (this.weightList[connectionKey]) {
            const connection = this.weightList[connectionKey];
            delete this.weightList[connectionKey];
            if (connection.orderCount === this.maxOrderCount) {
                // Recalculate maxOrderCount
                this.maxOrderCount = Math.max(...Object.values(this.weightList).map(item => item.orderCount), 0);
                this._updateWeights();
            }
        }
    }

    getWeightList() {
        return this.weightList;
    }

    _createConnectionKey(node1, node2) {
        return [node1, node2].sort().join('-');
    }
}

class Graph {
    constructor() {
        this.structure = {};
    }

    addNode(data, nodeName, weight) {
        if (this.structure[nodeName]) {
            console.log('Node already exists!');
            return;
        }

        const newNode = new Node(data);
        this.structure[nodeName] = newNode;

        // Automatically connect to all existing nodes
        for (const existingNodeName in this.structure) {
            if (existingNodeName !== nodeName) {
                this.addEdge(nodeName, existingNodeName);
                weight.addConnection(nodeName, existingNodeName);
            }
        }
    }

    addEdge(fromVertex, toVertex) {
        if (!this.structure[fromVertex] || !this.structure[toVertex]) {
            console.log('One or both vertices do not exist!');
            return;
        }

        this.structure[fromVertex].connections.add(toVertex);
        this.structure[toVertex].connections.add(fromVertex);
    }

    getNeighbors(nodeName) {
        if (!this.structure[nodeName]) {
            console.log('Vertex does not exist!');
            return;
        }
        return Array.from(this.structure[nodeName].connections);
    }

    getGraph() {
        return this.structure;
    }

    removeNode(nodeName, weight) {
        if (!this.structure[nodeName]) {
            console.log("Vertex does not exist!");
            return;
        }
        const connectedNodes = Array.from(this.structure[nodeName].connections);
        connectedNodes.forEach(connectedNode => {
            this.removeEdge(nodeName, connectedNode);
            weight.deleteConnection(nodeName, connectedNode);
        });

        delete this.structure[nodeName];
    }

    removeEdge(fromVertex, toVertex) {
        if (!this.structure[fromVertex] || !this.structure[toVertex]) {
            console.log('One or both vertices do not exist!');
            return;
        }

        this.structure[fromVertex].connections.delete(toVertex);
        this.structure[toVertex].connections.delete(fromVertex);
    }
}



// Example Usage
const graph = new Graph();
const weight = new WeightList();

// Create 10 nodes with example data
graph.addNode('Data for A', 'A', weight);
graph.addNode('Data for B', 'B', weight);
graph.addNode('Data for C', 'C', weight);
graph.addNode('Data for D', 'D', weight);
graph.addNode('Data for E', 'E', weight);

// graph.addNode('Data for F', 'F', weight);
// graph.addNode('Data for G', 'G', weight);
// graph.addNode('Data for H', 'H', weight);
// graph.addNode('Data for I', 'I', weight);
// graph.addNode('Data for J', 'J', weight);

// Display neighbors for each node
// console.log(graph.getNeighbors('A'));
// console.log(graph.getNeighbors('B'));
// console.log(graph.getNeighbors('C'));
// console.log(graph.getNeighbors('D'));
// console.log(graph.getNeighbors('E'));
// console.log(graph.getNeighbors('F'));
// console.log(graph.getNeighbors('G'));
// console.log(graph.getNeighbors('H'));
// console.log(graph.getNeighbors('I'));
// console.log(graph.getNeighbors('J'));

// Display the entire graph structure
console.log(graph.getGraph());

weight.addWeight('A', 'B', 12);
weight.addWeight('A', 'C', 5);
weight.addWeight('B', 'C', 2);
weight.addWeight('A', 'D', 9);
weight.addWeight('B', 'D', 3);
weight.addWeight('C', 'D', 7);
weight.addWeight('A', 'E', 8);
weight.addWeight('B', 'E', 21);
weight.addWeight('C', 'E', 15);
weight.addWeight('D', 'E', 19);

// Display the weight list
console.log(weight.getWeightList());

