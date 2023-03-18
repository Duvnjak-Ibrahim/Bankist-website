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

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

    const navAncors = document.querySelectorAll(".nav__link")
    navAncors.forEach( el => el.addEventListener("click",function(e){
      e.preventDefault()
      const id = this.getAttribute("href")
      
      // const scords = document.querySelector(`${id}`).getBoundingClientRect()
      //   window.scrollTo({
      //         left:scords.left,
      //         top: scords.top + window.pageYOffset,
      //         behavior:"smooth"
        
      //       })
      document.querySelector(`${id}`).scrollIntoView({behavior:"smooth"})
      
    }))

//////////////////////////////////////////////////////////
// building trasnpaernt navbar

const nav = document.querySelector(".nav")

const opacityFunction = function(e,opacity){
  if(e.target.classList.contains("nav__link")){
    const link = e.target
    // const siblings = nav.querySelectorAll(".nav__link")
    const siblings = link.closest(".nav").querySelectorAll(".nav__link")
    const image = link.closest(".nav").querySelector("img")

    siblings.forEach(el => {
      if(el !== link) el.style.opacity=opacity
    })
      
    image.style.opacity =opacity
  }
}
nav.addEventListener("mouseover",function(e){
  opacityFunction(e,0.5)
  
  

})
nav.addEventListener("mouseout",function(e){
  opacityFunction(e,1)
})
/////////////////////////////////////////////
// tabbed component
const tab = document.querySelector(".operations__tab-container")

tab.addEventListener("click",function(e){

  if(e.target.classList.contains("btn")){
    const btn = e.target
    const btnNum = btn.dataset.tab
    const contents = document.querySelectorAll(".operations__content")
    console.log(btnNum);
    btn.closest(".operations__tab-container").querySelectorAll(".btn")
    .forEach(el => el.classList.remove("operations__tab--active"))
    
    btn.classList.add("operations__tab--active")
    
    contents.forEach(content => content.classList.remove("operations__content--active"))
    document.querySelector(`.operations__content--${btnNum}`).classList.add("operations__content--active")
   
  }
})
/////////////////////////////////////////////////////////////
// sticky navbar
const header = document.querySelector("header")
const obsFun = function(entries,observer){
  // if(window.scrollY>scords.top) nav.classList.add("sticky")
  // else nav.classList.remove("sticky")
  //  nav.classList.add("sticky")
  const entry = entries[0]
  // console.log(entry);
  if(!entry.isIntersecting) nav.classList.add("sticky")
  else nav.classList.remove("sticky")
    
}
const obsObj ={
  root:null,
  treshold : 0,
  rootMargin : "-50px",
}
const observer = new IntersectionObserver(obsFun,obsObj)
observer.observe(header)


///////////////////////////////////
// spawning content function

// const sections = document.querySelectorAll("section")
// sections.forEach(sec => sec.classList.add("section--hidden"))

// const obsObj2Fun = function(entries,observer){
//   const entry1 =  entries[0]
//   console.log(entry1);
//   if(!entry1.isIntersecting) return;
//    entry1.target.classList.remove("section--hidden")
//    observer.unobserve(entry1.target)
//   }

// const obsObj2 = {
//   root:null,
//   treshold:0.15,
//   // rootMargin: "200px"
// }


// const observerSec = new IntersectionObserver(obsObj2Fun,obsObj2)
// sections.forEach(sec => observerSec.observe(sec))


////////////////////////////////////////
// lazy images loading
const imgsLazy = document.querySelectorAll(".features__img")

const obsLazyFun = function(entries,observer){
  const [entry] = entries
  const realPic = entry.target.dataset.src
  entry.target.src =`${realPic}`
  entry.target.classList.remove("lazy-img")
  observer.unobserve(entry.target)
  
}
const obsLazy = {
  root: null,
  treshold: 0,
  // rootMargin: "600px"
}
const observerLazy = new IntersectionObserver(obsLazyFun,obsLazy)

imgsLazy.forEach( img => observerLazy.observe(img))

//////////////////////////////////////////////
// slide sliding function
const slider = document.querySelector(".slider")
const slides = document.querySelectorAll(".slide")
const btnRight = document.querySelector(".slider__btn--right")
const btnLeft = document.querySelector(".slider__btn--left")

let curSlide = 0
slides.forEach((slide,i) =>{
  slide.style.transform =`translateX( ${100*i}%)`
})
const goToSlide = function(slide){

  slides.forEach(function(s,i){
    s.style.transform =`translateX(${100*(i-slide)}%)`
  })
}

goToSlide(curSlide)

const dotLogic = function(slide){
  const dots = document.querySelectorAll(".dots__dot")
  dots.forEach(function(dot){
   const dotTarget = dot.dataset.slide
   dot.classList.remove("black")
   if(Number(dotTarget) === slide){
     console.log(dotTarget);
    dot.classList.add("black")
   }
  })
}


const prevSlide =function(){
  if(curSlide=== 0){
    curSlide=slides.length-1
  }else curSlide--;
 dotLogic(curSlide)
 goToSlide(curSlide)
}
const nextSlide =function(){
  if(curSlide===slides.length-1){
    curSlide=0
  }else curSlide++;
  dotLogic(curSlide)
 goToSlide(curSlide)
}

btnLeft.addEventListener("click",prevSlide)
btnRight.addEventListener("click",nextSlide)

document.addEventListener("keydown",function(e){
  if(e.key === "ArrowRight"){
    nextSlide()
  }else if (e.key === "ArrowLeft"){
    prevSlide()
  }

})
document.addEventListener("click",function(e){
  const target = e.target
  const dotTarget = target.dataset.slide
  dotLogic(Number(dotTarget))
  goToSlide(Number(dotTarget))
})
/////////////////////////////////////////
// adding dots
const dotContainer = document.querySelector(".dots")
const addDots = function(){
  slides.forEach((s,i) => {
    dotContainer.insertAdjacentHTML(
    "beforeend",
    `<button class="dots__dot" data-slide="${i}"></button>`)
})
}
addDots()
dotLogic(0)
