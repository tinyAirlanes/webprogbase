// jsonStorage.js
const fs = require('fs');


class JsonStorage {

    // filePath - path to JSON file
    constructor(filePath) {
        this.filePath = filePath;
    }

    get nextId() {
        // TODO: get next entity id
        const nextId = this.readItems().nextId;
        return nextId;

    }

    incrementNextId() {
        try{
        const items = this.readItems();
        items.nextId += 1;
        this.writeItems(items);
        }
        catch{
        throw new Error("Not implemented.");
        }
    }

    readItems() {
        let jsonText = fs.readFileSync(this.filePath);
        if (jsonText.length === '0')
            jsonText = { "nextId": 1, "items": [] };
        else
            jsonText = JSON.parse(jsonText);
        return jsonText;
    }

    writeItems(items) {
        const jsonText = JSON.stringify(items, null, 4);
        fs.writeFileSync(this.filePath, jsonText);
    }
};

module.exports = JsonStorage;