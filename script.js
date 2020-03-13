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

/* Switch active navigation link */

let anchor = document.querySelectorAll(".anchor"),
    anchors = {},
    i = 0;
    
Array.prototype.forEach.call(anchor, function(e) {
    anchors[e.id] = e.offsetTop - 200;
});
    
anchors.Contacts = 2400;

window.addEventListener("scroll", activeNav);

function activeNav() {
    let scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
    for (i in anchors) {
        if (anchors[i] <= scrollPosition) {
            document.querySelector('.active').classList.remove("active");
            document.querySelector('a[href*=' + i + ']').classList.add("active");
        }
    }
}
      
/* Smooth anchors */

for (let elem of navLink) {
    elem.addEventListener("click", function smooth(event) {
        event.preventDefault();
        const blockId = elem.getAttribute("href");
        document.querySelector("" + blockId).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}

/* Fixed Navigation */

window.onscroll = function() {fixeNav()};
let navigation = document.querySelector("nav"),
    sticky = navigation.offsetTop;

function fixeNav() {
    if (window.pageYOffset >= sticky) {
        navigation.classList.add("navigation_sticky")
    } else 
        navigation.classList.remove("navigation_sticky");
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
    inputSubject = document.querySelector(".subject"), 
    textarea = document.querySelector(".form__textarea"),
    popupSubjectResult = document.querySelector(".subject-result"),
    popupDescriptionResult = document.querySelector(".description-result");

popupCLose.addEventListener("click", closePopup);
closeButton.addEventListener("click", closePopup);

form.addEventListener('submit',  function(event) {
    event.preventDefault();
    if (form.checkValidity()) {
        popupSubjectResult.innerHTML = (inputSubject.value) ?  "Тема: " + inputSubject.value : "Без темы";
        popupDescriptionResult.innerHTML = (textarea.value) ? "Описание: " + textarea.value : "Без описания";
        popup.classList.remove("disabled");
    }
    form.reset();
    return false;
});

function closePopup() {
    form.reset()
    popup.classList.add("disabled");
}




    
    