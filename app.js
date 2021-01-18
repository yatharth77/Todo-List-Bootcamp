const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

function createListELement(todoValue){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoValue;
    newTodo.classList.add("todo-item");

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerHTML = '<i class="fa fa-pencil"></i>';

    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class="fa fa-check"></i>';

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';

    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(editButton);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
}

function addTodo(event){
    event.preventDefault();
    createListELement(todoInput.value);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
    else if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
    else if(item.classList[0] === "edit-btn"){
        const todo = item.parentElement;
        const todoText = todo.childNodes[0];
        const todoEdit = todo.childNodes[1];

        todoText.contentEditable = "true";
        todoText.style.border = "thin solid #5fbcf5"
        todoEdit.innerHTML = '<i class="fa fa-floppy-o"></i>'

        todoEdit.classList.remove("edit-btn");
        todoEdit.classList.add("save-btn");
    }
    else if(item.classList[0] === "save-btn"){
        const todo = item.parentElement;
        const todoText = todo.childNodes[0];
        const todoEdit = todo.childNodes[1];

        todoText.contentEditable = "false";
        todoText.style.border = "none";
        todoEdit.innerHTML = '<i class="fa fa-pencil"></i>'

        todoEdit.classList.add("edit-btn");
        todoEdit.classList.remove("save-btn");
    }
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        createListELement(todo);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoText = todo.childNodes[0].innerText;
    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}