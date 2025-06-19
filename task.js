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

    addTask();
    

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
    
    toggleFinish(date);
    
 
};



// toggle circles this only runs on page load and doesnt apply to dynamically added circles
/*
const circles =  document.querySelectorAll(".circle-toggle");
    circles.forEach(circle => {
        circle.addEventListener('click', () => {
            circle.classList.toggle('checked');
            const taskText = circle.nextElementSibling;
            taskText.classList.toggle('completed');
            updateProgress();
        });
        taskInput.value = '';
        updateProgress();
    });
*/

// finish day toggle
function toggleFinish(date) {
    const finishDay = document.querySelector(".finish-day");
    const dateKey = getDateKey(date);
    // checks if date has already been marked "finished"
    const isFinished = localStorage.getItem(`day-finished-${dateKey}`) === 'true';
    const dateElement = document.querySelector('#date');
    
     // set initial button
    if (isFinished) {
        finishDay.classList.add('over');
        finishDay.textContent = "Day Over";
        dateElement.classList.add('finish');
    } else {
        finishDay.classList.remove('over');
        finishDay.textContent = "Finish Day";
        dateElement.classList.remove('finish');
    }

    // Remove old event listener if one exists
    // clone button without previously attached event listeners
    const newButton = finishDay.cloneNode(true); 
    finishDay.parentNode.replaceChild(newButton, finishDay);

    newButton.addEventListener('click', () => {
        const updatedState = !newButton.classList.contains('over');

        // Update state when button is clicked
        if (updatedState) {
            newButton.classList.add('over');
            newButton.textContent = "Day Over";
            dateElement.classList.add('finish');
        } else {
            newButton.classList.remove('over');
            newButton.textContent = "Finish Day";
            dateElement.classList.remove('finish');
        }
        // Save new state to localStorage
        localStorage.setItem(`day-finished-${dateKey}`, updatedState);
    });

};

  // Format as 'YYYY-MM-DD'
function getDateKey(date) {
  return date.toISOString().split('T')[0];
}

// add task 

function addTask() {
    const taskInput = document.querySelector("#todo-input");
    const taskForm = document.querySelector('#task-form');
    const taskList = document.querySelector('.task-list');

    taskForm.addEventListener('submit', (e) => {
        
        e.preventDefault(); // prevent form from reloading page

        const taskText = taskInput.value.trim(); // remove whitespaces on edges
        if (taskText === '') return;
       
        // Create new task item
        const li = document.createElement('li');
        li.classList.add('task-item');

        // create bullet point
        const circle = document.createElement('span');
        circle.classList.add('circle-toggle');

        // create text
        const text = document.createElement('span');
        text.classList.add('task-text');
        text.textContent = taskText;

        li.appendChild(circle);
        li.appendChild(text);
        taskList.appendChild(li);

        const circles =  document.querySelectorAll(".circle-toggle");
        circles.forEach(circle => {
            circle.addEventListener('click', () => {
                circle.classList.toggle('checked');
                const taskText = circle.nextElementSibling;
                taskText.classList.toggle('completed');
                updateProgress();
            });
            taskInput.value = '';
            updateProgress();
        });

    });
};


function updateProgress() {
    const total = document.querySelectorAll('.task-item').length;
    const completed = document.querySelectorAll('.circle-toggle.checked').length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    document.querySelector('#progress-bar').value = percent;
};



