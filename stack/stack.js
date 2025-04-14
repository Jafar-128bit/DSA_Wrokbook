class Stack {
    constructor(sizeOfStack) {
        this.stack = [];
        this.size = sizeOfStack;
    }

    Push(data) {
        if (this.stack.length < this.size) this.stack.unshift(data);
        else console.log("Stack Overflowed!");
    }

    Pop() {
        this.stack.shift();
    }

    Top() {
        return this.stack[0];
    }

    isEmpty() {
        if (this.stack.length === 0) return true;
        else return false;
    }

    display() {
        return this.stack;
    }
}