
import {  addTaskDiv , currentTabDiv , modalBody ,currentTabH2 , overlay , openForm , closeForm  } from "./index";
import { Project, ProjectManager, ProjectForm } from "./project";
import { Task, TaskManager, TaskForm , checkTask , uncheckTask } from './task.js'


export const cache=domCache({})

const taskManager = new TaskManager(); 

const projectManager = new ProjectManager();

const project=new Project();

const projectForm=document.querySelector('.project-form');


cache.projectBtn.addEventListener('click',projectModal);

cache.createTask.addEventListener('click', taskModal)


const projectName=document.querySelector('.project-name');
const projectDescription=document.querySelector('#project-description');     



projectForm.onsubmit = (e)=>{
    e.preventDefault();
    createProject(projectName.value,projectDescription.value);
        displayProject();

    projectName.value='';
    projectDescription.value='';

};
   


export function projectModal(){

    const modal=document.querySelector('#project-modal');
        openForm(modal);


}

function taskModal(){
    
    openForm(cache.modal);
    displayForm();
    
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






  






function domCache(){

        const formContainer=document.createElement('div');    
        const taskForm=document.createElement('form');
        const nameInput=document.createElement('input');
        const dueDateInput=document.createElement('input');
        const priorityInput=document.createElement('select');
        const submitTask=document.createElement('button');
        const createTask=document.createElement('button');
        const editIcon=document.createElement('span');
        const crossIcon=document.createElement('span');
        const checkBox=document.createElement('input');

                    
        
        
        
        
        const projectBtn=document.querySelector('.add-project-btn');
        const modal=document.querySelector('#modal')
        
        nameInput.setAttribute('type', 'text');
        dueDateInput.setAttribute('type', 'date');
        submitTask.setAttribute('type', 'submit' );
        createTask.setAttribute('data-modal-target', '#modal');
        checkBox.setAttribute('type','checkbox');    
        
        nameInput.required=true;
        dueDateInput.required=true;
        
        
        formContainer.classList.add('form-container');
        nameInput.classList.add('name-input');
        dueDateInput.classList.add('date-input');
        priorityInput.classList.add('priority-input');
        submitTask.classList.add('form-btn');
        editIcon.classList.add('edit-icon');
        crossIcon.classList.add('remove-task');
        checkBox.classList.add('check-task');
        
        
        createTask.id='create-task'
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
        createTask.textContent='+ Add Task';
        editIcon.textContent='︙';
        crossIcon.textContent='×';
        
        
        
        
        return{

            formContainer,
            taskForm,
            nameInput,
            dueDateInput,
            priorityInput,
            submitTask,
            createTask,
            modal,
            editIcon,
            crossIcon,
            checkBox,
            projectBtn

        }
}




export  function displayAllTask(){
        
    currentTabDiv.innerHTML=''

    const tasks = project.getTask();

    console.log('project.getTask() func=',project.getTask())
    tasks.forEach((task,index)=>{

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const taskList = document.createElement('div');
        taskList.classList.add('task-list');

        const leftSideTask = document.createElement('div');
        const rightSideTask = document.createElement('div');

        leftSideTask.classList.add('left-side-task');
        rightSideTask.classList.add('right-side-task');


        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.classList.add('check-task');
        checkBox.checked = task.checked;

        const taskName = document.createElement('p');
        taskName.textContent = task.name;
        taskName.classList.add('task-name');
        taskName.id = 'task-name';

        const taskPriority = document.createElement('p');
        taskPriority.textContent = task.priority;
        taskPriority.classList.add('task-priority');

        const taskDueDate = document.createElement('p');
        taskDueDate.classList.add('task-due-date');
        const date = dateFormat(task.dueDate); 
        taskDueDate.textContent = date;

        const editIcon = document.createElement('span');
        editIcon.classList.add('edit-icon');
        editIcon.textContent = '︙';

        const crossIcon = document.createElement('span');
        crossIcon.textContent = '×';
        crossIcon.classList.add('remove-task');

        
        crossIcon.dataset.index = index;  
        editIcon.dataset.index = index;

        
        currentTabDiv.append(taskContainer);
        taskContainer.append(taskList);

        taskList.append(leftSideTask);
        taskList.append(rightSideTask);

        leftSideTask.append(checkBox, taskName, taskPriority);
        rightSideTask.append(taskDueDate, editIcon, crossIcon);


        currentTabDiv.appendChild(taskList)
    });
    
};






function displayForm(){
    
    if(!modalBody.contains(cache.formContainer)){
        
        modalBody.append(cache.formContainer);
        
        cache.formContainer.append(cache.taskForm);
        
        cache.taskForm.append(cache.nameInput);
        cache.taskForm.append(cache.dueDateInput);
        cache.taskForm.append(cache.priorityInput);
        cache.taskForm.append(cache.submitTask);
    }
}
cache.taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createTaskInProject(cache.nameInput.value,cache.priorityInput.value,cache.dueDateInput.value,cache.checked=false);
    displayAllTask();
    cache.nameInput.value=''
    cache.dueDateInput.value=''
    
});




let selectedProjectName = '';  // Store the selected project name


export function displayProject() {
    
    
    const projectDiv = document.querySelector('.project-div');
    const projectList = document.querySelector('.project-list');
    
    projectList.innerHTML=''

    projectManager.project.forEach((projects)=>{
    
       const projectName = document.createElement('p');
       projectName.classList.add('project-name-list');
       projectName.textContent = projects.name;
       projectDiv.append(projectList);
       projectList.append(projectName);

       projectName.addEventListener('click', () => {
       selectedProjectName = projects.name;  // Store the selected project name
            currentTabH2.textContent = projects.name;
            addTaskDiv.appendChild(cache.createTask);
            currentTabDiv.textContent = '';
       
        }) 
    });
}







function createProject(name,description){
    
    const projectForm=new  ProjectForm(name,description);
    let { name:projectName , description: projectDescription } = projectForm.getProjectDetails();
    const project = new Project(projectName,projectDescription);
    projectManager.addProject(project);
    console.log(projectManager.project)
}





function createTaskInProject(name,priority,dueDate,checked){
    
    const taskForm=new TaskForm(name,priority,dueDate,checked);
    let { name:taskName , priority:taskPriority , dueDate:taskDueDate  , checked:taskChecked } = taskForm.getTaskDetails();
    const task = new Task(taskName, taskPriority, taskDueDate, taskChecked);
    if(selectedProjectName){
        projectManager.addTaskToProjectByName(selectedProjectName,task);    
        console.log(taskManager.getTask());
    }
        else{
            console.error('no project selected')
        }
    }
    
    
    
    
    
    
    
    function removeTask(task,index){
        
        taskManager.removeTask(task,index)
        
        displayAllTask()
        
    }
    
    
    
    function dateFormat(date){
        
        const changeFormat=date.split('-');
        return changeFormat.join(' / ');
    }

















    
    
         // removeTask(task,index);
    
         //            cache.editIcon.addEventListener('click', ()=>{
         //     const openEditModal=document.querySelector('#edit-modal');
         //         openForm(openEditModal);                    
         //         editModal(task,index);
    
         // });
    
     //     cache.crossIcon.addEventListener('click', ()=>{
     //         removeTask(task,index);
     //     });
    
     //      if (cache.checkBox.checked) {
     //     checkTask(taskName);
     // }
    
     // cache.checkBox.addEventListener('click', () => {
     //     task.checked = cache.checkBox.checked;  
     //     if (cache.checkBox.checked) {
     //         checkTask(taskName);
     //     } else {
     //         uncheckTask(taskName);
     //     }
     // });