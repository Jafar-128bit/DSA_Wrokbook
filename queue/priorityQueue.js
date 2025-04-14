class Queue {
    constructor(size, priority = 0) {
        this.size = size;
        this.queue = [];
        this.priority = priority;
    }

    enqueue(element) {
        if (this.queue.length < this.size) {
            this.queue.push(element);
        } else {
            console.log("Queue is Full!");
            return;
        }
    }

    dequeue() {
        if (this.queue.length > 0) {
            return this.queue.shift();
        } else {
            console.log("The queue is empty!");
            return;
        }
    }

    clearQueue() {
        this.queue = [];
    }

    getQueue() {
        return this.queue;
    }
}

class PriorityQueue {
    constructor(priorityLevels = 2, sizeOfEachQueue = [2, 2]) {
        this.priorityLevels = priorityLevels;
        this.priorityQueue = (() => {
            let priorityQueue = [];
            for (let i = 0; i < this.priorityLevels; i++) {
                priorityQueue.push(new Queue(sizeOfEachQueue[i], i));
            }
            return priorityQueue;
        })();
    }

    enqueue(element, priorityLevel) {
        if (priorityLevel < this.priorityQueue.length && priorityLevel >= 0) {
            this.priorityQueue[priorityLevel].enqueue(element);
        } else {
            console.log("Wrong priority level is selected!");
        }
    }

    dequeue(priorityLevel) {
        if (priorityLevel < this.priorityQueue.length && priorityLevel >= 0) {
            return this.priorityQueue[priorityLevel].dequeue();
        } else {
            console.log("Wrong priority level is selected!");
            return null;
        }
    }

    clearQueue(priorityLevel) {
        if (priorityLevel < this.priorityQueue.length && priorityLevel >= 0) {
            this.priorityQueue[priorityLevel].clearQueue();
        } else {
            console.log("Wrong priority level is selected!");
        }
    }

    getQueue() {
        return this.priorityQueue.map(queue => queue.getQueue());
    }
}

const pQueue = new PriorityQueue(3, [3, 5, 12]);

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < Math.min(6, pQueue.priorityQueue[i].size); j++) {
        pQueue.enqueue(j, i);
    }
}

console.log(pQueue.getQueue());