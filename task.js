// calendar to current day
let today = new Date();

window.addEventListener("DOMContentLoaded", () => {
    currentTime(today);
    dayToggle();
    addTask();

    //clear the storage manually
    //localStorage.clear();

    // reset finish button
    const finishBtn = document.querySelector('.finish-day');
    finishBtn.classList.remove('over');
    finishBtn.textContent = 'Finish Day';


});

// back and forward buttons for dates
function dayToggle() {
    document.querySelector('#back').addEventListener('click', () => {
        today.setDate(today.getDate() - 1);
        currentTime(today);
    });
     document.querySelector('#forward').addEventListener('click', () => {
        today.setDate(today.getDate() + 1);
        currentTime(today);
    });
}

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
    loadTasks(date);
    // reset task bar scroll    
    document.querySelector('.task-board').scrollTop = 0;


}


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

// Format as 'YYYY-MM-DD'
function getDateKey(date) {
  return date.toISOString().split('T')[0];
}

// add task feature
function addTask() {
    const taskInput = document.querySelector("#todo-input");
    const taskForm = document.querySelector('#task-form');
    const taskList = document.querySelector('.task-list');

    taskForm.addEventListener('submit', (e) => {
        
        e.preventDefault(); // prevent form from reloading page

        const taskText = taskInput.value.trim(); // remove whitespaces on edges
        if (taskText === '') return;

        const taskItem = createTask(taskText, false);
        taskList.appendChild(taskItem);

        taskInput.value = '';
        updateProgress();
        saveTasks(today);
    });
}

// create the task and add to ui
function createTask(text, completed) {
    // Create new task item
    const li = document.createElement('li');
    li.classList.add('task-item');

    const circle = document.createElement('span');
    circle.classList.add('circle-toggle');
    if (completed) circle.classList.add('checked');

    const span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = text;
    if (completed) span.classList.add('completed');


    // cricle handlers for toggle
    circle.addEventListener('click', () => {
        circle.classList.toggle('checked');
        span.classList.toggle('completed');
        updateProgress();
        // when task toggled this saves that 
        saveTasks(today);
    });

    let pressTimer;
    li.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            showEditModal(span, li);
        }, 200); // hold for 1 sec
    });

    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt =>
        li.addEventListener(evt, () => clearTimeout(pressTimer))
    );

    li.appendChild(circle);
    li.appendChild(span);
    return li;

};

function showEditModal(spanEl, taskEl) {
    const overlay = document.getElementById('edit-overlay');
    const input = document.getElementById('edit-input');
    const confirmBtn = document.getElementById('confirm-edit');
    const deleteBtn = document.getElementById('delete-task');

    input.value = spanEl.textContent;
    overlay.classList.remove('hidden');
    //input.focus(); //auto focus on input


    // Confirm edit
    confirmBtn.onclick = () => {
    const newText = input.value.trim();
    if (newText !== '') {
      spanEl.textContent = newText;
      saveTasks(today);
    }
    overlay.classList.add('hidden');
    };
    
    // press enter to confirm edit
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // prevents form submission if inside <form>
            const newText = input.value.trim();
            if (newText !== '') {
                spanEl.textContent = newText;
                saveTasks(today);
            }
            overlay.classList.add('hidden');
        }
    });

    // Delete task
    deleteBtn.onclick = () => {
        taskEl.remove();
        updateProgress();
        saveTasks(today);
        overlay.classList.add('hidden');
    };

    // Close modal if clicked outside the modal box
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.add('hidden');
        }
    });
    // Close modal if esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
        overlay.classList.add('hidden');
        }
    });
    
}

// save task for that day
function saveTasks(date) {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        const text = item.querySelector('.task-text').textContent;
        // returns true or false
        const completed = item.querySelector('.circle-toggle').classList.contains('checked');
        tasks.push({ text, completed });
    });
    const key = `tasks-${getDateKey(date)}`;
    localStorage.setItem(key, JSON.stringify(tasks));
}

function loadTasks(date) {
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = ''; // Clear previous day's tasks

  const key = `tasks-${getDateKey(date)}`;
  const stored = localStorage.getItem(key);
  if (!stored) return;

  const tasks = JSON.parse(stored);
  tasks.forEach(task => {
    const taskItem = createTask(task.text, task.completed);
    taskList.appendChild(taskItem);
  });

  updateProgress();
}


// update progress bar
function updateProgress() {
    const total = document.querySelectorAll('.task-item').length;
    const completed = document.querySelectorAll('.circle-toggle.checked').length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    document.querySelector('#progress-bar').value = percent;
};


// finish day toggle
function toggleFinish(date) {
    const finishDay = document.querySelector(".finish-day");
    const dateKey = getDateKey(date);
    // checks if date has already been marked "finished"
    const isFinished = localStorage.getItem(`day-finished-${dateKey}`) === 'true';
    const dateElement = document.querySelector('#date');
    const progressBar = document.querySelector('#progress-bar');
    
     // set initial button
    if (isFinished) {
        finishDay.classList.add('over');
        finishDay.textContent = "Day Over";
        dateElement.classList.add('finish');
        progressBar.classList.add('day-done');
    } else {
        finishDay.classList.remove('over');
        finishDay.textContent = "Finish Day";
        dateElement.classList.remove('finish');
        progressBar.classList.remove('day-done');
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
            progressBar.classList.add('day-done');
        } else {
            newButton.classList.remove('over');
            newButton.textContent = "Finish Day";
            dateElement.classList.remove('finish');
            progressBar.classList.remove('day-done');
        }
        // Save new state to localStorage
        localStorage.setItem(`day-finished-${dateKey}`, updatedState);
    });

};



