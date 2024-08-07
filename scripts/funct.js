function goBack() {
    window.history.back();
}

function reDirect(pageUrl) {
    window.location.href = pageUrl ;
}

function openDivs(pageUrl,divId){
    window.location.href = pageUrl + '?show=' + divId;
}

let foodIds = [];

fetch('json/foodId.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        foodIds = data.foodIds;
    })
    .catch(error => console.error('Error fetching foodIds:', error));
