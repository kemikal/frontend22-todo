let todoList = document.getElementById("todoList");
let saveNewTodo = document.getElementById("saveNewTodo");
let saveNewTodoBtn = document.getElementById("saveNewTodoBtn");
let userForm = document.getElementById("userForm");

if (localStorage.getItem("user")) {
    console.log("Någon är inloggad");
    // VISA LOGGA UT KNAPPEN
    printLogoutButton()
} else {
    console.log("Ingen är inloggad");
    // VISA LOGGA IN FORMULÄR
    printLoginForm();
};

function printLogoutButton() {
    console.log("LOGGA UT");
    // LOGGA UT USER
    userForm.innerHTML = "";

    let logoutBtn = document.createElement("button");
    logoutBtn.innerText = "logga ut";

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        printTodos();
        printLoginForm();
    })

    userForm.appendChild(logoutBtn);
}

function printLoginForm() {
    userForm.innerHTML = "";

    let emailInput = document.createElement("input");
    emailInput.placeholder = "Din epost";
    let passwordInput = document.createElement("input");
    passwordInput.placeholder = "Ditt lösenord";
    let loginBtn = document.createElement("button");
    loginBtn.innerText = "logga in";

    loginBtn.addEventListener("click", () => {
        console.log("Klick på login");

        fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: emailInput.value, password: passwordInput.value})
    })
    .then(res => res.json())
    .then(data => {
        console.log("User inloggad", data);


        if (data.id) {
            localStorage.setItem("user", data.id)
            printLogoutButton();
            printTodos();
        } else {
            console.log("message", data.message);
        }
    })

    })

    userForm.append(emailInput, passwordInput, loginBtn);
}

saveNewTodoBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/todo/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({todo: saveNewTodo.value, user: localStorage.getItem("user")})
    })
    .then(res => res.json())
    .then(data => {
        console.log("after done", data);
        saveNewTodo.value = "";
        printTodos();
    })
})

function printTodos() {

    if (localStorage.getItem("user")) {

        fetch("http://localhost:3000/todo/" + localStorage.getItem("user"))
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
    } else {
        console.log("inga todos");
    }

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