//This class represents the single local node in the linked list
class singly_type_local_node {
    constructor(data, nodeId) {
        this.nodeId = nodeId;// Id of a Node
        this.data = data; //Data stored in the Node
        this.next = null; //Reference to the next Node
    }
}

class doubly_type_local_node {
    constructor(data, nodeId) {
        this.nodeId = nodeId;// Id of a Node
        this.data = data; //Data store in the Node
        this.prev = null; //Reference to the previous Node
        this.next = null; //Reference to the next Node
    }
}

module.exports = {singly_type_local_node, doubly_type_local_node}