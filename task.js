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

    // reset finish button
    const finishBtn = document.querySelector('.finish-day');
    finishBtn.classList.remove('over');
    finishBtn.textContent = 'Finish Day';
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
    
    const finishBtn = document.querySelector('.finish-day');
    finishBtn.classList.remove('over');
    finishBtn.textContent = 'Finish Day';
};



// toggle circles
const circles =  document.querySelectorAll(".circle-toggle");
    circles.forEach(circle => {
        circle.addEventListener('click', () => {
            circle.classList.toggle('checked');
            const taskText = circle.nextElementSibling;
            taskText.classList.toggle('completed');
        });
    });


const finishDay = document.querySelector(".finish-day");
finishDay.addEventListener('click', () => {
    const isFinished = finishDay.classList.toggle('over');
    if (isFinished) {
        finishDay.textContent = "Day Over"
    }
    else {
         finishDay.textContent = 'Finish Day';
    }
   
});


