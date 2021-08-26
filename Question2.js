
/**
 * Since I can't use an array or hash table to store and represent data internally (inside the data structure),
 * I decided to limit number of descendants for each cow to 3.
 * Logic behind this limit is that every cow can be inseminated limited number of times.
 *
 *
 * Since the limitation of the assignment is to not use arrays,
 * tree structure is represented through object references.
 * Without the limitations, tree structure would be stored and modeled as an array.
 *
 */


const _ = require("./lib/utils.js");

class SimpleCollection {
    constructor() {
        this.first = null;
        this.second = null;
        this.third = null;

        this.count = 0;
    }

    *[Symbol.iterator]() {
        yield this.first;
        yield this.second;
        yield this.third;
    }

    add(element) {
        if (this.count === 0) {
            this.first = element;
            this.count++;
        } else if (this.count === 1) {
            this.second = element;
            this.count++;
        } else if (this.count === 2) {
            this.third = element;
            this.count++;
        } else {
            throw Error(`${element.nickName} already has 3 children, limit reached.`);
        }
    }
}

class Cow {
    constructor(cowId, nickName) {
        this.cowId = cowId;
        this.nickName = nickName;
        this.isAlive = true;
        this.count = 0;

        this.children = new SimpleCollection();
        this.parent = null;
    }

    setChild(cowId, nickName) {
        if (!this.isAlive) {
            return;
        }

        const child = new Cow(cowId, nickName);

        // Circular reference to parent
        // child.parent = this;
        try {
            this.children.add(child);
        } catch (error) {
            console.log(error);
        }

        return child;
    }

    // get Parent() {
    //     return this.parent;
    // }

    // set Parent(value) {
    //     this.parent = value;
    // }

    die() {
        this.isAlive = false;
        return this;
    }

    traverse(cb) {
        for (let child of this.children) {
            if (child && (cb(child) === true || child.traverse(cb) === true)) {
                return true;
            }
        }
    }

    findById(cowId) {
        let found = null;
        this.traverse(node => {
            if (node && node.cowId === cowId) {
                found = node;
                return true;
            }
        });

        return found;
    }

    childrenToString(node, spaceCount = 0) {
        let str = "\n";
        for(let child of node.children) {
            if (child) {
                str += `${" ".repeat(spaceCount)} - ${child.nickName} (id: ${child.cowId}, alive: ${child.isAlive})${this.childrenToString(child, spaceCount*2)}`;
            }
        }

        return str;
    }

    // print() {
    //     console.log((`\n - ${this.nickName} (id: 1)${this.childrenToString(this, 4)}`));
    // }
}


class Farm {
    constructor() {
        this.root = new Cow(1, "Agnes the original cow");
        this.size = 1;
    }

    GiveBirth(parentCowId, childCowId, childNickName) {
        if (parentCowId === this.root.cowId) {
            this.root.setChild(childCowId, childNickName);
            return this;
        }

        const cow = this.root.findById(parentCowId);
        cow.setChild(childCowId, childNickName);
        this.size++;
        return this;
    }
    EndLifeSpan(cowId) {
        if (this.root.cowId === cowId) {
            return;
        }

        const cow = this.root.findById(cowId);
        cow.die();

        this.size--;
        return this;
    }

    PrintData() {
        console.log(` - ${this.root.nickName} (id: ${this.root.cowId})${this.root.childrenToString(this.root, 4)}`)
    }
}


const farm = new Farm();
farm.GiveBirth(1, 2, "Wolly");
farm.GiveBirth(1, 3, "Gill");
farm.GiveBirth(2, 4, "Wolly's child 1");
farm.GiveBirth(2, 5, "Wolly's child 2");
farm.GiveBirth(3, 6, "Gill's child");
farm.GiveBirth(2, 7, "Wolly's child 3");

farm.EndLifeSpan(5);
farm.PrintData();


// const agnes = new Cow(1, "Agnes");
// const wolly = agnes.setChild(2, "Wolly");
// const gill = agnes.setChild(3, "Gill");
// wolly.setChild(4, "Wolly's child");
// wolly.setChild(5, "Wolly's child 2");

// gill.Parent.setChild(6, "Gill's sister");
// gill.die();
// agnes.print();
