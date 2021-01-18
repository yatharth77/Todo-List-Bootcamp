const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

//generates HTML for todo list
function createListELement(todoValue, index, status){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.add("index-"+index);

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

    if(status === "completed"){
        todoDiv.classList.toggle("completed")
    }
    todoList.appendChild(todoDiv);
}

//adds new todo to list
function addTodo(event){
    event.preventDefault();
    const todoIndex = saveLocalTodos(todoInput.value);
    createListELement(todoInput.value, todoIndex, "uncomplete");
    todoInput.value = "";
}

//delete, edit and toggle complete
function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
        todoIndex = parseInt(todo.classList[1].replace('index-',''));
        removeLocalTodos(todoIndex);
        todo.remove();
    }
    else if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        todoIndex = parseInt(todo.classList[1].replace('index-',''));
        if(todo.classList.contains("completed")){
            updateStatusInStorage(todoIndex, "completed");
        }   
        else{
            updateStatusInStorage(todoIndex, "uncomplete");
        }   
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

        todoIndex = parseInt(todo.classList[1].replace('index-',''));
        newTodoText = todoText.innerText;
        updateTodoInStorage(todoIndex, newTodoText);
    }
}

//fetch todos from storage
function fetchLocalStorage(){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

//creates new todo in storage
function saveLocalTodos(todo){
    let todos = fetchLocalStorage();
    todos.push({todo: todo, index: todos.length + 1, status: "uncomplete"});
    localStorage.setItem("todos", JSON.stringify(todos));
    return todos.length;
}

//render all todos from storage on page load
function getTodos(){
    let todos = fetchLocalStorage();
    todos.forEach(function(todo){
        createListELement(todo["todo"], todo["index"], todo["status"]);
    })
}

//deletes a todo from storage
function removeLocalTodos(todoIndex){
    let todos = fetchLocalStorage();
    todos.forEach(function(todo, index){
        if(todo["index"] == todoIndex){
            todos.splice(index, 1);
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos));
}

//update status of todo in storage
function updateStatusInStorage(todoIndex, status){
    let todos = fetchLocalStorage();
    todos.forEach(function(todo){
        if(todo["index"] == todoIndex){
            todo["status"] = status;
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos));
}

//update todo text in storage
function updateTodoInStorage(todoIndex, newTodoText){
    let todos = fetchLocalStorage();
    todos.forEach(function(todo){
        if(todo["index"] == todoIndex){
            todo["todo"] = newTodoText;
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos));
}