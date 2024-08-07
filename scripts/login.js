// Function to get the value of the input field
function getInputValue() {
    // Get the input field element by its ID
    const inputElement = document.getElementById('passkey');

    // Get the value of the input field
    const enteredPasskey = inputElement.value;

    // Fetch and process login.json data
    fetchLoginData(enteredPasskey);
}

// Function to fetch and process login.json data
async function fetchLoginData(enteredPasskey) {
    try {
        // Fetch the JSON file
        const response = await fetch('../json/login.json'); // Update with the correct path
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data
        const data = await response.json();

        // Check if the entered passkey exists in the JSON data
        const user = data.find(user => user.contact === enteredPasskey);

        if (user) {
            // Passkey is valid, redirect to home.html
            window.location.href = 'home.html';
        } else {
            // Passkey is invalid, show an error message
            alert('Invalid passkey. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching login data:', error);
        alert('There was an error processing your request. Please try again later.');
    }
}
