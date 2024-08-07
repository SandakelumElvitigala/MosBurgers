function searchOrder1(searchId) {
    

    if (searchId === '') {
        alert('Please enter an Order ID.');
        return;
    }

    fetch('json/order.json')
        .then(response => response.json())
        .then(data => {
            const order = data.find(order => order.id == searchId);

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
                alert(`No order found with ID ${searchId}`);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
