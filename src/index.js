import _ from 'lodash';
import './style.css';
import './home';
import './thisWeek';
import './today';
import './displayUI';



import { displayHome } from './home'
import { displayThisWeek } from './thisWeek';
import { displayToday } from './today';
import {  projectModal , displayProject , cache } from './displayUI';



const homeTab=document.querySelector('#home-tab');
const todayTab=document.querySelector('#today-tab');
const ThisWeek=document.querySelector('#thisWeek-tab');
const addProject=document.querySelector('.add-project-btn');



export const currentTabH2=document.querySelector(".current-tab");
export const currentTabDiv=document.querySelector(".current-tab-div");
export const modalBody=document.querySelector(".modal-body");
export const overlay=document.querySelector('#overlay');
export const addTaskDiv=document.querySelector('.add-task-div');




homeTab.addEventListener('click', ()=>{
  currentTabH2.textContent="Home";
  currentTabDiv.innerHTML="";
  addTaskDiv.textContent="";
  displayHome();
});

todayTab.addEventListener('click', ()=>{
  currentTabH2.textContent="Today";
  currentTabDiv.textContent="";
  addTaskDiv.textContent="";
  displayToday();      

});

ThisWeek.addEventListener('click', ()=>{
  currentTabH2.textContent="This Week";
  currentTabDiv.textContent="";
  addTaskDiv.textContent="";
  displayThisWeek();

});

addProject.addEventListener('click', () =>{
    // currentTabH2.textContent="";
  addTaskDiv.append(cache.createTask);
    projectModal();
});

  overlay.addEventListener('click',()=>{
        const modals=document.querySelectorAll('.modal.active');
        modals.forEach(modal=>{
            closeForm(modal);
        });
    });



export function openForm(modal){
    if(modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active');

}


export function closeForm(modal){
    if(modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
}


displayHome();
displayProject();
