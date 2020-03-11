/* Navigation */

let navLink = document.querySelectorAll(".navigation-link");
for (let elem of navLink) {
    elem.addEventListener("click", navColor);
}
function navColor() {
    for (let elem of navLink) {
        elem.classList.remove("active");
    }
    this.classList.toggle("active"); 
}

/* Slides */

let slideBackground = document.querySelector(".slider");
let slideFirst = document.querySelector(".slider__iphone-slide1");
let slideSecond = document.querySelector(".slider__iphone-slide2");
let sliderNext = document.querySelector(".slider-next");
let sliderPrev = document.querySelector(".slider-prev");

sliderNext.addEventListener("click", switchSlide);
sliderPrev.addEventListener("click", switchSlide);

function switchSlide() {
    slideFirst.classList.toggle("disabled");
    slideSecond.classList.toggle("disabled");
    if (slideBackground.classList.contains("slider_red")) {
        slideBackground.classList.remove("slider_red");
        slideBackground.classList.add("slider_blue");   
    } else if (slideBackground.classList.contains("slider_blue")) {
        slideBackground.classList.remove("slider_blue");
        slideBackground.classList.add("slider_red"); 
    }      
}

/* Screen activation */

let firstScreen = document.querySelector(".iphone-slide1-screen_first");
let secondScreen = document.querySelector(".iphone-slide1-screen_second");
let thirdScreen = document.querySelector(".iphone-slide2-screen");
let homeButtons = document.querySelectorAll(".home");

for (let elem of homeButtons) {
    elem.addEventListener("click", screenOff);
}

function screenOff() {
    if (this.alt == "Home1") {
        firstScreen.classList.toggle("disabled");       
    } else if (this.alt == "Home2") {
        secondScreen.classList.toggle("disabled");  
    } else if (this.alt == "Home3") {
        thirdScreen.classList.toggle("disabled");  
    }   
}

/* Portfolio Tabs */

let portfolioLink = document.querySelectorAll(".portfolio__navigation-button");
let projectsImages = document.querySelectorAll(".projects-item img");

for (let elem of portfolioLink) {
    elem.addEventListener("click", tabs);
}

function shuffle(array) {
    let i = array.length,
        j = 0,
        temp;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
        
function tabs() {
    for (let elem of portfolioLink) {
        elem.classList.remove("portfolio__navigation-button_active");
    }
    this.classList.toggle("portfolio__navigation-button_active");

    for (let elem of projectsImages) {
        elem.classList.remove("bordered");
    }

    let randNumb = shuffle([1,2,3,4,5,6,7,8,9,10,11,12]);
    let length = randNumb.length;
    for (let i = 0; i < length; i++) {  
        projectsImages[i].src = `assets/images/projects/image-${randNumb[i]}.png`;          
    }         
}

/* Projects images */

for (elem of projectsImages) {
    elem.addEventListener("click", border);
}

function border() {
    for (let elem of projectsImages) {
        elem.classList.remove("bordered");
    }
    this.classList.toggle("bordered");
}