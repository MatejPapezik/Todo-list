let Input_task = document.getElementById("Input_task");
let Show_list = document.getElementById("Show_list");
let warningMessage = document.getElementById("Warning_message");
let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    Update_list();
}

function Update_list() {
    Show_list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        // Text úkolu
        let span = document.createElement("span");
        span.innerHTML = tasks[i].text;

        // Checkbox pro oznaceni jako hotovo
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.index = i;
        checkbox.checked = tasks[i].done;
        checkbox.addEventListener("click", Checkbox_function);

        // Tlacitko pro smazani ukolu
        const button = document.createElement("button");
        button.dataset.index = i;
        button.innerHTML = "X";
        button.addEventListener("click", Button_function);

        // Pravá strana - checkbox + tlacitko
        let rightSide = document.createElement("div");
        rightSide.classList.add("right_side");
        rightSide.appendChild(checkbox);
        rightSide.appendChild(button);

        // Slozeni celeho radku ukolu
        let li = document.createElement("li");
        li.appendChild(span);
        li.appendChild(rightSide);

        if (tasks[i].done) {
            li.classList.add("done");
        }

        Show_list.appendChild(li);
    }
}

Input_task.addEventListener("input", function () {
    if (Input_task.value.length >= 40) {
        warningMessage.style.display = "block";
    } else {
        warningMessage.style.display = "none";
    }
});

function Button_add_task() {
    let text = Input_task.value;
    if (text.length > 0 && text.length <= 50) {
        tasks.push({ text: text, done: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    Update_list();
    Input_task.value = "";
    warningMessage.style.display = "none";
}

function Button_function() {
    let index = this.dataset.index;
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    Update_list();
}

function Checkbox_function() {
    let index = this.dataset.index;
    tasks[index].done = !tasks[index].done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    Update_list();
}
