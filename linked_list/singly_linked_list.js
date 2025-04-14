class Node {
    constructor(value, nodeId) {
        this.nodeId = nodeId; // Id of a Node
        this.data = value;
        this.next = null;
        this.foreignNext = null;
        this.x = 0;
        this.y = 0;
    }

    setForeignNext(node) {
        this.foreignNext = node;
    }

    removeForeignNext() {
        this.foreignNext = null;
    }
}

class Singly_linked_list {
    constructor(listId, yOffset = 0) {
        this.listId = `${listId}`;
        this.head = null;
        this.yOffset = yOffset; // Y-offset for the list
    }

    append(data, nodeId) {
        const newNode = new Node(data, nodeId);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    prepend(data, nodeId) {
        const newNode = new Node(data, nodeId);
        newNode.next = this.head;
        this.head = newNode;
    }

    insertAfter(data, targetNodeId, newNodeId) {
        const newNode = new Node(data, newNodeId);
        let current = this.head;
        while (current) {
            if (current.nodeId === targetNodeId) {
                newNode.next = current.next;
                current.next = newNode;
                break;
            }
            current = current.next;
        }
    }

    delete(nodeId) {
        if (!this.head) {
            return;
        }

        if (this.head.nodeId === nodeId) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.nodeId === nodeId) {
                current.next = current.next.next;
                break;
            }
            current = current.next;
        }
    }

    display() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }

    updateCoordinates() {
        let current = this.head;
        let x = 50;
        const y = 50 + this.yOffset; // Use yOffset for this list
        const nodeDistance = 50; // Distance between nodes

        while (current) {
            current.x = x;
            current.y = y;
            x += nodeDistance;
            current = current.next;
        }
    }

    findNodeById(nodeId) {
        let current = this.head;
        while (current) {
            if (current.nodeId === nodeId) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    connectNodesById(sourceNodeId, targetNodeId, targetList) {
        const sourceNode = this.findNodeById(sourceNodeId);
        const targetNode = targetList.findNodeById(targetNodeId);
        if (sourceNode && targetNode) {
            sourceNode.setForeignNext(targetNode);
        }
    }

    disconnectNodeById(nodeId) {
        const node = this.findNodeById(nodeId);
        if (node) {
            node.removeForeignNext();
        }
    }
}


function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawNode(ctx, node) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 12, 0, Math.PI * 2, false);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();

    ctx.font = '12px Arial';
    ctx.fillStyle = "black";
    ctx.fillText(`${node.nodeId}`, node.x - 4, node.y + 4);
}

function drawLink(ctx, node) {
    if (node.next) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.next.x, node.next.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
    if (node.foreignNext) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.foreignNext.x, node.foreignNext.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.closePath();
    }
}

function drawBorder(ctx, linkedList) {
    const borderPadding = 30; // Padding around the list
    let current = linkedList.head;
    if (!current) return;

    let minX = current.x, maxX = current.x, minY = current.y, maxY = current.y;
    while (current) {
        if (current.x < minX) minX = current.x;
        if (current.x > maxX) maxX = current.x;
        if (current.y < minY) minY = current.y;
        if (current.y > maxY) maxY = current.y;
        current = current.next;
    }

    ctx.beginPath();
    ctx.rect(
        minX - borderPadding,
        minY - borderPadding,
        (maxX - minX) + borderPadding * 2.5,
        (maxY - minY) + borderPadding * 2
    );
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.font = '14px Arial';
    ctx.fillStyle = "black";
    ctx.fillText(`${linkedList.listId}`, minX - borderPadding + 5, minY - borderPadding + 15);
}

function visualizeLinkedLists(linkedLists) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    linkedLists.forEach(linkedList => {
        linkedList.updateCoordinates();
        drawBorder(ctx, linkedList);
        let current = linkedList.head;
        while (current) {
            drawLink(ctx, current);
            drawNode(ctx, current);
            current = current.next;
        }
    });
}

function openSideMenu(node) {
    const sideMenu = document.getElementById('sideMenu');
    const nodeId = document.getElementById('nodeId');
    const nodeValue = document.getElementById('nodeValue');

    nodeId.textContent = `Node ID: ${node.nodeId}`;
    nodeValue.textContent = `Data: ${node.data}`;

    sideMenu.style.left = '0';
}

function closeSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.style.left = '-360px';
}

function checkClick(linkedLists, mouseX, mouseY) {
    let nodeClicked = null;
    linkedLists.forEach(linkedList => {
        let current = linkedList.head;
        while (current) {
            const dx = mouseX - current.x;
            const dy = mouseY - current.y;
            if (Math.sqrt(dx * dx + dy * dy) < 10) {
                nodeClicked = current;
                break;
            }
            current = current.next;
        }
    });
    if (nodeClicked) {
        openSideMenu(nodeClicked);
    }
}

let linkedLists = [];

const list1 = new Singly_linked_list(1, 0);
const list2 = new Singly_linked_list(2, 80);

list1.append(0.1248, "A");
list1.append(0.1247, "B");
list1.append(0.1278, "C");
list1.append(0.1748, "D");
list1.append(0.1048, "E");

list2.append(0.1547, "A");
list2.append(0.1578, "B");
list2.append(0.1748, "C");

linkedLists.push(list1);
linkedLists.push(list2);

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    visualizeLinkedLists(linkedLists);

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        checkClick(linkedLists, mouseX, mouseY);
    });

    window.addEventListener('resize', () => visualizeLinkedLists(linkedLists));

    document.getElementById('addList').addEventListener('click', () => {
        const newListId = prompt('Enter new list ID:');
        if (newListId) {
            const yOffset = linkedLists.length * 100;
            const newList = new Singly_linked_list(newListId, yOffset);
            linkedLists.push(newList);
            visualizeLinkedLists(linkedLists);
        }
    });

    document.getElementById('removeList').addEventListener('click', () => {
        const listId = prompt('Enter list ID to remove:');
        const listIndex = linkedLists.findIndex(list => list.listId === listId);
        if (listIndex === -1) return alert("List not found!");
        linkedLists.splice(listIndex, 1);
        visualizeLinkedLists(linkedLists);
    });

    document.getElementById('addNode').addEventListener('click', () => {
        const listId = prompt('Enter list ID to add node:');
        const list = linkedLists.find(list => list.listId === listId);
        if (list) {
            const newNodeValue = prompt('Enter node value:');
            const newNodeId = prompt('Enter node ID:');
            if (newNodeValue && newNodeId) {
                list.append(newNodeValue, newNodeId);
                visualizeLinkedLists(linkedLists);
            }
        } else {
            alert('List ID not found');
        }
    });

    document.getElementById('removeNode').addEventListener('click', () => {
        const listId = prompt('Enter list ID to remove node from:');
        const list = linkedLists.find(list => list.listId === listId);
        if (list) {
            const nodeId = prompt('Enter ID of node to remove:');
            if (nodeId) {
                list.delete(nodeId);
                visualizeLinkedLists(linkedLists);
            }
        } else {
            alert('List ID not found');
        }
    });

    document.getElementById('connectNode').addEventListener('click', () => {
        const sourceListId = prompt('Enter source list ID:');
        const sourceNodeId = prompt('Enter source node ID:');
        const targetListId = prompt('Enter target list ID:');
        const targetNodeId = prompt('Enter target node ID:');

        const sourceList = linkedLists.find(list => list.listId === sourceListId);
        const targetList = linkedLists.find(list => list.listId === targetListId);

        if (sourceList && targetList) {
            sourceList.connectNodesById(sourceNodeId, targetNodeId, targetList);
            visualizeLinkedLists(linkedLists);
        } else alert('List ID not found');
    });

    document.getElementById('disconnectNode').addEventListener('click', () => {
        const listId = prompt('Enter list ID:');
        const nodeId = prompt('Enter node ID to disconnect:');

        const list = linkedLists.find(list => list.listId === listId);

        if (list) {
            list.disconnectNodeById(nodeId);
            visualizeLinkedLists(linkedLists);
        } else alert('List ID not found');
    });

    console.log(linkedLists[0]);
    console.log(linkedLists[1]);

    document.getElementById('closeSideMenu').addEventListener('click', closeSideMenu);
});
