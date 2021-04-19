const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todo){
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if(todoText){
        const todoELement = document.createElement("li");

        if (todo && todo.completed) {
            todoELement.classList.add("completed");
        }
        todoELement.innerText = todoText;

        todoELement.addEventListener("click", () => {
            todoELement.classList.toggle("completed");

            updateTD();
        });


        /*Double click to remove action */
        todoELement.addEventListener("dblclick", (e) => {
            e.preventDefault();

            todoELement.remove();

            updateTD();
        });

        todosUL.appendChild(todoELement);

        input.value = "";

        updateTD();
    }
}

function updateTD() {
    const todosElement = document.querySelectorAll("li");
    
    todosElement.forEach((todoElement) => {
        todos.push({
            text: todoElement.innerText,
            completed: todoElement.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}