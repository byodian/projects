const form = document.querySelector('#task-form');
const taskLists = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();
function loadEventListeners () {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskLists.addEventListener('click', deleteTask);
  clearBtn.addEventListener("click", clearList);
  filter.addEventListener('keyup', filterTask);
}

function getTasks() {
  let tasks;

  if (JSON.parse(localStorage.getItem('items')) === null) {
    localStorage.setItem('items', JSON.stringify([]));
  } else {
    tasks = JSON.parse(localStorage.getItem('items'));
    let lis = '';

    tasks.forEach(function(task) {
      lis += `
        <li class="collection-item" data-itemindex="${task.id}">
          ${task.value}
          <a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>
        </li>
      `;
    });

    render(lis, taskLists);
  }
}

function addTask(e) {
  const id = Date.now();
  addTasksToLocalStorage(taskInput.value, id);

  let lis = '';
  const tasks = JSON.parse(localStorage.getItem('items')) || [];

  tasks.forEach(task => {
    lis += `
      <li class="collection-item" data-itemindex="${task.id}">
        ${task.value}
        <a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>
      </li>
    `;
  })
  
  render(lis, taskLists);
  
  taskInput.value = '';
  e.preventDefault();
}

function addTasksToLocalStorage(value, id) {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  localStorage.setItem('items', JSON.stringify(items.concat({value, id})));
}

// function createHTMLElement(tagName, className, text = '') {
//   const el = document.createElement(tagName);
//   el.className = className;
//   el.textContent = text;
//   return el;
// }

function deleteTask(e) {
  if (e.target.matches('.fa-remove')) {
    if (confirm('Do you really want to delete it?')) {

      e.target.parentElement.parentElement.remove();

      const item = e.target.parentElement.parentElement;
      const itemIndex = Number(item.dataset.itemindex);
      removeTaskFromLocalStorage(item, itemIndex);
    }
  }
}

function removeTaskFromLocalStorage(item, itemIndex) {
  const items = JSON.parse(localStorage.getItem('items'));
  const newItems = items.filter(item => item.id !== itemIndex);
  localStorage.setItem('items', JSON.stringify(newItems));
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  const items = document.querySelectorAll('.collection-item');
  items.forEach(function(item) {
    if (item.textContent.toLowerCase().indexOf(text) !== -1) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  })
}

function clearList() {
  while (taskLists.firstChild) {
    taskLists.removeChild(taskLists.firstChild);
  }

  clearTasksFromLocalStorage('items');
}

function clearTasksFromLocalStorage(items) {
  localStorage.removeItem(items)
}

function render(template, node) {
  if (!node) return;
  node.innerHTML= template;
}