
import { TaskManager } from './task.js';


export class Project{
    constructor(name,description=''){
        this.name=name;
        this.description=description;
        this.taskManager=new TaskManager();

    }


    setProjectName(name){
        this.name=name;
    }
    
    getName(){
        return this.name
    }

    setDescription(description){
        this.description=description;
    }

    getDescription(){
        return this.description;
    }
   
    addTask(task){
        this.taskManager.addTask(task)
    }

    getTask(){
        return this.taskManager.getTask();
    }

    removeTask(index) {    
     this.taskManager.removeTask(index);
    }

    editTask(index, newTaskName, newDueDate) {
        this.taskManager.editTask(index, newTaskName, newDueDate);
    }

}

export class ProjectManager {
    
    constructor(){
        this.project=[];    
    }
    
    addProject(project){
        this.project.push(project)
    }
    
    getProjectByName(name){
        return this.project.find(project => project.name === name);
    }    
    
    addTaskToProjectByName(name,task){
        const project=this.getProjectByName(name);
        console.log(project);  // Ensure the correct project is retrieved
        
        if(project){
            project.addTask(task);
        }
    }
    
    getTaskForProject(name){
        const project = this.getProjectByName(name);
        if(project){
            return project.getTask() 
        }
        else{
            console.error('project not found')
            return []
        }
    }
    
     removeTaskFromProjectByName(projectName, index) {
        const project = this.getProjectByName(projectName);
        if (project) {
            project.removeTask(index);
        } else {
            console.error('Project not found');
        }
    }

    editTaskInProjectByName(projectName, index, newName, newDueDate) {
        const project = this.getProjectByName(projectName);
        if (project) {
            project.editTask(index, newName, newDueDate);
        } else {
            console.error('Project not found');
        }
    }

    removeProject(project,index){
        if(index >=0 || index <= project.length){
            this.project.splice(index,1)
        }
    }

}


export class ProjectForm{
    
    constructor(name,description){
        
        this.name=name;
        this.description=description;
    
    }

    getProjectDetails(){

        return{
    
            name:this.name,
            description:this.description
        
        }
    }
}
