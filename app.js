const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

function addTodo(event){
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
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
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
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