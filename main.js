#!/usr/bin/env node

import Tree from "./bst.js";

function randomArray(n) {
  const arr = [];

  while (n) {
    const number = Math.floor(Math.random() * 100);
    arr.push(number);
    n--;
  }

  return arr;
}

function insertRandom(tree) {
  const number = Math.floor(Math.random() * 100) + 100;

  console.log(`adding ${number} to tree`);
  tree.insert(number);
}

const Order = (tree, type) => {
  const values = [];
  const addToList = (value) => values.push(value);
  tree[type](addToList);

  return values;
};

const arr = randomArray(10);

console.log(`making a tree from ${arr}`);
const tree = new Tree(arr);
console.log(`tree balanced state is: ${tree.isBalanced()}`);

console.log("------");
let inOrder = Order(tree, "inOrderForEach");
console.log(`inorder node arrangement: ${inOrder}`);
let preOrder = Order(tree, "preOrderForEach");
console.log(`preorder node arrangement: ${preOrder}`);
let postOrder = Order(tree, "postOrderForEach");
console.log(`postorder node arrangement: ${postOrder}`);

console.log("---------");
console.log("making tree unbalanced");
insertRandom(tree);
insertRandom(tree);
console.log(`tree balanced state is: ${tree.isBalanced()}`);

console.log("-----");
console.log("rebalancing tree");
tree.rebalance();
console.log(`tree balanced state is: ${tree.isBalanced()}`);

console.log("------");
inOrder = Order(tree, "inOrderForEach");
console.log(`inorder node arrangement: ${inOrder}`);
preOrder = Order(tree, "preOrderForEach");
console.log(`preorder node arrangement: ${preOrder}`);
postOrder = Order(tree, "postOrderForEach");
console.log(`postorder node arrangement: ${postOrder}`);
