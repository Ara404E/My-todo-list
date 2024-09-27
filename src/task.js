
class Task{
    
    constructor(name,priority,dueDate,checked=false){
        this.name=name;
        this.priority=priority;
        this.dueDate=dueDate;
        this.checked=checked
    }
}


class TaskManager{

    constructor(){
        this.task=[];

    };

    
    addTask(Task){
        this.task.push(Task);     
    
    };
    getTask(){
    return this.task

    }

     
    removeTask(index) {
        if(index >= 0 || index < this.task.length) {
            this.task.splice(index, 1);
        }
    }

     editTask(index,newName,newDueDate){
        const taskIndex=this.task[index]
        console.log(taskIndex);
        if(index >=0 || index < this.task.length){
            this.task[index].name=newName;
            this.task[index].dueDate=newDueDate;
        }
         else {
            console.error('Invalid task index');
        }
    }
}

class TaskForm{

    constructor(name,priority,dueDate,checked){
        this.name=name;
        this.priority=priority;
        this.dueDate=dueDate;
        this.checked=checked;
    }

    getTaskDetails(){
        
        return{

            name:this.name,
            priority:this.priority,
            dueDate : this.dueDate,
            checked : this.checked

        }
    }
}


export { Task , TaskManager , TaskForm } 