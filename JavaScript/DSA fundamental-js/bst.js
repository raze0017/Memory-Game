class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function buildTree(arr, left, right) {
    if (left > right) {
        return null;
    }
    let mid = Math.floor((left + right) / 2);
    let root = new Node(arr[mid]);
    root.left = buildTree(arr, left, mid - 1);
    root.right = buildTree(arr, mid + 1, right);
    return root;
}

function levelOrder(root, callback) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();

        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return result;
}

function inOrder(root, callback, result = []) {
    if (root === null) return result;

    inOrder(root.left, callback, result);

    if (callback) {
        callback(root);
    } else {
        result.push(root.data);
    }

    inOrder(root.right, callback, result);
    return result;
}

function preOrder(root, callback, result = []) {
    if (root === null) return result;

    if (callback) {
        callback(root);
    } else {
        result.push(root.data);
    }

    preOrder(root.left, callback, result);
    preOrder(root.right, callback, result);
    return result;
}

function postOrder(root, callback, result = []) {
    if (root === null) return result;

    postOrder(root.left, callback, result);
    postOrder(root.right, callback, result);

    if (callback) {
        callback(root);
    } else {
        result.push(root.data);
    }
    return result;
}

function height(node) {
    if (node === null) return -1;
    return 1 + Math.max(height(node.left), height(node.right));
}

function depth(root, node, currentDepth = 0) {
    if (root === null) return -1;
    if (root === node) return currentDepth;

    let leftDepth = depth(root.left, node, currentDepth + 1);
    if (leftDepth !== -1) return leftDepth;

    return depth(root.right, node, currentDepth + 1);
}

function isBalanced(root) {
    if (root === null) return true;

    let leftHeight = height(root.left);
    let rightHeight = height(root.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return isBalanced(root.left) && isBalanced(root.right);
}

function rebalance(root) {
    let nodes = [];
    inOrder(root, node => nodes.push(node.data));

    return buildTree(nodes, 0, nodes.length - 1);
}

function generateRandomArray(size, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function main() {
    // Create a binary search tree from an array of random numbers < 100
    let randomArray = generateRandomArray(15, 100);
    let root = buildTree(randomArray, 0, randomArray.length - 1);

    // Confirm that the tree is balanced
    console.log("Is the tree balanced? " + isBalanced(root));

    // Print out all elements in level, pre, post, and in order
    console.log("Level Order: " + levelOrder(root));
    console.log("Pre Order: " + preOrder(root));
    console.log("In Order: " + inOrder(root));
    console.log("Post Order: " + postOrder(root));

    // Unbalance the tree by adding several numbers > 100
    [101, 102, 103, 104, 105].forEach(value => {
        root = insert(root, value);
    });

    // Confirm that the tree is unbalanced
    console.log("Is the tree balanced after adding nodes > 100? " + isBalanced(root));

    // Balance the tree by calling rebalance
    root = rebalance(root);

    // Confirm that the tree is balanced
    console.log("Is the tree balanced after rebalancing? " + isBalanced(root));

    // Print out all elements in level, pre, post, and in order
    console.log("Level Order after rebalancing: " + levelOrder(root));
    console.log("Pre Order after rebalancing: " + preOrder(root));
    console.log("In Order after rebalancing: " + inOrder(root));
    console.log("Post Order after rebalancing: " + postOrder(root));
}

main();
