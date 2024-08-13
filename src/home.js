
import {  addTaskDiv,modalBody,overlay} from "./index";



  const cache=domCache({})
class Task{
    constructor(name,priority,dueDate){
        this.name=name;
        this.priority=priority;
        this.dueDate=dueDate;
    }
    getTask(){
        return{
            name: this.name,
            priority : this.priority,
            dueDate : this.dueDate
        }
    }
}


class TaskManager{
    constructor(){
        this.task=[];
    };

    addTask(Task){
        this.task.push(Task)
    };

    // displayTask(){
    //     this.task.forEach((task,index) =>{
    //         console.log(`${index+1} ${task.name} ${task.priority} ${task.dueDate}`);
    //     });
    // };
}

class TaskForm{
    constructor(name,priority,dueDate){
        this.name=name;
        this.priority=priority;
        this.dueDate=dueDate;
    }
    getTaskDetails(){
        return{
            name:this.name,
            priority:this.priority,
            dueDate : this.dueDate
        }
    }
    clearInputs(){
        this.name.value='';
        this.priority.value='';
        this.dueDate.value='';
    }

    addTaskBtn(callback){
        this.addBtn.addEventListener('click', ()=>{
                const taskDetails=this.getTaskDetails();
                callback(taskDetails)
                this.clearInputs();
            });
    }
}

function displayTask(){

    addTaskBtn()

}   



function displayForm(){
    const cache=domCache({});

    modalBody.append(cache.taskForm)
    cache.taskForm.append(cache.nameInput);
    cache.taskForm.append(cache.dueDateInput);
    cache.taskForm.append(cache.priorityInput);
    cache.taskForm.append(cache.submitTask)

}



function createTask(){  

    const taskForm=new TaskForm();
    const {name,priority,dueDate} = taskForm.getTaskDetails();

    const taskManager=new TaskManager();    
    const newTask=new Task(name,priority,dueDate);
    
    taskManager.task.push(newTask);


    return {
        newTask,
        taskManager,
        }
}




function domCache(){

        const formContainer=document.createElement('div');    
        const taskForm=document.createElement('form');
        const nameInput=document.createElement('input');
        const dueDateInput=document.createElement('input');
        const priorityInput=document.createElement('select');
        const submitTask=document.createElement('button');
        const openTaskModal=document.createElement('button');
    
    
        
        nameInput.setAttribute('type', 'text');
        dueDateInput.setAttribute('type', 'date');
        submitTask.setAttribute('id', 'form-btn' );
        openTaskModal.setAttribute('data-modal-target', '#modal');
        

        nameInput.classList.add('name-input')
        dueDateInput.classList.add('date-input')
        priorityInput.classList.add('priority-input')
        submitTask.classList.add('form-btn');
        openTaskModal.classList.add('open-form-modal');
        

        
        const priorites=[
            {value:3,text:'High'},
            {value:2,text:'Medium'},
            {value:1,text:'Low'}
        ];
        
        priorites.forEach(p=>{
            const option=document.createElement('option');
            option.value=p.value;
            option.textContent=p.text;
            priorityInput.append(option);
        });
        
        
        submitTask.textContent='Add Task';
        openTaskModal.textContent='+ Add Task';
        



        return{
            formContainer,
            taskForm,
            nameInput,
            dueDateInput,
            priorityInput,
            submitTask,
            openTaskModal
        }
}



export function displayHome(){
  

  
cache.openTaskModal.addEventListener('click',()=>{
           const modal = document.querySelector(cache.openTaskModal.getAttribute('data-modal-target'));
           openForm(modal);
   });



overlay.addEventListener('click',()=>{
        const modals=document.querySelectorAll('.modal.active');
        modals.forEach(modal=>{
            closeForm(modal);
        });
    });
    
    addTaskDiv.append(cache.openTaskModal);
};



function openForm(modal){
    if(modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active');
}


function closeForm(modal){
    if(modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

            