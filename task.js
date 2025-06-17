// calendar to current day
let today = new Date();

window.addEventListener("DOMContentLoaded", () => {
    currentTime(today);

     document.querySelector('#back').addEventListener('click', () => {
        today.setDate(today.getDate() - 1);
        currentTime(today);
    });

     document.querySelector('#forward').addEventListener('click', () => {
        today.setDate(today.getDate() + 1);
        currentTime(today);
    });
});


function currentTime(date) {
    const dayElement = document.querySelector('#day');
    const dateElement = document.querySelector('#date');
    const monthElement = document.querySelector('#month');

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const monthsOfYear = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    dayElement.textContent = daysOfWeek[today.getDay()];
    dateElement.textContent = String(today.getDate()).padStart(2,'0');
    monthElement.textContent = monthsOfYear[today.getMonth()];
    
};



