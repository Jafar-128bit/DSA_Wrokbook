class Node {
  constructor(nodeId) {
    this.nodeId = nodeId;
    this.value = null;
    this.childNodes = {};
  }
}

class Tree {
  constructor() {
    this.headNode = null;
  }

  addNode(value, childNodeId, parentNodeId = null) {
    const newNode = new Node(childNodeId);
    newNode.value = value;

    if (!this.headNode) this.headNode = newNode;
    else if (this.headNode.nodeId === parentNodeId) this.headNode.childNodes[childNodeId] = newNode;
    else {
      const parentNode = this.findNode(this.headNode, parentNodeId);
      if (parentNode) parentNode.childNodes[childNodeId] = newNode;
      else console.error(`Parent node with ID ${parentNodeId} not found.`);
    }
  }

  findNode(currentNode, nodeId) {
    if (!currentNode) return null;
    if (currentNode.nodeId === nodeId) return currentNode;

    for (let childId in currentNode.childNodes) {
      const foundNode = this.findNode(currentNode.childNodes[childId], nodeId);
      if (foundNode) return foundNode;
    }
    return null;
  }

  removeNode(nodeId, parentNodeId = null) {
    if (!this.headNode) return;

    if (this.headNode.nodeId === nodeId) this.headNode = null;
    else {
      const parentNode = this.findNode(this.headNode, parentNodeId);
      if (parentNode && parentNode.childNodes[nodeId]) delete parentNode.childNodes[nodeId];
      else console.error(`Node with ID ${nodeId} not found under parent with ID ${parentNodeId}.`);
    }
  }

  editNode(nodeId, newValue) {
    const node = this.findNode(this.headNode, nodeId);
    if (node) node.value = newValue;
    else console.error(`Node with ID ${nodeId} not found.`);
  }

  getTree() {
    return JSON.stringify(this.headNode, null, 2);
  }
}

const tree = new Tree();

tree.addNode(0.0255, "A");
tree.addNode(0.2164, "B", "A");
tree.addNode(0.2516, "C", "A");
tree.addNode(0.2684, "D", "A");
tree.addNode(0.1265, "E", "A");
tree.addNode(0.0121, "F", "E");

console.log(tree.getTree());
