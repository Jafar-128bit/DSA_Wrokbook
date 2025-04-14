//This class represents the single node in the doubly linked list
class Local_Node {
    constructor(data) {
        this.nodeId = null;
        this.data = data; //Data stored in the Local_Node
        this.prev = null; //Reference to the previous Node
        this.next = null; //Reference to the next Node
    }
}

class Foreign_Node {
    constructor(data, foreignNodePrev, foreignNodeNext) {
        this.nodeId = null;
        this.data = data; //Data stored in the Local_Node
        this.prev = null; //Reference to the previous Node
        this.next = null; //Reference to the next Node
        this.foreign_prev = foreignNodePrev; //Reference to the Previous foreign Node
        this.foreign_next = foreignNodeNext; //Reference to the Next foreign Node
    }
}

//This class represents the doubly linked list
class Doubly_Linked_List {
    constructor() {
        this.head = null;
        this.tail = null;
        this.idCount = 0;
        //Making this function private it will only be accessible with the constructor scope
        this.node_id_generator = () => {
            let idString = ``;
            if (this.idCount <= 9) idString = `0x00${this.idCount}`;
            else if (this.idCount >= 10) idString = `0x0${this.idCount}`;
            else if (this.idCount >= 100) idString = `0x${this.idCount}`;
            this.idCount++;
            return idString;
        }
    }

    //Inserting data to the end of the linked list
    append(data) {
        const newNode = new Local_Node(data);
        newNode.nodeId = this.node_id_generator();
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    //Inserting data to the end of the Linked List with Foreign Nodes
    advance_append(data, nodeType = "local") {
        if (nodeType === "local") {
            const newNode = new Local_Node(data);
            newNode.nodeId = this.node_id_generator();
            if (!this.head) {
                this.head = newNode;
                this.tail = newNode;
            } else {
                newNode.prev = this.tail;
                this.tail.next = newNode;
                this.tail = newNode;
            }
        } else if (nodeType === "foreign") {
            const newForeignNode = new Foreign_Node(data,null, null);
            newForeignNode.nodeId = this.node_id_generator();
            if (!this.head) {
                this.head = newForeignNode;
                this.tail = newForeignNode;
            } else {
                newForeignNode.prev = this.tail;
                this.tail.next = newForeignNode;
                this.tail = newForeignNode;
            }
        } else {
            return "Wrong Node Type";
        }
    }

    //Getting Foreign Node Id and Reference
    get_foreign_node(node_id) {
        let current = this.head;
        while (current) {
            if (current.nodeId === node_id) {
                return current;
            }
            current = current.next;
        }
    }

    //Connecting the foreign nodes
    connect_to_foreign_node(node_id, foreign_node_prev = null, foreign_node_next = null) {
        let current = this.head;
        while (current) {
            if (current.nodeId === node_id) {
                current.foreign_prev = foreign_node_prev;
                current.foreign_next = foreign_node_next;
                break;
            }
            current = current.next;
        }
    }

    //inserting data to the beginning of the Linked list
    prepend(data) {
        const newNode = new Local_Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    //inserting data to the specific given node
    insert_after(data, targetNodeData) {
        const newNode = new Local_Node(data);
        let current = this.head;
        while (current) {
            if (current.data === targetNodeData) {
                newNode.prev = current;
                newNode.next = current.next;
                current.next ? current.next.prev = newNode : this.tail = current.next;
                current.next = newNode;
                break;
            }
            current = current.next;
        }
    }

    //Delete the node with given data
    delete(data) {
        if (!this.head) return;
        let current = this.head;
        while (current) {
            if (current.data === data) {
                if (current === this.head) {
                    this.head = current.next;
                    this.head ? this.head.prev = null : this.tail = null;
                } else if (current === this.tail) {
                    this.tail = current.prev;
                    this.tail.next = null;
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
                break;
            }
            current = current.next;
        }
    }

    // Display the linked list elements in forward direction
    displayForward() {
        let current = this.head;
        while (current) {
            console.log("Data: "+ current.data + " ID: " + current.nodeId + " Prev ID: " + current.prev?.nodeId +" Next ID: " + current.next?.nodeId + " Foreign Next ID: " + current?.foreign_next?.nodeId + " Foreign Prev ID: " + current?.foreign_prev?.nodeId);
            current = current.next;
        }
    }

    // Display the linked list elements in backward direction
    displayBackward() {
        let current = this.tail;
        while (current) {
            console.log(current.data);
            current = current.prev;
        }
    }
}

module.exports = Doubly_Linked_List;

//Paste this below in index js
// // Doubly Linked List
//
// const Doubly_linked_list = require('../data_structurs/linked_list/doubly_linked_list');
// const linked_list_One = new Doubly_linked_list();
// const linked_list_Two = new Doubly_linked_list();
//
// //Appending For First Linked list
// linked_list_One.advance_append(1, "foreign");
// linked_list_One.advance_append(2, "local");
// linked_list_One.advance_append(3, "local");
// linked_list_One.advance_append(4, "local");
//
// //Appending For Second Linked list
// linked_list_Two.advance_append(1, "local");
// linked_list_Two.advance_append(2, "foreign");
// linked_list_Two.advance_append(3, "local");
// linked_list_Two.advance_append(4, "local");
// linked_list_Two.advance_append(5, "local");
//
// console.log("Connecting the Foreign Node for One and Two");
// const foreign_node_one = linked_list_One.get_foreign_node("0x001");
// const foreign_node_two = linked_list_Two.get_foreign_node("0x002");
//
// linked_list_One.connect_to_foreign_node("0x001", foreign_node_two, null);
// linked_list_Two.connect_to_foreign_node("0x002", null, foreign_node_one);
//
// console.log("Getting Foreign Node : Linked List One : 0x001");
// console.log(foreign_node_one.foreign_prev.nodeId, foreign_node_one.foreign_next);
//
// console.log("Getting Foreign Node : Linked List One : 0x002");
// console.log(foreign_node_two.foreign_prev, foreign_node_two.foreign_next.nodeId);