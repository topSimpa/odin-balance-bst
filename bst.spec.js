import Tree from "./bst";

describe("testing suite for balance binary search tree", () => {
  const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const tree = new Tree(array);
  const Order = (tree, type) => {
    const values = [];
    const addToList = (value) => values.push(value);
    tree[type](addToList);

    return values;
  };

  test("testing constructor", () => {
    expect(tree.root.value).toBe(8);
    expect(tree.root.leftNode.value).toBe(4);
    expect(tree.root.rightNode.value).toBe(67);
    expect(tree.includes(23)).toBe(true);
  });

  test("test void state", () => {
    const tree = new Tree();
    expect(tree.includes(23)).toBe(false);

    tree.insert(23);
    expect(tree.includes(23)).toBe(true);
  });

  test("testing insert and levelOrderForEach", () => {
    expect(Order(tree, "levelOrderForEach")).toStrictEqual([
      8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345,
    ]);

    tree.insert(6);
    expect(Order(tree, "levelOrderForEach")).toStrictEqual([
      8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345, 6,
    ]);
  });

  test("testing deletion", () => {
    const tree = new Tree([1, 5, 4, 3]);

    tree.insert(2);
    expect(tree.includes(2)).toBe(true);
    expect(Order(tree, "levelOrderForEach")).toStrictEqual([3, 1, 4, 2, 5]);

    //deleting target with no child
    tree.deleteItem(2);
    expect(tree.includes(2)).toBe(false);
    expect(Order(tree, "levelOrderForEach")).toStrictEqual([3, 1, 4, 5]);

    //deleting target with one child
    tree.deleteItem(4);
    expect(tree.includes(4)).toBe(false);
    expect(Order(tree, "levelOrderForEach")).toStrictEqual([3, 1, 5]);

    //deleting target with two children;
    tree.deleteItem(3);
    expect(tree.includes(3)).toBe(false);
    expect(Order(tree, "levelOrderForEach")).toStrictEqual([5, 1]);
  });

  test("testing inOrderForEach and delete", () => {
    const tree = new Tree([1, 5, 4, 3, 2]);

    expect(Order(tree, "inOrderForEach")).toStrictEqual([1, 2, 3, 4, 5]);

    tree.deleteItem(2);
    expect(Order(tree, "inOrderForEach")).toStrictEqual([1, 3, 4, 5]);

    tree.deleteItem(3);
    expect(Order(tree, "inOrderForEach")).toStrictEqual([1, 4, 5]);
  });

  test("testing preOrderForEach  and postOrderForEach", () => {
    const tree = new Tree([1, 5, 4, 3, 2]);

    expect(Order(tree, "preOrderForEach")).toStrictEqual([3, 1, 2, 4, 5]);
    expect(Order(tree, "postOrderForEach")).toStrictEqual([2, 1, 5, 4, 3]);
  });

  test("testing height and depth", () => {
    const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

    expect(tree.height(4)).toBe(2);
    expect(tree.depth(4)).toBe(1);

    tree.insert(2);
    expect(tree.height(2)).toBe(0); //2 is suppose to be leaf on 4's subtree
    expect(tree.depth(2)).toBe(4);

    expect(tree.height(4)).toBe(3);
  });

  test("testing balanceness", () => {
    const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

    expect(tree.isBalanced()).toBe(true);
    expect(Order(tree, "preOrderForEach")).toStrictEqual([
      8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345,
    ]);

    //make it unbalance
    tree.insert(2);
    expect(tree.isBalanced()).toBe(false);
    expect(Order(tree, "preOrderForEach")).toStrictEqual([
      8, 4, 1, 3, 2, 5, 7, 67, 9, 23, 324, 6345,
    ]);

    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
    expect(Order(tree, "preOrderForEach")).toStrictEqual([
      7, 3, 1, 2, 4, 5, 23, 8, 9, 324, 67, 6345,
    ]);
  });
});
