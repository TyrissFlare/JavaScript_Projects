document.addEventListener("DOMContentLoaded", function() {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const clearCompletedBtn = document.getElementById("clearCompletedBtn");

    addTaskBtn.addEventListener("click", addTask);
    clearCompletedBtn.addEventListener("click", clearCompleted);
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const task = taskInput.value.trim();
    
    if (task !== "") {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        li.appendChild(checkbox);
        const taskText = document.createElement("span");
        taskText.textContent = task;
        li.appendChild(taskText);
        taskList.appendChild(li);
        taskInput.value = "";
    }
}

function clearCompleted() {
    const taskList = document.getElementById("taskList");
    const completedTasks = taskList.querySelectorAll(".checkbox:checked");

    completedTasks.forEach(function(task) {
        task.parentElement.remove();
    });
}