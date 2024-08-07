



const burgerQueue = new Queue();

class Burger {
    constructor() {
        this.items = [];
    }

    // Add an item to the queue
    enqueue(element) {
        this.items.push(element);
    }

    // Remove an item from the queue
    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items.shift();
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the size of the queue
    size() {
        return this.items.length;
    }

    // View the first item in the queue
    front() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items[0];
    }

    // View all items in the queue
    display() {
        return this.items;
    }
}


