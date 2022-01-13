const addBtn = document.getElementById('add-btn');
const inputTask = document.getElementById('input-task');
const todoWrapper = document.getElementById('todo-wrappers');
const delBtn = document.getElementById('del-btn');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItem = [];

function Task(input) {
	this.input = input;
	this.completed = false;
}

const createTemplate = (task, index) => {
	return `
		<div class="todo-item ${task.completed ? 'checked' : ''}">	
				<div class="buttons">
					<input onclick='completeTask(${index})' class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
					<div class="description"> <span class = "ez">${task.input}</span></div>
					<button onclick='deleteTask(${index})' class="btn-delete">Удалить</button>
			</div>
		</div>
	`
}


const filterTask = () => {
	const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
	const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
	tasks = [...activeTasks, ...completedTasks];
}

const fillHtmlList = () => {
	todoWrapper.innerHTML = "";
	if (tasks.length > 0) {
		filterTask();
		tasks.forEach((item, index) => {
			todoWrapper.innerHTML += createTemplate(item, index);
		});
		todoItem = document.querySelectorAll('.todo-item');
	}
}

fillHtmlList();

const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
	tasks[index].completed = !tasks[index].completed;
	if (tasks[index].completed) {
		todoItem[index].classList.add('checked');
	} else {
		todoItem[index].classList.remove('checked');
	}
	updateLocal();
	fillHtmlList();

}

addBtn.addEventListener('click', () => {
	tasks.push(new Task(inputTask.value));
	updateLocal();
	fillHtmlList();
	inputTask.value = '';
	check();
})


const deleteTask = index => {
	todoItem[index].classList.add('delition')
	setTimeout(() => {
		tasks.splice(index, 1);
		updateLocal();
		fillHtmlList();
		check();
	}, 500);
}

const check = () => addBtn.disabled = inputTask.value.length < 5;
inputTask.addEventListener('input', check);
check();

