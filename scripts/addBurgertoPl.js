// Fetch initial data from JSON file
fetch('../json/burger.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched data:', data); // Debug: Check fetched data
        if (!localStorage.getItem('items')) {
            localStorage.setItem('items', JSON.stringify(data));
        }
        displayData1();
    })
    .catch(error => console.error('Error fetching JSON:', error)); // Debug: Handle fetch errors

// Function to check if an image exists
function checkImage(src, callback) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = src;
}

// Function to get valid image source
function getImageSrc(item, callback) {
    const baseSrc = "foodImages/" + item.foodId;
    const extensions = ['.jpeg', '.jpg', '.png'];

    let i = 0;
    function tryNext() {
        if (i < extensions.length) {
            const src = baseSrc + extensions[i];
            checkImage(src, (exists) => {
                if (exists) {
                    callback(src);
                } else {
                    i++;
                    tryNext();
                }
            });
        } else {
            // Default fallback image
            callback('foodImages/default.jpg');
        }
    }

    tryNext();
}

// Function to display data
function displayData1() {
    const container = document.getElementById('data-container2');
    const items = JSON.parse(localStorage.getItem('items'));
    console.log('Items to display:', items); // Debug: Check items to display
    container.innerHTML = '';
    items.forEach((item, index) => {
        if (item.type === "burger") {
            getImageSrc(item, (imgSrc) => {
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                    <div class="card foodcard" style="width: 18rem; background:rgba(253, 253, 253, 0.755);">
                        <img src="${imgSrc}" class="card-img-top" style="height:20vh;" alt="${item.foodName}">
                        <div class="card-body">
                            <h6 class="card-title" style="font-weight:700;">${item.foodName}&nbsp|&nbsp${item.foodId}</h6>
                            <p class="card-text">Rs.${item.price}</p>
                            <p class="card-text">Discount: ${item.discount}%</p>
                            <input type="number" id="numberInput-${index}" class="number-input" value="1" min="1">
                            <button class="btn btn-success" onclick="addToCart(${index})">Add to cart</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    });
}

// Function to add an item to the cart
function addToCart(index) {
    const items = JSON.parse(localStorage.getItem('items'));
    const item = items[index];
    const quantityInput = document.getElementById(`numberInput-${index}`);
    const quantity = parseInt(quantityInput.value, 10);

    if (quantity <= 0) {
        alert('Please enter a quantity greater than 0.');
        return;
    }

    const cartTable = document.querySelector('#cart tbody');

    // Create a new row for the item
    const row = document.createElement('tr');
    let dis = item.discount || 0;
    row.setAttribute('data-id', item.foodId);
    row.innerHTML = `
        <td><center>${item.foodId}</center></td>
        <td class="qty"><center>${quantity}</center></td>
        <td><center>Rs.${item.price}</center></td>
        <td><center>${dis}%</center></td>
        <td class="ttl"><center>Rs.${((item.price - (item.price * dis / 100)) * quantity).toFixed(2)}</center></td>
    `;
    cartTable.appendChild(row);

    updateCartTotal();
    updateStock(item.foodId, quantity);
}

// Function to update stock and send changes to the server
// Function to update stock and send changes to the server
function updateStock(idFood, quant) {
    const items = JSON.parse(localStorage.getItem('items')) || [];

    console.log('Items from localStorage:', items); // Debug: Check items

    const item = items.find(item => item.foodId === idFood);
    if (item) {
        console.log('Found item:', item); // Debug: Check found item

        item.stock = parseInt(item.stock, 10);
        quant = parseInt(quant, 10);

        if (item.stock >= quant) {
            item.stock -= quant;
            localStorage.setItem('items', JSON.stringify(items));
            console.log(`Stock updated for ${idFood}: New stock is ${item.stock}`);

            // Send updated data to the server
            fetch('/update-burger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                console.log('Server response:', data);
                displayData1(); // Re-render data to show updated stock
            })
            .catch(error => console.error('Error updating server JSON:', error));
        } else {
            console.error(`Not enough stock for item with foodId ${idFood}. Current stock: ${item.stock}, Requested quantity: ${quant}`);
        }
    } else {
        console.error(`Item with foodId ${idFood} not found`);
    }
}



// Function to update cart total
function updateCartTotal() {
    const cartTable = document.querySelector('#cart tbody');
    let total = 0;

    cartTable.querySelectorAll('tr').forEach(row => {
        const quantity = parseInt(row.querySelector('.qty').textContent, 10);
        const price = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace('Rs.', ''));
        const discount = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace('%', ''));
        const discountedPrice = price - (price * discount / 100);
        total += quantity * discountedPrice;
        console.log("QTY1 :", quantity);
    });

    document.getElementById('totalSpan').textContent = `Rs.${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(foodId) {
    const cartTable = document.querySelector('#cart tbody');
    const rowToRemove = cartTable.querySelector(`tr[data-id="${foodId}"]`);
    if (rowToRemove) {
        cartTable.removeChild(rowToRemove);
        updateCartTotal();
    } else {
        console.error('Item not found in cart:', foodId);
    }
}

// Function to add a new item
function addItem() {
    const items = JSON.parse(localStorage.getItem('items'));
    const newItem = {
        id: items.length + 1,
        foodName: `Item ${items.length + 1}`,
        img: `image${items.length + 1}.jpg`,
        price: 0,
        discount: 0
    };
    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
}
