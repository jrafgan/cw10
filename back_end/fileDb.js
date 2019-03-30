const fs = require('fs');

const filename = './db.json';

let data = {};

module.exports = {
  init() {
    try {
      const fileContents = fs.readFileSync(filename);
      data = JSON.parse(fileContents);
    } catch (e) {
      data = {};
    }
  },
  getItems(collectionName) {
    return data[collectionName] || [];
  },

  addItem(collectionName, item) {
    if (!data[collectionName]) {
        data[collectionName] = [];
    }
    data[collectionName].push(item);
    this.save();
  },

  save() {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  }
};
