document.getElementById('refreshButton').addEventListener('click', function () {
            location.reload();
        });



        let cart1 = [];
        let items = []; // To store item IDs
        let qtys = [];
        let total = 0;
        let gt = 0;


        // Function to transfer cart data to modal
        function transferCartDataToModal() {
            const cartTable = document.querySelector('#cart tbody');
            const modalCartTableContainer = document.getElementById('modalCartTableContainer');

            // Clear any previous content in the modal container
            modalCartTableContainer.innerHTML = '';

            // Create a new table element
            const modalCartTable = document.createElement('table');
            modalCartTable.classList.add('table', 'table-striped');

            // Create table header
            const thead = document.createElement('thead');
            thead.innerHTML = `
        <tr>
            <th>Item Code</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Discount</th>
            <th>Total</th>
        </tr>
    `;
            modalCartTable.appendChild(thead);

            // Create table body
            const tbody = document.createElement('tbody');

            // Initialize total
            let total = 0;

            // Iterate through cart table rows and clone them to the modal table
            cartTable.querySelectorAll('tr').forEach(row => {
                const newRow = row.cloneNode(true);
                tbody.appendChild(newRow);

                // Calculate total for each row
                const rowTotal = parseFloat(newRow.querySelector('td:nth-child(5)').textContent.replace('Rs.', ''));
                total += rowTotal;
            });

            modalCartTable.appendChild(tbody);

            // Create a footer row for the total
            const tfoot = document.createElement('tfoot');
            tfoot.innerHTML = `
        <tr>
            <td colspan="4" style="text-align: right;"><strong>Grand Total:</strong></td>
            <td><strong>Rs.${total.toFixed(2)}</strong></td>
        </tr>
    `;
            modalCartTable.appendChild(tfoot);

            modalCartTableContainer.appendChild(modalCartTable);
        }

        // Function to get food IDs from modal
        function getFoodIdsFromModal() {
            const modalCartTableContainer = document.getElementById('modalCartTableContainer');
            const foodIds = []; // Array to store food IDs

            // Find all table rows in the modal
            modalCartTableContainer.querySelectorAll('tbody tr').forEach(row => {
                // Assuming the food ID is in the first cell of the row
                const foodIdCell = row.querySelector('td:nth-child(1)'); // Adjust the index if needed
                if (foodIdCell) {
                    const foodId = foodIdCell.textContent.trim();
                    foodIds.push(foodId);
                }
            });

            console.log('Food IDs from modal:', foodIds);
            return foodIds;
        }

        function getFoodQtyFromModal() {
            const modalCartTableContainer = document.getElementById('modalCartTableContainer');
            const foodQtys = []; // Array to store food quantities

            // Find all table rows in the modal
            modalCartTableContainer.querySelectorAll('tbody tr').forEach(row => {
                // Assuming the quantity is in the second cell of the row
                const foodQtCell = row.querySelector('td:nth-child(2)'); // Adjust the index if needed
                if (foodQtCell) {
                    const foodQt = foodQtCell.textContent.trim();
                    foodQtys.push(foodQt);
                }
            });

            console.log('Food Quantities from modal:', foodQtys);
            return foodQtys;
        }

        function getFoodDisFromModal() {
            const modalCartTableContainer = document.getElementById('modalCartTableContainer');
            const foodDis = []; // Array to store food quantities

            // Find all table rows in the modal
            modalCartTableContainer.querySelectorAll('tbody tr').forEach(row => {
                // Assuming the quantity is in the second cell of the row
                const foodDCell = row.querySelector('td:nth-child(4)'); // Adjust the index if needed
                if (foodDCell) {
                    const foodD = foodDCell.textContent.trim();
                    foodDis.push(foodD);
                }
            });

            console.log('Food Discounts from modal:', foodDis);
            return foodDis;
        }

        function getFoodTotFromModal() {
            const modalCartTableContainer = document.getElementById('modalCartTableContainer');
            const foodTot = []; // Array to store food quantities

            // Find all table rows in the modal
            modalCartTableContainer.querySelectorAll('tbody tr').forEach(row => {
                // Assuming the quantity is in the second cell of the row
                const foodTCell = row.querySelector('td:nth-child(5)'); // Adjust the index if needed
                if (foodTCell) {
                    const foodT = foodTCell.textContent.trim();
                    foodTot.push(foodT);
                }
            });

            console.log('Food tot from modal:', foodTot);
            return foodTot;
        }

        function getGtotFromModal() {
            const tt = getFoodTotFromModal();

            const total = tt.reduce((sum, value) => {
                // Remove the "Rs." part and convert the remaining string to a number
                const number = parseFloat(value.replace("Rs.", "").replace(",", ""));
                return sum + number;
            }, 0);

            console.log(total);
            return total;
        }

        function getFoodPriceFromModal() {
            const modalCartTableContainer = document.getElementById('modalCartTableContainer');
            const foodPrices = []; // Array to store food prices

            // Find all table rows in the modal
            modalCartTableContainer.querySelectorAll('tbody tr').forEach(row => {
                // Assuming the price is in the third cell of the row
                const foodPriceCell = row.querySelector('td:nth-child(3)'); // Adjust the index if needed
                if (foodPriceCell) {
                    const foodPrice = foodPriceCell.textContent.trim();
                    foodPrices.push(foodPrice);
                }
            });

            console.log('Food Prices from modal:', foodPrices);
            return foodPrices;
        }





        // Event listeners
        document.querySelector('.btn.btn-success[data-bs-target="#staticBackdrop"]').addEventListener('click', transferCartDataToModal);


        function getSriLankanDateTime() {
            return new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Colombo',
                dateStyle: 'full',
                timeStyle: 'long'
            }).format(new Date());
        }



        // Function to confirm order
        function confirmOrder() {
            console.log('Cart at confirmOrder:', cart1); // Check the contents of cart

            // Validate cart and customer details
            const customerName = document.querySelector('#customer-name').value;
            const customerContact = document.querySelector('#customer-contact').value;

            if (!customerName || !customerContact) {
                alert('Please provide your name and contact number.');
                return;
            }

            // Update items array with food IDs from the modal
            const foodItemIds = getFoodIdsFromModal();
            const foodItemQtys = getFoodQtyFromModal();
            const foodPrices = getFoodPriceFromModal();
            const foodDiscounts = getFoodDisFromModal();
            const foodTotal = getFoodTotFromModal();
            const totalG = getGtotFromModal();
            console.log('Food Item IDs:', foodItemIds);
            console.log('Food Item Quantities:', foodItemQtys);
            console.log('Food Prices:', foodPrices);
            console.log('Food Discounts:', foodDiscounts);
            console.log('Food Total:', foodTotal);
            console.log('G Total:', totalG);


            // Create the new order
            const newOrder = {
                id: Date.now(),
                items: foodItemIds,
                qtys: foodItemQtys,
                prices: foodPrices,
                discounts: foodDiscounts,
                tot: foodTotal,
                total: totalG,
                customerName: customerName,
                customerContact: customerContact,
                dateTime: getSriLankanDateTime()
            };
            console.log('New Order:', newOrder); // Check the new order object

            // Send order to server
            fetch('/addOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder)
            })
                .then(response => {
                    // Log the response status to check if the request is successful
                    console.log('Response Status:', response.status);

                    if (!response.ok) {
                        // If response is not ok, log the status text
                        console.error('Failed to add order:', response.statusText);
                        throw new Error('Failed to add order');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Order added:', data);
                    cart1.length = 0; // Clear the cart
                    updateCart1(); // Refresh cart display

                    // Ensure modal exists before trying to hide it
                    const billModalElement = document.getElementById('staticBackdrop');
                    if (billModalElement) {
                        const billModal = bootstrap.Modal.getInstance(billModalElement);
                        if (billModal) {
                            billModal.hide();
                        } else {
                            console.error('Modal instance not found');
                        }
                    } else {
                        console.error('Modal element not found');
                    }
                })
                .catch(error => console.error('Error:', error));
        }



