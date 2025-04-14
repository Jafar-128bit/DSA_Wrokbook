class Node {
  constructor(index, value = null, position = "head") {
    this.value = value;
    this.left = null;
    this.right = null;
    this.nodeIndex = index;
    this.position = position;
  }
}

class BinaryTree {
  constructor(size) {
    this.size = size;
    this.nodeList = Array.from(
      { length: this.size },
      (_, index) => new Node(index)
    );

    this.headNode = this.nodeList[0];
  }

  #addLeft(nodeIndex, leftNodeIndex) {
    if (leftNodeIndex === -1) return;
    this.nodeList[leftNodeIndex].position = "left";
    this.nodeList[nodeIndex].left = this.nodeList[leftNodeIndex];
  }

  #addRight(nodeIndex, rightNodeIndex) {
    if (rightNodeIndex === -1) return;
    this.nodeList[rightNodeIndex].position = "right";
    this.nodeList[nodeIndex].right = this.nodeList[rightNodeIndex];
  }

  buildTree() {
    let indexCount = [];
    const nodeListLength = this.nodeList.length;

    for (let i = 0; i < nodeListLength; i++) {
      if (
        indexCount[0] >= nodeListLength - 1 ||
        indexCount[1] >= nodeListLength - 1
      )
        break;

      if (indexCount.length === 0 && nodeListLength !== 2)
        indexCount = [i + 1, i + 2];
      else if (nodeListLength === 2) indexCount = [i + 1, -1];
      else {
        if (indexCount[0] <= nodeListLength) {
          indexCount[0] += 2;
          if (indexCount[0] + 1 < nodeListLength)
            indexCount[1] = indexCount[0] + 1;
          else indexCount[1] = -1;
        } else break;
      }
      this.#addLeft(i, indexCount[0]);
      this.#addRight(i, indexCount[1]);
    }
  }

  addValue(nodeIndex, value) {
    this.nodeList[nodeIndex].value = value;
  }

  getTree() {
    return this.headNode;
  }

  getTreePrinted() {
    console.log(this.nodeList);
  }
}

// const data = "Lorem ipsum dolor sit amet, consectetur adipiscing is, justo eu accumsan ultricies, enim magna lobortis lorem, eget lobortis mi ipsum vel turpis. Curabitur sed ultrices nunc. Mauris nec orci vitae felis malesuada interdum. Quisque eget libero libero. Donec ut nulla quis eros ultricies venenatis. Phasellus ac ligula vitae lorem dictum molestie. Nulla facilisi. Integer varius consectetur ligula, sed maximus felis convallis vitae. Sed consequat diam nec commodo ultricies. Cras lacinia lorem eget tortor hendrerit, vitae pulvinar sem eleifend. Aenean eu elit nisi. Nam auctor luctus velit, ut lacinia lacus convallis a. Aliquam erat volutpat. Nam vehicula, odio nec posuere euismod, nunc velit dictum sapien, at venenatis felis lorem id arcu. Phasellus et aliquet justo. Nulla facilisi. Sed a enim semper, fermentum neque eu, tincidunt velit.";
// const processData = data.split(" ");
const processData = Array.from({length: 78}, (_, index) => index);

function createD3Tree(treeData, orientation = "vertical") {
  d3.select("#tree-container").selectAll("*").remove();

  const margin = { top: 0, right: 150, bottom: 0, left: 150 },
    width = 1200 - margin.right - margin.left,
    height = 900 - margin.top - margin.bottom;

  const treemap = d3
    .tree()
    .size(orientation === "vertical" ? [height, width] : [width, height])
    .nodeSize([50, 100]) // Adjust node spacing
    .separation((a, b) => 0.75); // Adjust separation between nodes

  const nodes = d3.hierarchy(treeData, (d) =>
    [d.right, d.left].filter((n) => n)
  );

  // Assigns the x and y position for the nodes
  const treeDataLayout = treemap(nodes);

  const svg = d3
    .select("#tree-container")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .call(
      d3.zoom().on("zoom", (event) => {
        svg.attr("transform", event.transform);
      })
    )
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add links between nodes
  const link = svg
    .selectAll(".link")
    .data(treeDataLayout.descendants().slice(1))
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", (d) => {
      return (
        "M" +
        (orientation === "vertical" ? d.y : d.x) +
        "," +
        (orientation === "vertical" ? d.x : d.y) +
        "C" +
        (orientation === "vertical" ? d.y + d.parent.y : d.x + d.parent.x) / 2 +
        "," +
        (orientation === "vertical" ? d.x : d.y) +
        " " +
        (orientation === "vertical" ? d.y + d.parent.y : d.x + d.parent.x) / 2 +
        "," +
        (orientation === "vertical" ? d.parent.x : d.parent.y) +
        " " +
        (orientation === "vertical" ? d.parent.y : d.parent.x) +
        "," +
        (orientation === "vertical" ? d.parent.x : d.parent.y)
      );
    });

  // Add nodes
  const node = svg
    .selectAll(".node")
    .data(treeDataLayout.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr(
      "transform",
      (d) =>
        `translate(${orientation === "vertical" ? d.y : d.x},${
          orientation === "vertical" ? d.x : d.y
        })`
    );

  node.append("circle").attr("r", 10); // Increase the radius to 10

  node
    .append("text")
    .attr("dy", ".35em")
    .attr("x", (d) => (d.children ? -13 : 13))
    .attr("text-anchor", (d) => (d.children ? "end" : "start"))
    .text((d) => {
      const posText =
        d.data.position === "head"
          ? "head"
          : d.data.position === "left"
          ? "left"
          : "right";
      return `${d.data.value} : ${posText}`;
    });
}

window.onload = () => {
  const tree = new BinaryTree(processData.length);
  tree.buildTree();

  for (let i = 0; i < processData.length; i++) {
    tree.addValue(i, processData[i]);
  }

  createD3Tree(tree.getTree());

  document.getElementById("toggle-layout").addEventListener("click", () => {
    const currentOrientation =
      document.getElementById("tree-container").dataset.orientation;
    const newOrientation =
      currentOrientation === "vertical" ? "horizontal" : "vertical";
    document.getElementById("tree-container").dataset.orientation =
      newOrientation;
    createD3Tree(tree.getTree(), newOrientation);
  });
};
