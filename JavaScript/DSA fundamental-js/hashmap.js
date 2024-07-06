class ListNode {
    constructor(key = -1, val = -1, next = null) {
        this.key = key;
        this.val = val;
        this.next = next;
    }
}

function hashmap() {
    const map = new Array(1000).fill(null).map(() => new ListNode());

    function hashcode(key) {
        return key % map.length;
    }

    function put(key, value) {
        let cur = map[hashcode(key)];
        while (cur.next) {
            if (cur.next.key === key) {
                cur.next.val = value; // Update existing key's value
                return;
            }
            cur = cur.next;
        }
        cur.next = new ListNode(key, value); // Insert new node
    }

    function get(key) {
        let cur = map[hashcode(key)].next; // Start from the first node (skip dummy head)
        while (cur) {
            if (cur.key === key) {
                return cur.val; // Return value if key is found
            }
            cur = cur.next; // Move to the next node
        }
        return -1; // Return -1 if key is not found
    }

    function remove(key) {
        let cur = map[hashcode(key)];
        while (cur.next) {
            if (cur.next.key === key) {
                cur.next = cur.next.next; // Remove the node
                return;
            }
            cur = cur.next;
        }
    }

    return {
        put,
        get,
        remove
    };
}

const myHashMap = hashmap();
myHashMap.put(1, 1);
myHashMap.put(2, 2);
console.log(myHashMap.get(1)); // Output: 1
console.log(myHashMap.get(3)); // Output: -1 (not found)
myHashMap.put(2, 1); // Update value for key 2
console.log(myHashMap.get(2)); // Output: 1
myHashMap.remove(2); // Remove key 2
console.log(myHashMap.get(2)); // Output: -1 (not found)
