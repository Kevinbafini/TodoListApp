document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#new-task-form');
    const inputText = document.querySelector('#new-task-input');
    const taskList = document.querySelector('#tasks-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let tasks = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = inputText.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, status: 'pending' });
            inputText.value = '';
            updateTaskList();
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateTaskList(this.getAttribute('data-filter'));
        });
    });

    function updateTaskList(filter = 'all') {
        taskList.innerHTML = tasks.filter(task => filter === 'all' || task.status === filter).map((task, index) => (
            `<li>
                <span class="${task.status === 'completed' ? 'task-completed' : ''}" onclick="toggleTaskStatus(${index})">${task.text}</span>
                <button class="delete-button" onclick="removeTask(${index})">🗑️</button>
            </li>`
        )).join('');
    }

    window.toggleTaskStatus = function(index) {
        tasks[index].status = tasks[index].status === 'pending' ? 'completed' : 'pending';
        updateTaskList(document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all');
    };

    window.removeTask = function(index) {
        tasks.splice(index, 1);
        updateTaskList(document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all');
    };
});
