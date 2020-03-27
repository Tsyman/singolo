/* Navigation */

let navLink = document.querySelectorAll(".navigation-link");
for (let elem of navLink) {
    elem.addEventListener("click", navColor);
}
function navColor(event) {
    for (let elem of navLink) {
        elem.classList.remove("active-link");
    }
    event.target.classList.toggle("active-link");
}

/* Switch active navigation link */

let anchor = document.querySelectorAll(".anchor"),
    navigationDesktop = document.querySelector(".header__navigation"),
    anchors = {},
    i = 0;
    
Array.prototype.forEach.call(anchor, function(event) {
    anchors[event.id] = event.offsetTop - 80;
});

window.addEventListener("scroll", activeNav);

function activeNav() {
    let scrollPosition = window.pageYOffset;
    for (i in anchors) {
        if (anchors[i] <= scrollPosition) {
            document.querySelector('.active-link').classList.remove("active-link");
            navigationDesktop.querySelector('.active-link').classList.remove("active-link");
            document.querySelector('a[href*=' + i + ']').classList.add("active-link");
            navigationDesktop.querySelector('a[href*=' + i + ']').classList.add("active-link");
        }
    }
    if (window.pageYOffset >= document.documentElement.offsetHeight - innerHeight) {
        document.querySelector('.active-link').classList.remove("active-link");
        navigationDesktop.querySelector('.active-link').classList.remove("active-link");
        document.querySelector('a[href*="Contacts"]').classList.add("active-link");
        navigationDesktop.querySelector('a[href*="Contacts"]').classList.add("active-link");
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
let headerHeight = document.querySelector("header").offsetHeight;

function fixeNav() {
    if (window.pageYOffset >= headerHeight) {
        document.querySelector("header").classList.add("header-sticky", "header-opacity"); 
    } else 
        document.querySelector("header").classList.remove("header-sticky", "header-opacity");
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
	items[currentItem].addEventListener('animationend', function(event) {
        event.target.classList.remove('active-item', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function(event) {
		event.target.classList.remove('next', direction);
        event.target.classList.add('active-item');
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

/* Swiper for mobiles */ 

const swipedetect = (el) => {
  
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('arrow')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									previousItem(currentItem);
								}
							} else {
								if (isEnabled) {
									nextItem(currentItem);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

var el = document.querySelector('.slider__container');
swipedetect(el);

/* Screen activation */

let firstScreen = document.querySelector(".iphone-slide1-screen_first"),
    secondScreen = document.querySelector(".iphone-slide1-screen_second"),
    thirdScreen = document.querySelector(".iphone-slide2-screen"),
    homeButtons = document.querySelectorAll(".home");

for (let elem of homeButtons) {
    elem.addEventListener("click", screenOff);
    elem.addEventListener("touchstart", screenOff);
}

function screenOff(event) {
    if (event.target.alt == "Home1") {
        firstScreen.classList.toggle("disabled");       
    } else if (event.target.alt == "Home2") {
        secondScreen.classList.toggle("disabled");  
    } else if (event.target.alt == "Home3") {
        thirdScreen.classList.toggle("disabled");  
    }   
}

/* Portfolio Tabs */

let portfolioLink = document.querySelectorAll(".portfolio__navigation-button"),
    projectsList = document.querySelector(".projects-list").children;
    projectsListArray = Array.prototype.slice.call(projectsList);

for (let elem of portfolioLink) {
    elem.addEventListener("click", (event) => {
        projectsListArray.sort(function() {return Math.random() - .5; });
        projectsListArray.forEach( elem => document.querySelector(".projects-list").append(elem));

        for (let elem of portfolioLink) {
            elem.classList.remove("portfolio__navigation-button_active");
            elem.disabled = false;
        }
        event.target.classList.toggle("portfolio__navigation-button_active");
        event.target.disabled = true;

        for (let elem of projectsImages) {
            elem.classList.remove("image-border_visible");
        } 
    });
}

/* Projects images */

projectsImages = document.querySelectorAll(".projects-item img");

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
});

function closePopup() {
    form.reset()
    popup.classList.add("disabled");
}

/* Mobile navigation */

let hamburger = document.querySelector(".hamburger");
    navigationModal = document.querySelector(".navigation-modal");
    navigationMobile = document.querySelector(".navigation-mobile");
    headerContainer= document.querySelector(".header__container");
    navigationListMobile = document.querySelector(".navigation-list").cloneNode(true);
    navigationMobile.append(navigationListMobile);
    navigationListMobile.classList.remove("navigation-list");
    navigationListMobile.classList.add("navigation-list-mobile");
    logo = document.querySelector(".logo");


hamburger.addEventListener("click", navigationMobileOpen);
navigationModal.addEventListener("click", navigationMobileClose);

function navigationMobileOpen() {
    hamburger.classList.toggle("hamburger_open");
    navigationModal.classList.toggle("navigation-modal_open");
    headerContainer.classList.toggle("header__container-mobile");
    logo.classList.toggle("logo-mobile");
}

function navigationMobileClose(event) {
    console.log(event.target)
    if (event.target == document.querySelector(".navigation-modal__content") || event.target.classList.contains("navigation-link")) {
        hamburger.classList.toggle("hamburger_open");
        navigationModal.classList.toggle("navigation-modal_open");
        headerContainer.classList.toggle("header__container-mobile");
        logo.classList.toggle("logo-mobile");
    }
}   