document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#new-task-form');
    const taskList = document.querySelector('#tasks-list');
    const inputText = document.querySelector('#new-task-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let tasks = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const inputValue = inputText.value;
        tasks.push({ text: inputValue, status: 'pending' });
        inputText.value = '';
        updateTaskList(tasks);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            let filteredTasks;
            if (filter === 'all') {
                filteredTasks = tasks;
            } else {
                filteredTasks = tasks.filter(task => task.status === filter);
            }
            updateTaskList(filteredTasks);
        });
    });

    function updateTaskList(tasksToShow) {
        taskList.innerHTML = tasksToShow.map(task => {
            const taskStatusClass = task.status === 'completed' ? 'task-completed' : '';
            return `<li class="${taskStatusClass}">${task.text}</li>`;
        }).join('');
    }

    taskList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            const selectedTaskText = event.target.textContent;
            const selectedTask = tasks.find(task => task.text === selectedTaskText);

            selectedTask.status = selectedTask.status === 'pending' ? 'completed' : 'pending';
            updateTaskList(tasks);
        }
    });
});
