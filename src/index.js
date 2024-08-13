import _ from 'lodash';
import './style.css';
import './home';
import './thisWeek';
import './today';

import {displayHome} from './home'
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

homeTab.addEventListener('click', ()=>{
  currentTabDiv.textContent="";
  currentTabH2.textContent="Home";
  displayHome();
});

todayTab.addEventListener('click', ()=>{
  currentTabDiv.textContent="";
  currentTabH2.textContent="Today";
  displayToday();      
});

ThisWeek.addEventListener('click', ()=>{
  currentTabDiv.textContent="";
  currentTabH2.textContent="This Week";
  displayThisWeek();
});
