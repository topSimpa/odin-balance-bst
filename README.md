# Binary Search Trees
A binary search tree is a tree data structure where the tree subtrees are arange in a order. Here we would have the left subtree nodes lower than the right sub tree nodes. we would also go further to make sure the tree is balanced. i.e `there is a maximum of 1 in the difference of height of the left and the right subtrees`

## Requirement & Features
- An `includes(value)` methodthat accepts a value and returns true if the given values in the tree. if the value isn't in the tree, it should return false.

- An `insert(value)` methodthat accepts a value and inserts 
a new node with that value into the tree. Be sure to insert in a
way that preserves the "binary search" property: `for each node, every node to its left must have a lower value, and every node to its right must have a greater value`. 

- A `deleteItem(value)` methodthat accepts a value and removes it from the tree.

- A `levelOrderForEach(callback)` methodthat accepts a callback methodas its parameter. It should traverse the tree in breadth-first level order and call the callback on each value

- A `inOrderForEach(callback)`, `preOrderForEach` and `postOrderForEach(callback)` method that traverse as their names says and calls the callback

- A `height(value)` method that returns the height of the node containing the given value i.e the number of edges in the longest path from that node to a leaf node.

- A `depth(value)` method that returns the depth of the node containing the given value. i.e the number of edges ein the path from that node to the root node. if the value is not found in

- A `isBalanced()` function that checks if the tree is balanced.

- A `rebalanced()` function that rebalances an unbalanced tree.

## Getting Started

### Prerequisite
1. git
2. nodeJS

### Installation & Setup

1. clone this repository

```bash
git clone <repo_url>
cd odin-balance-bst
```

2. Install the necessary dependencies
```bash
npm install
```

4. Check package.json for other available commands

## Technologies Used
- JS & NodeJS
- Jest

## Credit & Contributions

- [Myself](https://github.com/topSimpa)
