document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const newTaskButton = document.getElementById("newTask");
    const taskList = document.querySelector(".task-list");
    const progressBar = document.getElementById("progress");
    const numbersDisplay = document.getElementById("numbers");

    let tasks = [];

    function updateUI() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item');

            const taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = task.text;

            const taskCheckbox = document.createElement('input');
            taskCheckbox.type = 'checkbox';
            taskCheckbox.checked = task.completed;
            taskCheckbox.addEventListener('change', () => toggleTaskCompletion(index));

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-task');
            removeButton.innerHTML = '<span class="material-icons">delete</span>';
            removeButton.addEventListener('click', () => removeTask(index));

            li.appendChild(taskText);
            li.appendChild(taskCheckbox);
            li.appendChild(removeButton);
            taskList.appendChild(li);
        });

        updateProgress();
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        updateUI();
    }

    function removeTask(index) {
        tasks.splice(index, 1);
        updateUI();
    }

    function updateProgress() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;

        const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        progressBar.style.width = `${progressPercentage}%`;

        numbersDisplay.textContent = `${completedTasks}/${totalTasks}`;
    }

    function addNewTask(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText) {
            const newTask = { text: taskText, completed: false };
            tasks.push(newTask);
            taskInput.value = '';
            updateUI();
        }
    }

    newTaskButton.addEventListener('click', addNewTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addNewTask(event);
        }
    });

    updateUI();
});
