class Point {
    constructor(data = null) {
        this.data = data;
        this.nextIndex = null;
    }
}

class Disk {
    constructor() {
        this.diskPoints = [];
    }

    getPointData(pointIndex) {
        const totalDiskSize = this.diskPoints.length;
        let actualIndex = pointIndex;

        if (pointIndex > totalDiskSize - 1) actualIndex = pointIndex % (totalDiskSize - 1);
        if (pointIndex < 0) actualIndex = Math.abs(pointIndex) % (totalDiskSize - 1);

        return this.diskPoints[actualIndex];
    }

    addData(data) {
        const point = new Point(data);
        this.diskPoints.push(point);
        const nextPointIndex = this.diskPoints.findIndex(point => point.data === data);
        if (nextPointIndex !== -1) point.nextIndex = nextPointIndex + 1;
    }

    removeData(pointIndex) {
        this.diskPoints.splice(pointIndex, 1);
    }
}

class DiskList {
    constructor() {
        this.diskList = [];
    }

    addDisk() {
        const disk = new Disk();
        this.diskList.push(disk);
    }

    removeDisk(diskIndex) {
        if (diskIndex < 0 || diskIndex >= this.diskList.length) return new Error("Invalid disk index!");

        if (this.diskList[diskIndex].diskPoints.lenght !== 0) {
            if (diskIndex === 0) {
                this.diskList[diskIndex + 1] = [...this.diskList[0], ...this.diskList[diskIndex + 1]];
            } else {
                this.diskList[diskIndex - 1] = [...this.diskList[diskIndex], ...this.diskList[diskIndex - 1]];
            }
            this.diskList.splice(diskIndex, 1);
        } else this.diskList.splice(diskIndex, 1);
    }

    addDataToDisk(diskIndex, data) {
        if (diskIndex < 0 || diskIndex >= this.diskList.length) return new Error("Invalid disk index!");
        if (data === null || data === undefined) return new Error("Data is Empty!");
        this.diskList[diskIndex].addData(data);
    }

    removeDataFromDisk(diskIndex, pointIndex) {
        if (diskIndex < 0 || diskIndex >= this.diskList.length) return new Error("Invalid disk index!");
        if (pointIndex === null || pointIndex === undefined) return new Error("Invalid point index!");
        this.diskList[diskIndex].removeData(pointIndex);
    }

    getDiskData(diskIndex) {
        if (diskIndex < 0 || diskIndex >= this.diskList.length) return new Error("Invalid disk index!");
        return this.diskList[diskIndex];
    }

    getPointDataFromDisk(diskIndex, pointIndex) {
        if (diskIndex < 0 || diskIndex >= this.diskList.length) return new Error("Invalid disk index!");
        if (pointIndex === null || pointIndex === undefined) return new Error("Invalid point index!");
        return this.diskList[diskIndex].getPointData(pointIndex);
    }

    getDiskStack() {
        return this.diskList;
    }
}

const DSData = new DiskList();

let k = 0;

for (let i = 0; i < 5; i++) {
    DSData.addDisk();
    for (let j = 0; j <= 6; j++) {
        DSData.addDataToDisk(i, k);
        k += 0.0025 * (j) + 0.001;
    }
}

console.log(DSData.getDiskStack());