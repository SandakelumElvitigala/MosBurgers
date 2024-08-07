function valueView() {
    document.getElementById('sort').style.display = 'none';
    document.getElementById('val').style.display = 'block';
    document.getElementById('tim').style.display = 'none';
}


// SORT BY TOTAL

fetch('json/order.json')
    .then(response => response.json())
    .then(data => {
        // Get the table body
        const tableBody = document.querySelector('#value');

        // Sort orders by total in descending order
        const sortedOrders = data.sort((a, b) => b.total - a.total);

        // Display sorted orders in the table
        sortedOrders.forEach(order => {
            // Create a table row
            const row = document.createElement('tr');

            row.innerHTML = `
        <td><center>${order.id || 'N/A'}</center></td>
        <td><center>${order.customerName || 'N/A'}</center></td>
        <td><center>${order.customerContact || 'N/A'}</center></td>
        <td><center>${order.total || 'N/A'}</center></td>
        <td><center>${order.dateTime || 'N/A'}</center></td>
        <td><center><button class="btn btn-outline-success" onclick="searchOrder1(${order.id})">View</button></center></td>
    `;

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

    function searchOrder1(orderId) {
        fetch('json/order.json')
            .then(response => response.json())
            .then(data => {
                const order = data.find(order => order.id === orderId);
    
                if (order) {
                    document.getElementById('exampleModalLabel').innerText = `Order ID: ${order.id}`;
                    document.getElementById('cn').innerText = order.customerName || 'N/A';
                    document.getElementById('cc').innerText = order.customerContact || 'N/A';
                    document.getElementById('dt').innerText = order.dateTime || 'N/A';
    
                    const tableBody = document.getElementById('prevtbl1');
                    tableBody.innerHTML = '';
    
                    order.items.forEach((item, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td><center>${item}</center></td>
                            <td><center>${order.qtys[index]}</center></td>
                            <td><center>${order.prices[index]}</center></td>
                            <td><center>${order.discounts[index]}</center></td>
                            <td><center>${order.tot[index]}</center></td>
                        `;
                        tableBody.appendChild(row);
                    });
    
                    // Show the modal using Bootstrap 5 method
                    var myModal = new bootstrap.Modal(document.getElementById('exampleModal1'));
                    myModal.show();
                } else {
                    alert(`No order found with ID ${orderId}`);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
