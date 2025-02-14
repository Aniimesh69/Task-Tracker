# **Task Tracker**

Task tracker is a project used to track and manage your tasks. In this task, I have build a simple command line interface (CLI) to track what I need to do, what I have done, and what I am currently working on.

## Requirements
The application runs from the command line, accept user actions and inputs as arguments, and store the tasks in a JSON file. The user should be able to:

- Add, Update, and Delete tasks
- Mark a task as in progress or done
- List all tasks
- List all tasks that are done
- List all tasks that are not done
- List all tasks that are in progress

## Example
The list of commands and their usage is given below:
![image](https://github.com/user-attachments/assets/4e486b29-b3cb-4907-9239-dd2929071562)


## Task Properties
Each task should have the following properties:

- id: A unique identifier for the task
- description: A short description of the task
- status: The status of the task (todo, in-progress, done)
- createdAt: The date and time when the task was created
- updatedAt: The date and time when the task was last updated

## Commands
- Add Task: node task-tracker add "Task description"
- List All Task: node task-tracker list
- List All Task by Status: node task-tracker list <status>
- Update Task: node task-tracker update <task_id> <new_status>
- Delete Task: node task-tracker delete <task_id>
- View a Single Task(by ID): node task-tracker view <task_id>

## Project URL
https://roadmap.sh/projects/task-tracker
