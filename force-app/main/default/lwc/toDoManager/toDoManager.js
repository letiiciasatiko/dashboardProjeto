import { LightningElement, track } from 'lwc';
import addTodo from '@salesforce/apex/ToDoController.addTodo';
import getCurrentTodos from '@salesforce/apex/toDoController.getCurrentTodos';

export default class ToDoManager extends LightningElement {
    @track time = "8:15";
    @track greeting = "Good Evening";

    @track todos = [];

    getTime(){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)}`

        this.setGreeting(hour);
    }
 
    connectedCallback(){
        this.getTime();
        this.fetchTodos();

        setInterval(() => {
            this.getTime();
        }, 1000);
    }

    getHour(hour){
        return hour === 0 ? 24:hour > 24 ? (hour-24) : hour;
    }

    getDoubleDigit(digit){
        return digit<10 ? "0" + digit : digit; 
    }

    setGreeting(hour){
        if (hour < 12){
            this.greeting = "Bom dia!";
        } else if (hour >= 12 && hour < 17){
            this.greeting = "Boa Tarde!";
        } else {
            this.greeting = "Boa Noite!";
        }
    }

    addTodoHandler(){
        const inputBox = this.template.querySelector("lightning-input");

        const todo = {
            todoName: inputBox.value,
            done: false,
        };
        addTodo({payload : JSON.stringify(todo)})
        .then(response => {
            console.log('Item inserted sucessfully');
            this.fetchTodos();
        })
        .catch(error => {
            console.error('Error in inserting todo item' + error);
        });
        // this.todos.push(todo);
        inputBox.value = "";
    }

    fetchTodos(){
        getCurrentTodos()
        .then(result => {
            if(result){
                console.log("Retrieved todos from server ", result.length);
                this.todos = result;
            }    
        })
        .catch(error => {
            console.error("Error in fetching todos " + error);
        });
    }

    updateHandler(){
        this.fetchTodos();
    }

    deleteHandler(){
        this.fetchTodos();
    }

    get upcomingTasks(){
        return this.todos && this.todos.length
        ? this.todos.filter(todo => !todo.done)
        : [];
    }

    get completedTasks(){
        return this.todos && this.todos.length
        ? this.todos.filter(todo => todo.done)
        : [];
    }
}
