class Queue {
    constructor(size, bufferSize = 2) {
        this.size = size;
        this.bufferSize = bufferSize;
        this.queue = [];
        this.bufferQueue = [];
    }

    enqueue(element) {
        if (this.queue.length < this.size) {
            this.queue.push(element);
        } else if (this.bufferQueue.length < this.bufferSize) {
            console.log("Main Queue Size exceeded, pushing in Buffer Queue!");
            this.bufferQueue.push(element);
        } else {
            console.log("Total Queue Size exceeded!");
            return;
        }
    }

    dequeue() {
        if (this.queue.length > 0) {
            const queueElement = this.queue.shift();
            if (this.bufferQueue.length > 0) {
                const bufferElement = this.bufferQueue.shift();
                this.queue.push(bufferElement);
            }
            return queueElement;
        } else {
            console.log("The Queue is Empty!");
            return;
        }
    }

    clearQueue() {
        this.queue = [];
        this.bufferQueue = [];
    }

    getQueue() {
        return {
            queue: this.queue,
            bufferQueue: this.bufferQueue,
        };
    }
}

const queue = new Queue(5, 3);

for (let i = 0; i < 10; i++) {
    queue.enqueue(i);
    console.log(queue.getQueue());
}

for (let i = 0; i < 10; i++) {
    queue.dequeue();
    console.log(queue.getQueue());
}
