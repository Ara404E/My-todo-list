
import {  addTaskDiv,currentTabDiv,modalBody,overlay} from "./index";



const cache=domCache({})

class Task{
    
    constructor(name,priority,dueDate,checked=false){
        this.name=name;
        this.priority=priority;
        this.dueDate=dueDate;
        this.checked=checked
    }
    getTask(){
        
        this.name='',
        this.priority='',
        this.dueDate='';
        this.checked=''

    }
 
}


class TaskManager{

    constructor(){
        this.task=[];

    };
    
    addTask(Task){

        this.task.push(Task);

    };

    editTask(index,newName,newDueDate){
        if(index <=0 || index < this.task.length){
            this.task[index].name=newName;
            this.task[index].dueDate=newDueDate;
        }

        else{

            console.error('task not found');
        
        }
        console.log(this.task)
    }
    removeTask(task,index){
        if(index >= 0 || index < task.length ){
            this.task.splice(index,1)
            console.log(this.task)
        }
    }
}

const taskManager = new TaskManager(); 


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


function createTask(name,priority,dueDate){ 
 
    const taskForm= new TaskForm(name,priority,dueDate,false);

    let { name:taskName , priority:taskPriority , dueDate:taskDueDate  , checked:taskChecked } = taskForm.getTaskDetails();

    const newTask = new Task(taskName,taskPriority,taskDueDate,taskChecked);
    
    
    console.log(taskDueDate)

    taskManager.addTask(newTask);
    console.log(taskManager.task);    
    

    return {
        newTask,
        taskManager,
        }
}



     
  


    function displayTask(){
        
        currentTabDiv.innerHTML = '';
        
        taskManager.task.forEach((task, index) => {
        const taskContainer=document.createElement('div');
        taskContainer.classList.add('task-container');

        const taskList=document.createElement('div');
        taskList.classList.add('task-list')

        const leftSideTask=document.createElement('div');
        const rightSideTask=document.createElement('div');

        leftSideTask.classList.add('left-side-task');
        rightSideTask.classList.add('right-side-task');

            
        const checkBox=document.createElement('input');
        checkBox.setAttribute('type','checkbox');    
        checkBox.classList.add('check-task');


        checkBox.checked=task.checked;




        const taskName = document.createElement('p');
        taskName.textContent = task.name;
        taskName.classList.add('active');
        taskName.id='task-name'

        const taskPriority = document.createElement('p');
        taskPriority.textContent = task.priority;
        taskPriority.classList.add('task-priority');

        const taskDueDate = document.createElement('p');
        taskDueDate.classList.add('task-due-date');
        const date=dateFormat(task.dueDate)
        taskDueDate.textContent = date;

        
     

        const editIcon=document.createElement('span');
        editIcon.classList.add('edit-icon');
        editIcon.textContent='︙';

        const crossIcon=document.createElement('span');
        crossIcon.textContent='×';
        crossIcon.classList.add('remove-task');

        crossIcon.dataset.index=index;  
        editIcon.dataset.index=index;


            currentTabDiv.append(taskContainer);

            taskContainer.append(taskList);
            
            taskList.append(leftSideTask);
            
            taskList.append(rightSideTask);
    
            leftSideTask.append(checkBox , taskName , taskPriority);
    
            rightSideTask.append(taskDueDate , editIcon , crossIcon);
                

            editIcon.addEventListener('click', ()=>{
                const openEditModal=document.querySelector('#edit-modal');
                    openForm(openEditModal);                    
                    editModal(task,index);

            });

            crossIcon.addEventListener('click', ()=>{
                removeTask(task,index);
            });

             if (checkBox.checked) {
            checkTask(taskName);
        }

        checkBox.addEventListener('click', () => {
            task.checked = checkBox.checked;  
            if (checkBox.checked) {
                checkTask(taskName);
            } else {
                uncheckTask(taskName);
            }
        });
    })
};

function dateFormat(date){

    const changeFormat=date.split('-')

    return changeFormat.join(' / ');
}


function checkTask(check){
    check.style.textDecoration='line-through'

}
function uncheckTask(check){

    check.style.textDecoration='';

}

function editModal(task,index){

    const modal=document.querySelector('#edit-modal');

    let taskName=document.querySelector('.edit-name');
    let taskDueDate=document.querySelector('.edit-due-date');

    taskName.value = task.name;
    taskDueDate.value = task.dueDate;

    modal.style.display='block';

    
    
    
    const editForm=document.querySelector('.edit-form');
    
    editForm.onsubmit= function(event){
        event.preventDefault();


        const newName=taskName.value;
        const newDueDate=taskDueDate.value;


        taskManager.editTask(index,newName,newDueDate);
        
        displayTask();
         const modals=document.querySelectorAll('.modal.active');
        modals.forEach(modal=>{
            closeForm(modal);
   })
 }
}

function removeTask(task,index){

    taskManager.removeTask(task,index)
    
    displayTask()

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
        submitTask.setAttribute('type', 'button' );
        openTaskModal.setAttribute('data-modal-target', '#modal');

        nameInput.required=true;
        dueDateInput.required=true;
        
        formContainer.classList.add('form-container');
        nameInput.classList.add('name-input');
        dueDateInput.classList.add('date-input');
        priorityInput.classList.add('priority-input');
        submitTask.classList.add('form-btn');
        openTaskModal.classList.add('open-form-modal');
        
        submitTask.id='form-btn'


    
            const priorites=[
            {value:3,text:'⭐⭐⭐'},
            {value:2,text:'⭐⭐'},
            {value:1,text:'⭐'}
        ];
        
        priorites.forEach(p=>{
            const option=document.createElement('option');
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
    displayForm();
    
};





function displayForm(){
    
    
    const cache=domCache({});

    modalBody.append(cache.formContainer);

    cache.formContainer.append(cache.taskForm);
    
    cache.taskForm.append(cache.nameInput);
    
    cache.taskForm.append(cache.dueDateInput);
    
    cache.taskForm.append(cache.priorityInput);
    
    cache.taskForm.append(cache.submitTask);


    cache.submitTask.addEventListener('click', (event) => {

        event.preventDefault();

        createTask(cache.nameInput.value,cache.priorityInput.value,cache.dueDateInput.value);
        cache.nameInput.value='';
        cache.dueDateInput.value='';

        displayTask();

        const modals=document.querySelectorAll('.modal.active');
        modals.forEach(modal=>{
            closeForm(modal);

        });
    });
}



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


