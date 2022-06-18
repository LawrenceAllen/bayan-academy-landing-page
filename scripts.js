(function () {
    let w = window.innerWidth;
    let h = window.innerHeight;
    console.log(`Width: ${w}px, Height: ${h}`);
})();
const sortedAllvalues = [];
const latestTypes = [];
let slideIndex = 0;

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0%";
    } else {
        document.getElementById("navbar").style.top = "-30%";
    }
    prevScrollpos = currentScrollPos;
}

async function init() {
    const $eventItems = document.querySelector(".event-items");
    const $cards = $eventItems.querySelector(".event-cards-list");

    const response = await fetch('./events.json');
    const data = await response.json();

    const { events: eventCards } = data;

    eventCards.forEach(card => {
        $cards.innerHTML += renderEventCards(card);
    });

    getLatestEvents();
    renderSortedCards();
    clickAllTab();
    carouselSlides();

}

init();

function showMobileNavContent(e) {
    e.preventDefault();
    let mobileNavContent = document.querySelector(".mobile-navbar-content");
    if (mobileNavContent.style.display === "flex") {
        mobileNavContent.style.display = "none";
    } else {
        mobileNavContent.style.display = "flex";
    }
  }

function getLatestEvents() {
    const bayanType = [];
    const bestType = [];
    const topType = [];
    const greatType = [];
    const aewType = [];

    sortedAllvalues.map(a => {
        if(a.type == "bayan") {
            bayanType.push(a);
        } else if (a.type == "best") {
            bestType.push(a);
        } else if (a.type == "top") {
            topType.push(a);
        } else if (a.type == "great") {
            greatType.push(a);
        } else if (a.type == "aew") {
            aewType.push(a);
        }
    });

    latestTypes.push(bayanType[0])
    latestTypes.push(bestType[0])
    latestTypes.push(topType[0])
    latestTypes.push(greatType[0])
    latestTypes.push(aewType[0])
    console.log(latestTypes);
}

function noEvent(e) {
    const tab = document.querySelectorAll(".tab");
    const eventCards = document.getElementsByClassName("event-card");
    const crest = document.getElementsByClassName("crest")

    for (let i = 0; i < crest.length; i++) {
        crest[i].style.display = "flex";
    }

    for (let i = 0; i < eventCards.length; i++) {
        eventCards[i].style.display = "none";
    }

    for (let i = 0; i < tab.length; i++) {
        tab[i].className = tab[i].className.replace(" tab-active", "");
    }

    e.currentTarget.className += " tab-active";
}

function activeTab(e, type) {
    let tab = document.querySelectorAll(".tab");
    let eventCard = document.getElementsByClassName("event-card");
    let types = document.getElementsByName(type);
    const names = document.getElementsByName(type);
    const crest = document.getElementsByClassName("crest")

    for (let i = 0; i < crest.length; i++) {
        crest[i].style.display = "none";
    }

    for (let i = 0; i < eventCard.length; i++) {
        eventCard[i].style.display = "none";
    }

    for (let i = 0; i < tab.length; i++) {
        tab[i].className = tab[i].className.replace(" tab-active", "");
    }
    for (let i = 0; i < types.length; i++) {
        types[i].style.display = "flex";
    }

    for (let i = 0; i < names.length; i++) {
        names[i].style.display = "flex";
    }
    e.currentTarget.className += " tab-active";
}

function clickAllTab() {
    const names = document.getElementsByName('all');
    const tab = document.querySelectorAll(".tab");
    const defaultTab = document.getElementById("defaultTab");

    for (let i = 0; i < names.length; i++) {
        names[i].style.display = "flex";
    }

    for (let i = 0; i < tab.length; i++) {
        tab[i].className = tab[i].className.replace(" tab-active", "");
    }

    defaultTab.className += " tab-active";

}

function renderSortedCards() {
    const $cards = document.querySelector(".event-cards-list");

    latestTypes.forEach(a => 
        $cards.innerHTML += `<div class="event-card" name="${a.value}" >
            <div class="event-image-container">
                <div class="type-bg" style="background-color: 
                    ${a.type == "bayan" ? "#444444" :
                    a.type == "best" ? "#90187E" :
                    a.type == "top" ? "#CA2130" :
                    a.type == "great" ? "#1A9019" :
                    a.type == "aew" ? "#90187E" : "none"}">
                    <p>${a.type}</p>
                </div>
                <img src="./assets/${a.image_src}.png" class="event-image">
            </div>
            <div class="event-info-container">
                <p class="event-what">${a.title}</p>
                <div class="event-when">
                    <img src="./assets/event_clock.png">
                    <p>${a.eventDate.toLocaleString(('default'), {month: 'long'})} ${('0' + a.eventDate.getDate()).slice(-2)}, ${a.eventDate.getFullYear()} | ${a.start_time} - ${a.end_time}</p>
                </div>
                <div class="event-where">
                    ${a.location == "" ? "" : '<img src="./assets/event_location.png"></img>'}
                    <p>${a.location}</p>
                </div>
            </div>
        </div>
    `
    )

}

function renderEventCards(card) {
    const { type, title, image_src, date, start_time, end_time, location } = card;
  
    const eventDate = new Date(date);

    const actualDate = `${eventDate.toLocaleString(('default'), {month: 'long'})} ${('0' + eventDate.getDate()).slice(-2)}, ${eventDate.getFullYear()} `;

    sortedAllvalues.push(
        {
            title: title, 
            value: "all",
            type: type,
            image_src: image_src,
            eventDate: eventDate,
            start_time: start_time,
            end_time: end_time,
            location: location
        }
    );

    sortedAllvalues.sort(function (a, b) {
        return b.eventDate - a.eventDate;
    });

    return `<div class="event-card " name="${type}" >
            <div class="event-image-container">
                <div class="type-bg" style="background-color: 
                    ${type == "bayan" ? "#444444" :
                    type == "best" ? "#90187E" :
                    type == "top" ? "#CA2130" :
                    type == "great" ? "#1A9019" :
                    type == "aew" ? "#90187E" : "none"}">
                    <p>${type}</p>
                </div>
                <img src="./assets/${image_src}.png" class="event-image">
            </div>
            <div class="event-info-container">
                <p class="event-what">${title}</p>
                <div class="event-when">
                    <img src="./assets/event_clock.png">
                    <p>${actualDate} | ${start_time} - ${end_time}</p>
                </div>
                <div class="event-where">
                    ${location == "" ? "" : '<img src="./assets/event_location.png"></img>'}
                    <p>${location}</p>
                </div>
            </div>
        </div>
    `
}
/* console.log(sortedAllvalues.event.value); */

// Functions for Slideshow of images

function nextSlide(n) {
    let value = slideIndex += n;
    let slides = document.getElementsByClassName("carousel-image");
    let dots = document.getElementsByClassName("dot");
    if (value > slides.length) {
        slideIndex = 1
    }
    if (value < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    clearTimeout(carouselSlides);
}

function currentSlide(n) {
    let slides = document.getElementsByClassName("carousel-image");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        n = 1
    }
    if (n < 1) {
        n = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[n - 1].style.display = "block";
    dots[n - 1].className += " active";
    slideIndex = n;
    clearTimeout(carouselSlides);
}

function carouselSlides() {
    let slides = document.getElementsByClassName("carousel-image");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(carouselSlides, 10000);
}