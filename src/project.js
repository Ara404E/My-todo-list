
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
}

export class ProjectManager {

    constructor(){
        this.project=[];    
    }
    
    addProject(project){
            this.project.push(project)
        }
    
    getProjectByName(name){
         this.project.find((project)=> project.name===name ) 
    }    
       
    addTaskToProjectByName(name,task){
        const project=this.getProjectByName(name);
        if(project){
                project.addTask(task);
        }
    }
        
    getTaskForProject(name){
        const project = this.getProjectByName(name);
        if(project){
            project.getTask() 
        }
    }

    removeProject(name){
        this.project = this.project.filter(project => project.name === name);
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
