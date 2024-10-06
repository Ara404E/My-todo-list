import { currentTabDiv } from "./index";
import { ProjectManager } from "./project";
import { isThisWeek, parseISO } from 'date-fns';
import { checkTask , uncheckTask } from './task.js'
import { editModal ,  removeTask , selectedProjectName } from './displayUI.js'


const projectManager = new ProjectManager();


export function displayThisWeekTab(){

    renderThisWeekTasks();

}




function renderThisWeekTasks() {
    currentTabDiv.innerHTML = '';

    const taskInProject=projectManager.getTaskForProject(selectedProjectName);

    taskInProject.forEach((task,index) => {
                  const parsedDate = parseISO(task.dueDate);

                  if(isThisWeek(parsedDate)){

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
                editIcon.dataset.index = index;

                const crossIcon = document.createElement('span');
                crossIcon.textContent = '×';
                crossIcon.classList.add('remove-task');
                crossIcon.dataset.index = index;

                currentTabDiv.append(taskContainer);
                taskContainer.append(taskList);

                taskList.append(leftSideTask);
                taskList.append(rightSideTask);

                leftSideTask.append(checkBox, taskName);
                rightSideTask.append(taskPriority, taskDueDate, editIcon, crossIcon);

                // Edit Task
                                editIcon.addEventListener('click', () => {
                    const openEditModal = document.querySelector('#edit-modal');
                    openForm(openEditModal);
                    editModal(task, index);
                });

                // Remove Task
                crossIcon.addEventListener('click', () => removeTask(index));

                // Handle Task Checked

                checkBox.addEventListener('click', () =>{
             task.checked=checkBox.checked
             checkBox.checked ? checkTask(taskName) : uncheckTask(taskName);
      });
    
    }
  });
}

function dateFormat(date){
        
        const changeFormat=date.split('-');
        return changeFormat.join(' / ');
}