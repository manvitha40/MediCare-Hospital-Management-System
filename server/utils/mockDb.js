const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

const readData = (collection) => {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error(`Error reading mock db collection ${collection}:`, error);
    return [];
  }
};

const writeData = (collection, data) => {
  const filePath = getFilePath(collection);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing mock db collection ${collection}:`, error);
  }
};

const generateId = () => {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
};

const mockDb = {
  find: (collection, query = {}) => {
    let items = readData(collection);
    return items.filter(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  },

  findOne: (collection, query = {}) => {
    const items = readData(collection);
    return items.find(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    }) || null;
  },

  findById: (collection, id) => {
    const items = readData(collection);
    return items.find(item => item._id === id) || null;
  },

  create: (collection, data) => {
    const items = readData(collection);
    const newItem = {
      _id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    writeData(collection, items);
    return newItem;
  },

  findByIdAndUpdate: (collection, id, update) => {
    const items = readData(collection);
    const index = items.findIndex(item => item._id === id);
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...update,
      updatedAt: new Date().toISOString()
    };
    writeData(collection, items);
    return items[index];
  },

  findByIdAndDelete: (collection, id) => {
    const items = readData(collection);
    const index = items.findIndex(item => item._id === id);
    if (index === -1) return null;

    const deleted = items.splice(index, 1)[0];
    writeData(collection, items);
    return deleted;
  },

  countDocuments: (collection, query = {}) => {
    return mockDb.find(collection, query).length;
  },

  // Helper to populate refs
  populate: (item, collection, refField, targetCollection) => {
    if (!item) return null;
    const items = Array.isArray(item) ? item : [item];
    
    items.forEach(itm => {
      const refId = itm[refField];
      if (refId) {
        const referencedItem = mockDb.findById(targetCollection, refId);
        itm[refField] = referencedItem || refId;
      }
    });

    return Array.isArray(item) ? items : items[0];
  }
};

module.exports = mockDb;
