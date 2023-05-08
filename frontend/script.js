let todoList = document.getElementById("todoList");
let saveNewTodo = document.getElementById("saveNewTodo");
let saveNewTodoBtn = document.getElementById("saveNewTodoBtn");

saveNewTodoBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/todo/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({todo: saveNewTodo.value})
    })
    .then(res => res.json())
    .then(data => {
        console.log("after done", data);
        saveNewTodo.value = "";
        printTodos();
    })
})

function printTodos() {
    fetch("http://localhost:3000/todo")
    .then(res => res.json())
    .then(data => {
        console.log("todos: ", data);


        todoList.innerHTML = "";

        data.map(todo => {
            let li = document.createElement("li")
            li.innerText = todo.todo;
            
            li.addEventListener("click", () => {
                console.log("click på " + todo.id);

                saveDone(todo.id);
            })

            todoList.appendChild(li);
        })
    })
}

printTodos();

function saveDone(todoId) {
    fetch("http://localhost:3000/todo/done", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: todoId})
    })
    .then(res => res.json())
    .then(data => {
        console.log("after done", data);
        printTodos();
    })
}