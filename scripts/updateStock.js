const { loadJsonData, saveJsonData } = require('./jsonUtils');

async function updateStock(order) {
    const files = {
        burgers: 'path/to/burgers.json',
        beverages: 'path/to/beverages.json',
        fries: 'path/to/fries.json',
        pasta: 'path/to/pasta.json',
        chicken: 'path/to/chicken.json',
        submarines: 'path/to/submarines.json'
    };

    for (const [category, filePath] of Object.entries(files)) {
        const data = await loadJsonData(filePath);

        order.items.forEach((itemId, index) => {
            const qtyOrdered = parseInt(order.qtys[index], 10);
            const item = data.find(food => food.foodId === itemId);

            if (item) {
                item.stock = (parseInt(item.stock, 10) - qtyOrdered).toString();
            }
        });

        await saveJsonData(filePath, data);
    }
}

module.exports = updateStock;
