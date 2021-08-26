const _ = require("./lib/utils.js");

class Farm extends Map {
    /**
     * 
     * @param {{ cowId: Number, nickName: string}} root
     */
    constructor(root) {
        super();
        this.set(root.cowId, { cowId: root.cowId, nickName: root.nickName, parentCowId: null });
    }

    /**
     * 
     * @param {Number} parentCowId 
     * @param {Number} childCowId 
     * @param {string} childNickName 
     */
    GiveBirth(parentCowId, childCowId, childNickName) {
        /*
            It would be better that unique id is generated internaly,
            instead of it being passed as parameter by client/user of the Farm class
         */
        this.set(childCowId, { cowId: childCowId, nickName: childNickName, parentCowId: parentCowId });       
    }

    /**
     * 
     * @param {Number} cowId 
     */
    EndLifeSpan(cowId) {
        this.delete(cowId);
    }

    PrintData() {
        _.log(`\n Current state: \n`);
        _.log("------------------------------------------")
        this.forEach((value, key) => {
            _.log(`\n CowID: ${key} | Nickname: ${value.nickName} | ParentID: ${value.parentCowId}`)
        });
        _.log("\n------------------------------------------")
    }
};

const farm = new Farm({ cowId: 1, nickName: "Original cow" });

farm.GiveBirth(1, 2, "Second cow");
farm.GiveBirth(1, 3, "Third cow");
farm.GiveBirth(3, 4, "Nested cow");

farm.PrintData();
farm.EndLifeSpan(2);
farm.PrintData();