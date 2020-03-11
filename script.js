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

/* Fixed Navigation */
window.onscroll = function() {fixeNav()};
let navigation = document.querySelector("nav");
var sticky = navigation.offsetTop;

function fixeNav() {
    if (window.pageYOffset >= sticky) {
      navigation.classList.add("navigation_sticky")
    } else {
      navigation.classList.remove("navigation_sticky");
    }
  }

/* Slides */

let slideBackground = document.querySelector(".slider"),
    slideFirst = document.querySelector(".slider__iphone-slide1"),
    slideSecond = document.querySelector(".slider__iphone-slide2"),
    sliderNext = document.querySelector(".slider-next"),
    sliderPrev = document.querySelector(".slider-prev");

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

let firstScreen = document.querySelector(".iphone-slide1-screen_first"),
     secondScreen = document.querySelector(".iphone-slide1-screen_second"),
     thirdScreen = document.querySelector(".iphone-slide2-screen"),
    homeButtons = document.querySelectorAll(".home");

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

let portfolioLink = document.querySelectorAll(".portfolio__navigation-button"),
    projectsImages = document.querySelectorAll(".projects-item img");

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
    elem.addEventListener("dblclick", borderOff);
}

function border() {
    for (let elem of projectsImages) {
        elem.classList.remove("bordered");
    }
    this.classList.toggle("bordered");
}

function borderOff(event) {
    target = event.target;
    if (target.classList.contains("bordered")) {
        target.classList.remove("bordered");
    }
}

/* Popup Message */

let form = document.querySelector(".form"),
    popup = document.querySelector(".popup"),
    closeButton = document.querySelector(".close-button"),
    popupCLose = document.querySelector(".popup_close"),
    popupToggle = document.querySelector(".form__button"),
    inputEmail = document.querySelector(".email"),
    inputName = document.querySelector(".name"),
    inputSubject = document.querySelector(".subject"), textarea = document.querySelector(".form__textarea"),
    popupSubjectResult = document.querySelector(".subject-result"),
    popupDescriptionResult = document.querySelector(".description-result");
    
popupToggle.addEventListener("click", openPopup);
popupCLose.addEventListener("click", closePopup);
closeButton.addEventListener("click", closePopup);


function openPopup(event) {

    event.preventDefault();

    removeValidation();

    if (checkName() && checkEmailMatch()) {
        if (!inputSubject.value) {
            popupSubjectResult.innerHTML = "Без темы";
             if (!textarea.value) {
            popupDescriptionResult.innerHTML = "Без описания";
            }
        }
        else {
            popupSubjectResult.innerHTML = "Тема: ";
            popupDescriptionResult.innerHTML = "Описание: "
            popupSubjectResult.innerHTML += inputSubject.value;
            popupDescriptionResult.innerHTML += textarea.value;
        }
        popup.classList.remove("disabled");
    }
}  

function closePopup() {
    popup.classList.add("disabled");
}

let generateError = function (text) {
    let error = document.createElement("div")
    error.className = "error";
    error.innerHTML = text;
    return error;
}


let removeValidation = function () {
    let errors = form.querySelectorAll(".error")
  
    for (let i = 0; i < errors.length; i++) {
      errors[i].remove()
    }
}

let checkName = function () {
    if (!inputName.value) {
        let error = generateError("Field cannot be blank");
        inputName.parentElement.insertBefore(error, inputName);
        return false;
    }
    else if (checkNameMatch(inputName.value) == false) {
        let error = generateError("Name doesn't match");
        inputName.parentElement.insertBefore(error, inputName);
        return false;
    }
    return true;
}

let checkEmailMatch = function () {
    if (!inputEmail.value) {
        let error = generateError("Field cannot be blank");
        inputEmail.parentElement.insertBefore(error, inputEmail);
        return false;
    }
    else if (validateEmail(inputEmail.value) == false) {
        let error = generateError("Email doesn't match");
        inputEmail.parentElement.insertBefore(error, inputEmail);
        return false;
    }
    return true;
}

let checkNameMatch = function (name) {
    let res =  /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    return res.test(name);
}

function validateEmail(email) {
    let res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(email);
}




    
    