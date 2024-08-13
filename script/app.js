const $saveBtn = document.querySelector("#save-btn");
const $result = document.querySelector(".result")
const $result2 = document.querySelector(".result2")
const $result3 = document.querySelector(".result3")
const $result4 = document.querySelector(".result4")


let TASKS = JSON.parse(localStorage.getItem("TASKS")) || []
let form = {}
let tr = TASKS.length + 1

const handleChange = (event) => {
    const { name, value } = event.target
    form = { ...form, [name]: value, tr }
}

const addNewTask = (e) => {
    e.preventDefault()
    TASKS.push(form)
    saveToLocalStorage()
    displayTask()
}

const displayTask = () => {
    $result.innerHTML = ""
    $result2.innerHTML = ""
    $result3.innerHTML = ""
    $result4.innerHTML = ""
    TASKS.forEach((task, index) => {
        console.log(task)
        let ol = document.createElement("ol")
        if (task.status === "open") {
            $result.innerHTML += `
                <div class="card">
               
                <P>${index + 1}</P>
                 <h3 id="todo-${index}" onClick="editTask(${index})">${task.name}</h3> 
                 <button onclick="deleteTasks(${index})"><i class="bi bi-trash"></i></i></button>
                
                </div>
            `
        } else if (task.status === "pending") {
            $result2.innerHTML += `
                <div class="card">
                
                <P>${index + 1}</P>
                <h3 id="todo-${index}" onClick="editTask(${index})">${task.name}</h3> 
                <button onclick="deleteTasks(${index})"><i class="bi bi-trash"></i></i></button>
           
                </div>
            `
        } else if (task.status === "inprog") {
            $result3.innerHTML += `
                <div class="card">
        
                <P>${index + 1}</P>
                <h3 id="todo-${index}" onClick="editTask(${index})">${task.name}</h3> 
                <button onclick="deleteTasks(${index})"><i class="bi bi-trash"></i></i></button>
              
                </div>
            `
        } else if (task.status === "complete") {
            $result4.innerHTML += `
                <div class="card">
          
                <P>${index + 1}</P>
                <h3 id="todo-${index}" onClick="editTask(${index})">${task.name}</h3> 
                <button onclick="deleteTasks(${index})"><i class="bi bi-trash"></i></i></button>

             
                
                </div>
            `
        }
    });
}

const saveToLocalStorage = () => {
    localStorage.setItem("TASKS", JSON.stringify(TASKS))
}
const deleteTasks = (index) => {
    TASKS.splice(index, 1)
    saveToLocalStorage()
    displayTask()
}
function editTask(index) {
    const el = document.getElementById(`todo-${index}`)
    let inputEl = document.createElement("input")
    el.replaceWith(inputEl)
    inputEl.focus()
    inputEl.value = TASKS[index].name
    inputEl.addEventListener("blur", function () {
        let update_text = inputEl.value
        if (update_text) {
            TASKS[index].name = update_text
            saveToLocalStorage()
        }
        displayTask()
    })
}
displayTask()

$saveBtn.addEventListener("click", addNewTask)