import _ from 'lodash';
import './style.css';
import './home';
import './thisWeek';
import './today';
import './'

import { displayHome } from './home'
import { displayThisWeek } from './thisWeek';
import { displayToday } from './today';


const homeTab=document.querySelector('#home-tab');
const todayTab=document.querySelector('#today-tab');
const ThisWeek=document.querySelector('#thisWeek-tab');
const currentTabH2=document.querySelector(".current-tab");



export const currentTabDiv=document.querySelector(".current-tab-div");
export const modalBody=document.querySelector(".modal-body");
export const overlay=document.querySelector('#overlay');
export const addTaskDiv=document.querySelector('.add-task-div');
export const addProject=document.querySelector('.add-project-btn');


homeTab.addEventListener('click', ()=>{
  currentTabH2.textContent="Home";
  currentTabDiv.textContent="";
  modalBody.textContent='';
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
  currentTabDiv.textContent='';
  currentTabH2.textContent='Create New Project';
  addTaskDiv.textContent='';
        projectForm();
});

overlay.addEventListener('click', ()=>{
   const modals=document.querySelectorAll('.modal.active');
        modals.forEach(modal=>{
            closeForm(modal);
        });
})


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




displayHome();