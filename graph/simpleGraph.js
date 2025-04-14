class Graph {
    constructor() {
        this.node = {};
    }

    addNode(node) {
        this.node[node] = [];
    }

    addEdge(fromVertex, toVertex) {
        if (!this.node[fromVertex] || !this.node[toVertex]) {
            console.log('Vertex does not exist');
            return;
        }
        this.node[fromVertex].push(toVertex);
        this.node[toVertex].push(fromVertex);
    }

    getNeighbors(node) {
        if (!this.node[node]) {
            console.log('Vertex does not exist');
            return;
        }
        return this.node[node];
    }

    getGraph() {
        return this.node;
    }

    removeNode(node) {
        if (!this.node[node]) {
            console.log('Vertex does not exist');
            return;
        }
        delete this.node[node];
        // Remove all edges connected to the node
        Object.keys(this.node).forEach((key) => {
            const neighbors = this.node[key];
            const index = neighbors.indexOf(node);
            if (index !== -1) neighbors.splice(index, 1);
        });
    }

    removeEdge(fromVertex, toVertex) {
        if (!this.node[fromVertex] || !this.node[toVertex]) {
            console.log('Vertex does not exist');
            return;
        }

        const fromIndex = this.node[fromVertex].indexOf(toVertex);
        const toIndex = this.node[toVertex].indexOf(fromVertex);
        if (fromIndex !== -1) this.node[fromVertex].splice(fromIndex, 1);
        if (toIndex !== -1) this.node[toVertex].splice(toIndex, 1);
    }
}