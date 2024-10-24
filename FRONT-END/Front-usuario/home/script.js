'use strict';

/*
* interatividade da navbar
*/

const overlay = document.querySelector('[data-overlay]');
const navOpenBtn = document.querySelector('[data-nav-open-btn]');
const navbar = document.querySelector('[data-navbar]');
const navCloseBtn = document.querySelector('[data-nav-close-btn]');

const navElemArr = [overlay, navOpenBtn, navCloseBtn];

for (let i= 0; i < navElemArr.length; i++) {
    navElemArr[i].addEventListener('click', function() {
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
    })
}


