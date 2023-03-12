'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




const section1 = document.querySelector("#section--1")
const section2 = document.querySelector("#section--2")
const section3 = document.querySelector("#section--3")


const myScroll = function(area){
  const scords = area.getBoundingClientRect()
  window.scrollTo({
        left:scords.left,
        top:scords.top,
        behavior:"smooth"
  
      })

}
document.querySelector(".link-1").addEventListener("click",function(){
myScroll(section1)})
document.querySelector(".link-2").addEventListener("click",function(){
myScroll(section2)})
document.querySelector(".link-3").addEventListener("click",function(){
myScroll(section3)})
document.querySelector(".btn--scroll-to").addEventListener("click",function(){
  const scords = section1.getBoundingClientRect()
  window.scrollTo({
        left:scords.left,
        top: scords.top + window.pageYOffset,
        behavior:"smooth"
  
      })
})
