const BACKEND_ROOT_URL = 'http://localhost:3001';
import { Todos } from "./class/Todo.js";

const todos = new Todos(BACKEND_ROOT_URL);

const list = document.querySelector('ul');
const input = document.querySelector('input');

const renderTask = (task) =>{
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    console.log((task))
    li.innerHTML = task.description;
    list.append(li);
}

const getTasks = () =>{
    todos.getTask().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        })
    }).catch((error) => {
        alert(error)
    })
    
} 


const saveTask = async(task) => {
    try{
        const json = JSON.stringify({description:task});
        const response = await fetch(BACKEND_ROOT_URL + '/new', {
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:json
        })
        return response.json();
    }catch(error){
        alert(`Error Saving task ${error.message}`)
    }
}

getTasks();

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const task = input.value.trim();
        if(task !== ''){
            todos.addTask(task).then(task => {
                renderTask(task);
                input.value = '';
                input.focus();
            })
            
        }

    }
});