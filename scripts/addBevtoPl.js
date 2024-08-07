// Fetch initial data from JSON files
function fetchDataAndUpdateStorage() {
    const subJsonUrl = `../json/beverages.json?timestamp=${new Date().getTime()}`;
    const foodIdJsonUrl = `../json/foodId.json?timestamp=${new Date().getTime()}`;

    Promise.all([
        fetch(subJsonUrl).then(response => response.json()),
        fetch(foodIdJsonUrl).then(response => response.json())
    ])
    .then(([subData, foodIdData]) => {
        console.log('Fetched sub data:', subData);
        console.log('Fetched food ID data:', foodIdData);
        localStorage.setItem('beverages', JSON.stringify(subData));
        localStorage.setItem('foodId', JSON.stringify(foodIdData.foodIds));
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

// Call the function initially to load the data
fetchDataAndUpdateStorage();

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
function displayData6() {
    const container = document.getElementById('data-container6');
    if (!container) {
        console.error('Container not found!');
        return;
    }

    const items = JSON.parse(localStorage.getItem('beverages'));
    console.log('Items to display:', items);
    container.innerHTML = '';

    items.forEach((item, index) => {
        if (item.type === "beverages") {
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
                            <input type="number" id="numberInput-${item.foodId}" class="number-input" value="1" min="1">
                            <button class="btn btn-success" onclick="addToCart1('${item.foodId}', ${item.price}, ${item.discount})">Add to cart</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    });
}

// Function to add an item to the cart
function addToCart1(foodId, price, discount) {
    const items = JSON.parse(localStorage.getItem('beverages'));
    const foodIds = JSON.parse(localStorage.getItem('foodIds'));

    const index = foodIds.indexOf(foodId);
    if (index === -1) {
        console.error('Food ID not found:', foodId);
        return;
    }

    const item = items[index];
    const quantityInput = document.getElementById(`numberInput-${foodId}`);
    const quantity = parseInt(quantityInput.value, 10);

    if (quantity <= 0) {
        alert('Please enter a quantity greater than 0.');
        return;
    }

    const cartTable = document.querySelector('#cart tbody');

    
    // Create a new row for the item
    const row = document.createElement('tr');
    row.setAttribute('data-id', foodId);
    row.innerHTML = `
        <td><center>${foodId}</center></td>
        <td class="qty"><center>${quantity}</center></td>
        <td><center>Rs.${price}</center></td>
        <td><center>${discount}%</center></td>
        <td><center>Rs.${((price - (price * discount / 100)) * quantity).toFixed(2)}</center></td>
    `;
    cartTable.appendChild(row);

    updateCartTotal();
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
    });

    document.getElementById('totalSpan').textContent = `Rs.${total.toFixed(2)}`;
}


