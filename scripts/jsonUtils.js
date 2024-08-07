const fs = require('fs').promises;

// Load JSON data
async function loadJsonData(filePath) {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

// Save JSON data
async function saveJsonData(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
    loadJsonData,
    saveJsonData
};
