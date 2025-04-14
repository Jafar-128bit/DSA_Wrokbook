class ThreeDimensionalArray {
    // m --> number of layers, n --> number rows, o --> number columns
    constructor(m, n, o) {
        this.m = m;
        this.n = n;
        this.o = o;
        this.array = Array.from({ length: m }, () => Array.from({ length: n }, () => Array.from({ length: o }, () => null)));
    }

    setValue(layer, row, col, value) {
        if (this.isValidPosition(layer, row, col)) {
            this.array[layer][row][col] = value;
        } else {
            console.error('Invalid position');
        }
    }

    getValue(layer, row, col) {
        if (this.isValidPosition(layer, row, col)) {
            return this.array[layer][row][col];
        } else {
            console.error('Invalid position');
            return undefined;
        }
    }

    isValidPosition(layer, row, col) {
        return layer >= 0 && layer < this.m && row >= 0 && row < this.n && col >= 0 && col < this.o;
    }

    printArray() {
        console.log(this.array);
    }

    getArray() {
        return this.array;
    }
}

// Example usage
const array = new ThreeDimensionalArray(3, 3, 3);

array.setValue(0, 0, 0, 'A');
array.setValue(2, 2, 2, 'B');

array.printArray();
