import { LightningElement, track } from 'lwc';

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
            todoId: this.todos.length,
            todoName: inputBox.value,
            done: false,
            todoDate: new Date()
        }
        
        this.todos.push(todo);
        inputBox.value = "";
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
