# Get Sh\*t Done

A sleek, pixel-art-inspired desktop to-do list app built with Electron and vanilla JavaScript. Organize your daily tasks, track progress, and finish your day with style.

---

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Contributors](#contributors)
- [License](#license)

---

## Introduction

**Get Sh\*t Done** is a to-do list application with a strong visual design. It's built using [Electron](https://electronjs.org) and features a custom UI styled with pixel fonts and color themes. Easily add, edit, complete, and track tasks daily with animated feedback and local persistence.

---
## Demo

![Get Sh*t Done 01](https://github.com/ShafinRezwan/ToDoList/blob/295b91ae833b5a7b286ebab08068d25215e35f58/Wireframes/01%20Current%20Day.png)
![Get Sh*t Done 02](https://github.com/ShafinRezwan/ToDoList/blob/6a7d2e7aeb1967619da3fbfb71613e263b8459bf/Wireframes/03%20Check%20off.png)
![Get Sh*t Done 03](https://github.com/ShafinRezwan/ToDoList/blob/6a7d2e7aeb1967619da3fbfb71613e263b8459bf/Wireframes/04%20Hold%20Click.png) <br>
*A quick look at adding and editing tasks, marking them complete, and finishing your day!*

---

## Features

- 📅 **Daily Task Management** – Tasks saved per date using `localStorage`
- ✅ **Visual Task Completion** – Toggle tasks with stylish circle indicators
- 📝 **Edit/Delete Tasks** – Long-press on a task to modify or remove
- 📊 **Progress Tracker** – Dynamic progress bar updates as tasks are completed
- 🏁 **Finish Day Toggle** – Mark the day complete with styling feedback
- 🖼️ **Retro UI** – Pixel font, vibrant colors, and responsive layout

---

## Installation

1. Clone the repository
    ```bash
   git clone https://github.com/your-username/todo-electron-app.git
   cd todo-electron-app
2. Install dependencies
   ```npm install```  
3. Install ElectronJS
```npm install --save-dev electron```
4. Run the application
```npm run start```

## Usage
Add a Task: Type into the input and click the "+" button.

Mark Complete: Click the yellow circle to toggle.

Edit/Delete: Long-press a task to open the modal.

Date Navigation: Use < and > to change the active day.

Finish Day: Click "Finish Day" to lock the day's progress.

## Configuration
No extra configuration is needed. Tasks and finished states are stored using the browser's localStorage with date-specific keys (tasks-YYYY-MM-DD).

## Dependencies
Electron ^36.4.0
Check package.json for exact versions and development dependencies.


## Contributors
ShafinRezwan – Creator and Developer
