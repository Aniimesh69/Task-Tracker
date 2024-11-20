const fs = require('fs');
const inquirer = require('inquirer');

// Helper function to read todos
const readTodos = () => {
  const data = fs.readFileSync('todos.json', 'utf-8');
  return JSON.parse(data);
};

// Helper function to write todos
const writeTodos = (todos) => {
  fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
};

// 1. Add a todo
const addTodo = async () => {
  const { task } = await inquirer.prompt({
    name: 'task',
    message: 'What task would you like to add?',
  });
  
  const todos = readTodos();
  const newTodo = { id: Date.now(), task, done: false };
  todos.push(newTodo);
  writeTodos(todos);
  console.log('Task added successfully!');
};

// 2. Delete a todo
const deleteTodo = async () => {
  const todos = readTodos();
  const { id } = await inquirer.prompt({
    name: 'id',
    type: 'list',
    message: 'Select a task to delete',
    choices: todos.map(todo => ({ name: todo.task, value: todo.id })),
  });
  
  const updatedTodos = todos.filter(todo => todo.id !== id);
  writeTodos(updatedTodos);
  console.log('Task deleted successfully!');
};

// 3. Mark a todo as done
const markAsDone = async () => {
  const todos = readTodos();
  const { id } = await inquirer.prompt({
    name: 'id',
    type: 'list',
    message: 'Select a task to mark as done',
    choices: todos.filter(todo => !todo.done).map(todo => ({ name: todo.task, value: todo.id })),
  });

  const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, done: true } : todo);
  writeTodos(updatedTodos);
  console.log('Task marked as done!');
};

// 4. Helper function to display all todos
const viewTodos = () => {
    const todos = readTodos();
    console.log("\nYour current todos:\n");
    todos.forEach((todo, index) => {
      console.log(`${index + 1}. ${todo.task} - ${todo.done ? "Done" : "Not Done"}`);
    });
    console.log("\n");
  };

// Main function to interact with CLI
const runCLI = async () => {
  const { action } = await inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['Add a todo', 'Delete a todo', 'Mark a todo as done', 'View all todos', 'Exit'],
  });

  switch (action) {
    case 'Add a todo':
      await addTodo();
      break;
    case 'Delete a todo':
      await deleteTodo();
      break;
    case 'Mark a todo as done':
      await markAsDone();
      break;
    case 'View all todos':
      await viewTodos();
      break;
    default:
      console.log('Exiting...');
      return;
  }

  runCLI(); // Restart CLI after each action
};

runCLI();
