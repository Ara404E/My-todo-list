import _ from 'lodash';
import './style.css';
import './home';

import {displayHome} from './home'

const homeTab=document.querySelector('#home-tab');
const todayTab=document.querySelector('#today-tab');
const ThisWeek=document.querySelector('#thisWeek-tab');
export const currentTabDiv=document.querySelector(".current-tab-div")


homeTab.addEventListener('click', ()=>{
  currentTabDiv.textContent="";
});

todayTab.addEventListener('click', ()=>{
    currentTabDiv.textContent="";

});

ThisWeek.addEventListener('click', ()=>{
        currentTabDiv.textContent="";
})

displayHome();