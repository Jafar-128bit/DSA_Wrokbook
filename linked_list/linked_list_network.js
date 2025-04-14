/* Basic model structure */
const mapModel = [
    {
        list_Id: null,
        node_List: [
            {
                node_Id: null,
                node_Type: {
                    type: 'single',
                    reference: null,
                },
                node_Data: null,
            },
        ]
    },
]

const createSinglyLinkedList = Symbol('privateMethod');
const createDoublyLinkedList = Symbol('privateMethod');

/* Node Class Importing  */
const {singly_type_local_node, doubly_type_local_node} = require("./nodes/Local_Nodes");
const {singly_type_foreign_node, doubly_type_foreign_Node} = require("./nodes/Foreign_Nodes");

/* Linked List Class Importing */
const Singly_linked_list = require('./singly_linked_list');
const Doubly_Linked_List = require('./doubly_linked_list');

class Create_Network {
    constructor(node_list = []) {
        this.nodeList = node_list;
        /*
        Using Symbols for making these two functions below a
        private function that can only be accessed within class scope.
        */
        this[createSinglyLinkedList] = (nodeList) => {
            return nodeList;
        }
        this[createDoublyLinkedList] = (nodeList) => {
            return nodeList;
        }
    }

    AddNodeId() {
    }

    generateNetwork(list_type) {
        if (list_type === 'singly') return this[createSinglyLinkedList](this.nodeList);
        else if (list_type === 'doubly') return this[createDoublyLinkedList](this.nodeList);
        else throw new Error('Wrong list type argument passed!');
    }
}

module.exports = Create_Network;