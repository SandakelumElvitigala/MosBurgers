document.addEventListener('DOMContentLoaded', () => {
    fetch('../json/orders.json') // Adjust this to your actual JSON file or API endpoint
        .then(response => response.json())
        .then(data => {
            const lastOrder = data[data.length - 1]; // Get the last order

            const tableBody = document.querySelector('#prevtbl');
            //const totalElement = document.getElementById('total');

            for (let i = 0; i < lastOrder.items.length; i++) {
                const row = document.createElement('tr');

                const itemCell = document.createElement('td');
                itemCell.textContent = lastOrder.items[i];
                row.appendChild(itemCell);

                const qtyCell = document.createElement('td');
                qtyCell.textContent = lastOrder.qtys[i];
                row.appendChild(qtyCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = lastOrder.prices[i];
                row.appendChild(priceCell);

                const discountCell = document.createElement('td');
                discountCell.textContent = lastOrder.discounts[i];
                row.appendChild(discountCell);

                const totalCell = document.createElement('td');
                totalCell.textContent = lastOrder.tot[i];
                row.appendChild(totalCell);

                tableBody.appendChild(row);
            }

            // Set the total value in the footer
            //totalElement.textContent = lastOrder.total;
        })
        .catch(error => console.error('Error fetching data:', error));
});
document.addEventListener('DOMContentLoaded', () => {
    fetch('json/order.json') // Adjust this to your actual JSON file or API endpoint
        .then(response => response.json())
        .then(data => {
            const lastOrder = data[data.length - 1]; // Get the last order

            const tableBody = document.querySelector('#prevtbl');
            //const totalElement = document.getElementById('total');
            let totalFin = 0;
            for (let i = 0; i < lastOrder.items.length; i++) {
                const row = document.createElement('tr');

                const itemCell = document.createElement('td');
                itemCell.textContent = lastOrder.items[i];
                itemCell.style.textAlign = 'center'; // Center align text
                row.appendChild(itemCell);

                const qtyCell = document.createElement('td');
                qtyCell.textContent = lastOrder.qtys[i];
                qtyCell.style.textAlign = 'center'; // Center align text
                row.appendChild(qtyCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = lastOrder.prices[i];
                priceCell.style.textAlign = 'center'; // Center align text
                row.appendChild(priceCell);

                const discountCell = document.createElement('td');
                discountCell.textContent = lastOrder.discounts[i];
                discountCell.style.textAlign = 'center'; // Center align text
                row.appendChild(discountCell);

                const totalCell = document.createElement('td');
                totalCell.textContent = lastOrder.tot[i];
                totalCell.style.textAlign = 'center'; // Center align text
                row.appendChild(totalCell);

                const cleanedString = lastOrder.tot[i].replace(/Rs\.\s*/, '').replace(/,/g, '');

                // Convert the cleaned string to a float and then to an integer
                const amount = parseFloat(cleanedString);
                const amountInt = parseInt(amount, 10);
                totalFin += amountInt;

                tableBody.appendChild(row);
            }
            // Set the total value in the footer
            totalSpan.textContent = totalFin.toFixed(2);
            dtSpan.textContent = lastOrder.dateTime;
            nameSpan.textContent = lastOrder.customerName;
            numSpan.textContent = lastOrder.customerContact;
            invn.textContent = lastOrder.id;
        })
        .catch(error => console.error('Error fetching data:', error));
});
