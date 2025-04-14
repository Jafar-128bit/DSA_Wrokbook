//This class represents the single foreign node in the linked list
class singly_type_foreign_node {
   constructor(data, foreignNodePrev, foreignNodeNext) {
       this.nodeId = null;
       this.data = data; //Data stored in the Node
       this.next = null; //Reference to the next Node
       this.foreign_next = foreignNodeNext; //Reference to the Next foreign Node
   }
}

class doubly_type_foreign_Node {
    constructor(data, foreignNodePrev, foreignNodeNext) {
        this.nodeId = null;
        this.data = data; //Data stored in the Node
        this.prev = null; //Reference to the previous Node
        this.next = null; //Reference to the next Node
        this.foreign_prev = foreignNodePrev; //Reference to the Previous foreign Node
        this.foreign_next = foreignNodeNext; //Reference to the Next foreign Node
    }
}

module.exports = {singly_type_foreign_node, doubly_type_foreign_Node};