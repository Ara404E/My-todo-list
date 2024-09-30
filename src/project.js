
import { TaskManager } from './task.js';


const LOCAL_STORAGE_LIST_KEY= 'project.lists';
const LOCAL_STORAGE_SELECTED_PROJECT= 'project.selected';

 class Project{
    constructor(name,description=''){
        this.name=name;
        this.description=description;
        this.taskManager=new TaskManager();

        if(!(this.taskManager instanceof TaskManager)){
                this.taskManager = new TaskManager();
        }

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

 class ProjectManager {
    
    constructor(){
        const projectStorage=JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
        this.project=projectStorage.map(proj => {
            const restoredProject=Object.assign(new Project(), proj)
            restoredProject.taskManager=Object.assign(new TaskManager(), restoredProject.taskManager);
            
            return restoredProject
        });
    }
    

    save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(this.project));
    
    }
    
    addProject(project){
        this.project.push(project)
        this.save();
    }
    
    getProjectByName(name){
        return this.project.find(project => project.name === name);
    }    
    
    addTaskToProjectByName(name,task){
        const project=this.getProjectByName(name);
        console.log(project);  // Ensure the correct project is retrieved
        
        if(project){
            project.addTask(task);
            this.save();
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
            this.save();

        } else {
            console.error('Project not found');
        }
    }

    editTaskInProjectByName(projectName, index, newName, newDueDate) {
        const project = this.getProjectByName(projectName);
        if (project) {

            project.editTask(index, newName, newDueDate);
            this.save();
        }
         else {
            console.error('Project not found');
        }
    }

    removeProject(project,index){
        if(index >=0 || index < project.length){
                this.project.splice(index,1)
                this.save();
                console.log(this.project)
        }
    }

}


 class ProjectForm{
    
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

export { Project , ProjectManager , ProjectForm, LOCAL_STORAGE_SELECTED_PROJECT }