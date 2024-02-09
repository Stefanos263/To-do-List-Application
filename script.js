// συνδεση με τα  HTML elements
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskCategorySelect = document.getElementById('taskCategory');

// Event listener για να κανουμε submit την φορμα
taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); // αποφυγη απο μονο του form submission

  // λαμβανω τα input values
  const taskTitle = document.getElementById('taskTitle').value;
  const taskDescription = document.getElementById('taskDescription').value;
  const taskCategory = taskCategorySelect.value;
  const taskReminder = document.getElementById('taskReminder').value;

  // δημιουργια task object
  const task = {
    title: taskTitle,
    description: taskDescription,
    category: taskCategory,
    reminder: taskReminder,
    completed: false
  };

  // προσθηκη task στην λιστα
  addTask(task);

  // Reset ολα τα πεδια της φορμας
  taskForm.reset();
});

// Function για προσθηκη ενος καινουργιου task στην λιστα
function addTask(task) {
  // δημιουργια ενος task
  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <input type="checkbox">
    <span>${task.title}</span>
    <span class="category">${task.category}</span>
    <span class="reminder">${task.reminder}</span>
    <button>Delete</button>
  `;

  // προσθηκη event listener για την ολοκληρωση του task
  const checkbox = taskItem.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', function() {
    task.completed = !task.completed;
    if (task.completed) {
      taskItem.classList.add('complete');
    } else {
      taskItem.classList.remove('complete');
    }
  });

  // προσθηκη event listener για την διαγραφη του task
  const deleteButton = taskItem.querySelector('button');
  deleteButton.addEventListener('click', function() {
    taskList.removeChild(taskItem);
  });

  // Append το  task στην λιστα
  taskList.appendChild(taskItem);
}

// βαζω καποιες ενδικτικες κατηγοριες σε ενα dropdown
const categories = ['Work', 'Personal', 'Shopping', 'Study', 'Other'];
categories.forEach(category => {
  const option = document.createElement('option');
  option.textContent = category;
  taskCategorySelect.appendChild(option);
});
