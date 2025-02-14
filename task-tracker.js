const fs = require("fs");
const filePath = "./tasks.json";

// function to read tasks
function loadTasks() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf8");
    return data ? JSON.parse(data) : [];
}

// function to save tasks
function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Add Tasks
function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      description,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log("Task added successfully!");
}

// List Tasks
function listTasks(filter = "all") {
  const tasks = loadTasks();
  let filteredTasks = tasks;

  if (filter !== "all") {
      filteredTasks = tasks.filter((task) => task.status === filter);
  }

  if (filteredTasks.length === 0) {
      console.log("No tasks found.");
      return;
  }

  console.log(`\n${filter.toUpperCase()} TASKS:\n`);
  filteredTasks.forEach((task) => {
      console.log(`[${task.id}] ${task.description} - ${task.status} (Updated: ${task.updatedAt})`);
  });
}

// Update Tasks
function updateTask(id, status) {
    const validStatuses = ["todo", "in-progress", "done"];
    if (!validStatuses.includes(status)) {
        console.log(`Invalid status. Use one of: ${validStatuses.join(", ")}`);
        return;
    }

    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex === -1) {
        console.log("Task not found.");
        return;
    }

    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task [${id}] updated to '${status}' successfully!`);
}

// Delete Tasks
function deleteTask(id) {
  let tasks = loadTasks();
  const newTasks = tasks.filter((task) => task.id !== Number(id));

  if (tasks.length === newTasks.length) {
      console.log("Task not found.");
      return;
  }

  saveTasks(newTasks);
  console.log("Task deleted successfully!");
}

// Parse Command-Line Arguments
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
    case "add":
        addTask(args.join(" "));
        break;
    case "list":
        listTasks(args[0] || "all");
        break;
    case "update":
        updateTask(args[0], args[1]);
        break;
    case "delete":
        deleteTask(args[0]);
        break;
    default:
        console.log("Invalid command. Use add, list, update, or delete.");
}
