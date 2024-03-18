import { Task } from "./Task.js";

class Todos{
    #tasks = [];
    #backend_url = '';

    constructor(url){
        this.#backend_url = url;
    }

    getTask = () => {
        return new Promise(async(resolve, reject) => {
            fetch(this.#backend_url)
            .then((response) => response.json())
            .then((json) => {
                this.#readJson(json)
                resolve(this.#tasks)
            }, (error) => {
                reject(error)
            })
        })
    }

    #readJson = (taskAsJson) => {
        taskAsJson.forEach(node => {
            console.log(node.id)
            const task = new Task(node.id, node.description);
            this.#tasks.push({id : task.getId(), description:task.getText()})
        });
    }

    #addToArray = (id, text) => {
        const task = new Task(id, text);
        const ele = {id : task.getId(), description:task.getText()};
        this.#tasks.push(ele)
        return ele
    }

    addTask = (text) => {
        return new Promise(async(resolve, reject) => {
            const json = JSON.stringify({ description:text});
            fetch(this.#backend_url + '/new', {
                method:'post',
                headers:{'Content-Type': 'application/json'},
                body:json
            })
            .then((response) => response.json())
            .then((json) => {
                resolve(this.#addToArray(json.id, text))
            }, (error) => {
                reject(error);
            })
        })
    }
}

export{ Todos}

