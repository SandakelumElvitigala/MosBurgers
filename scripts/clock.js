
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;

    if(hours>=12){document.getElementById('time').innerHTML="PM";}
    else{document.getElementById('time').innerHTML="AM";}
}

function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);

    document.getElementById('date').textContent = dateString;
}

updateClock();
setInterval(updateClock, 1000);
updateDate();
