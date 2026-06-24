let Input_task = document.getElementById("Input_task");
let Add_task_button = document.getElementById("Add_task_button");
let Show_list = document.getElementById("Show_list");

let tasks = [];

if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    Update_list();
}

function Update_list(){
    Show_list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++){
        let li = document.createElement("li");
        li.innerHTML = tasks[i];
        const button = document.createElement("button");
        button.dataset.index = i;
        button.addEventListener("click", button_function);
        button.innerHTML = "X";
        
        li.appendChild(button);
        Show_list.appendChild(li);
    }
}

function Button_add_task(){
    let text = Input_task.value;
    if (text.length > 0){
        tasks.push(text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    

    Update_list();

    Input_task.value = "";
}

function button_function(){
    let index = this.dataset.index;
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    Update_list();
}

