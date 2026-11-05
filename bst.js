import Node from "./treeNode.js";

export default class Tree {
  #buildTree(array, start, end) {
    if (end < start) {
      return null;
    }

    const mid = start + Math.floor((end - start) / 2);
    const root = new Node(array[mid]);

    root.leftNode = this.#buildTree(array, start, mid - 1);
    root.rightNode = this.#buildTree(array, mid + 1, end);

    return root;
  }

  #cleanArray(array) {
    const sortedArray = array.sort((item1, item2) => item1 - item2);
    const arraySet = sortedArray.filter(
      (item, index) => item !== sortedArray[index - 1],
    );

    return arraySet;
  }

  #findLeftest(node) {
    let prev = node;

    while (node) {
      if (!node.leftNode) break;
      prev = node;
      node = node.leftNode;
    }

    return [prev, node];
  }

  #findNode(value) {
    let nextNode = this.root;

    while (nextNode) {
      if (nextNode.value === value) return nextNode;

      if (value < nextNode.value) {
        nextNode = nextNode.leftNode;
      } else nextNode = nextNode.rightNode;
    }
  }

  constructor(array) {
    if (!array) return;
    const cleanArray = this.#cleanArray(array);
    this.root = this.#buildTree(cleanArray, 0, cleanArray.length - 1);
  }

  deleteItem(value) {
    let nextNode = this.root;
    let prev = nextNode;

    while (nextNode) {
      if (nextNode.value == value) {
        if (nextNode.leftNode && nextNode.rightNode) {
          //swapping the least value child in the right sub tree
          //for the target node and shifting deletion to that least
          //value child;
          const [parent, inOrderSucessor] = this.#findLeftest(
            nextNode.rightNode,
          );
          if (parent !== inOrderSucessor) prev = parent;
          nextNode.value = inOrderSucessor.value;
          nextNode = inOrderSucessor;
        }

        if (nextNode.leftNode || nextNode.rightNode) {
          //deleting when node has at least one direct child;
          if (prev.leftNode === nextNode) {
            prev.leftNode = nextNode.leftNode || nextNode.rightNode;
          } else prev.rightNode = nextNode.leftNode || nextNode.rightNode;
        } else {
          //when no children;
          if (prev.leftNode === nextNode) prev.leftNode = null;
          else prev.rightNode = null;
        }

        break;
      }

      //traversing through node to find target
      prev = nextNode;
      if (value < nextNode.value) nextNode = nextNode.leftNode;
      else nextNode = nextNode.rightNode;
    }
  }

  depth(value) {
    let nextNode = this.root;
    let count = 0;

    while (nextNode) {
      if (nextNode.value === value) break;

      count++;
      if (value < nextNode.value) {
        nextNode = nextNode.leftNode;
      } else nextNode = nextNode.rightNode;
    }

    return count;
  }

  height(value) {
    const target = this.#findNode(value);

    if (!target) return;

    const heightCount = (node) => {
      if (!(node.leftNode || node.rightNode)) return 0;

      let left = 0;
      let right = 0;

      if (node.leftNode) left = 1 + heightCount(node.leftNode);
      if (node.rightNode) right = 1 + heightCount(node.rightNode);

      return left > right ? left : right;
    };

    return heightCount(target);
  }

  includes(value) {
    return Boolean(this.#findNode(value));
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("callback is required, enter a callback");

    if (!this.root) return;

    const inOrderTravasal = (node) => {
      if (!node) return;

      inOrderTravasal(node.leftNode);
      callback(node.value);
      inOrderTravasal(node.rightNode);
    };

    inOrderTravasal(this.root);
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    let nextNode = this.root;

    while (nextNode) {
      if (nextNode.value == value) return;

      if (value < nextNode.value) {
        if (!nextNode.leftNode) {
          nextNode.leftNode = new Node(value);
        }
        nextNode = nextNode.leftNode;
      } else {
        if (!nextNode.rightNode) {
          nextNode.rightNode = new Node(value);
        }
        nextNode = nextNode.rightNode;
      }
    }
  }

  isBalanced() {
    if (!this.root) return true;

    const heightDiff = (node) => {
      if (!(node.leftNode || node.rightNode)) return 0;

      let left = 0;
      let right = 0;

      if (node.leftNode) left = 1 + heightDiff(node.leftNode);
      if (node.rightNode) right = 1 + heightDiff(node.rightNode);

      return Math.abs(left - right);
    };

    const queue = [this.root];
    let next = 0;
    while (queue[next]) {
      const curNode = queue[next++];
      if (heightDiff(curNode) > 1) return false;

      if (curNode.leftNode) queue.push(curNode.leftNode);
      if (curNode.rightNode) queue.push(curNode.rightNode);
    }

    return true;
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw Error("callback is needed, enter a callback argument");
    }

    if (!this.root) return;

    const queue = [this.root];
    const levelOrderTravasal = (queue, index = -1) => {
      const dataNode = queue[++index];
      if (!dataNode) return;

      callback(dataNode.value);
      if (dataNode.leftNode) queue.push(dataNode.leftNode);
      if (dataNode.rightNode) queue.push(dataNode.rightNode);

      levelOrderTravasal(queue, index);
    };

    levelOrderTravasal(queue);
  }

  postOrderForEach(callback) {
    if (!callback) {
      throw Error("callback is needed, enter a callback argument");
    }

    if (!this.root) return;

    const postOrderTravasal = (node) => {
      if (!node) return;

      postOrderTravasal(node.leftNode);
      postOrderTravasal(node.rightNode);
      callback(node.value);
    };

    postOrderTravasal(this.root);
  }

  preOrderForEach(callback) {
    if (!callback) {
      throw Error("callback is needed, enter a callback argument");
    }

    if (!this.root) return;

    const preOrderTravasal = (node) => {
      if (!node) return;

      callback(node.value);
      preOrderTravasal(node.leftNode);
      preOrderTravasal(node.rightNode);
    };

    preOrderTravasal(this.root);
  }

  rebalance() {
    const nodeValues = [];
    this.inOrderForEach((value) => nodeValues.push(value));
    this.root = this.#buildTree(nodeValues, 0, nodeValues.length - 1);
  }
}
