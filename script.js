/* Navigation */

let navLink = document.querySelectorAll(".navigation-link");
for (let elem of navLink) {
    elem.addEventListener("click", navColor);
}
function navColor() {
    for (let elem of navLink) {
        elem.classList.remove("active-link");
    }
    this.classList.toggle("active-link");
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
            document.querySelector('.active-link').classList.remove("active-link");
            document.querySelector('a[href*=' + i + ']').classList.add("active-link");
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

let items = document.querySelectorAll('.slider-item'),
    slideBackground = document.querySelector(".slider"),
    currentItem = 0,
    isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active-item', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
        this.classList.add('active-item');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
    showItem('from-right');
    slideBackground.classList.toggle("slider_blue");
    document.querySelector(".arrow.right").classList.toggle("arrow_color");
    document.querySelector(".arrow.left").classList.toggle("arrow_color");
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
    showItem('from-left');
    slideBackground.classList.toggle("slider_blue");
    document.querySelector(".arrow.left").classList.toggle("arrow_color");
    document.querySelector(".arrow.right").classList.toggle("arrow_color");
}

document.querySelector('.arrow.left').addEventListener('click', function() {
	if (isEnabled) {
        nextItem(currentItem);
	}
});

document.querySelector('.arrow.right').addEventListener('click', function() {
	if (isEnabled) {
        previousItem(currentItem);
	}
});

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

    let randNumb = shuffle([1,2,3,4,5,6,7,8,9,10,11,12]);
    let length = randNumb.length;
    for (let i = 0; i < length; i++) {  
        projectsImages[i].src = `assets/images/projects/image-${randNumb[i]}.png`;          
    }

    for (let elem of projectsImages) {
        elem.classList.remove("image-border_visible");
    }            
}

/* Projects images */

for (let i = 0; i < projectsImages.length; i++) {
    projectsImages[i].addEventListener('click', function (event) {
        projectsImages.forEach(function (item) {
            if (event.target !== item) {
                item.classList.remove("image-border_visible");
            }
        });

        if (event.target.classList.contains("image-border_visible")) {
            event.target.classList.remove("image-border_visible");
        } else event.target.classList.add("image-border_visible");
    });
}

/* Popup Message */

let form = document.querySelector(".form"),
    popup = document.querySelector(".popup"),
    closeButton = document.querySelector(".close-button"),
    popupCLose = document.querySelector(".popup_close"),
    inputSubject = document.querySelector(".subject"), 
    textarea = document.querySelector(".form__textarea"),
    popupSubjectResult = document.querySelector(".subject-result"),
    popupDescriptionResult = document.querySelector(".description-result");

popupCLose.addEventListener("click", closePopup);
closeButton.addEventListener("click", closePopup);

form.addEventListener('submit',  function(event) {
    event.preventDefault();
    if (form.checkValidity()) {
        popupSubjectResult.textContent = (inputSubject.value) ?  "Тема: " + inputSubject.value : "Без темы";
        popupDescriptionResult.textContent = (textarea.value) ? "Описание: " + textarea.value : "Без описания";
        popup.classList.remove("disabled");
    }
    form.reset();
    return false;
});

function closePopup() {
    form.reset()
    popup.classList.add("disabled");
}




    
    