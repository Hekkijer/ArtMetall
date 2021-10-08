
// Modal Window

const worksItems = document.querySelectorAll(".works-item-top");
const modalWindowContainer = document.querySelector(".modal-window-container");
const modalWindow = document.querySelector(".modal-window");
const modalWindowNext = document.querySelector(".modal-window-next");
const modalWindowPrev = document.querySelector(".modal-window-prev");


let index = 0;

// Open
worksItems.forEach((item) => {
    item.addEventListener("click", () => {
        modalWindow.style.backgroundImage = `url(${document.getElementById(1).src})`;
        index = 1;
        modalWindowContainer.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
});

// Close
document.querySelector(".modal-window-close").addEventListener("click", () => {
    modalWindowContainer.style.display = "none";
    document.body.style.overflow = "auto";
});

// Next 
modalWindowNext.addEventListener("click", () => {
    if (index == 11) {
        return;
    }
    index++;

    modalWindow.style.backgroundImage = `url(${document.getElementById(index).src})`;
    slider.scrollLeft += 300;
});

// Prev
modalWindowPrev.addEventListener("click", () => {
    if (index == 1) {
        return;
    }
    index -= 1;
    modalWindow.style.backgroundImage = `url(${document.getElementById(index).src})`;
    slider.scrollLeft -= 300;
});

// Gallery click

const modalWindowSliderItems = document.querySelectorAll(".modal-window-slider-item img");



// Modal Window Slider
let isDown = false;
let startX;
let scrollLeft;
const slider = document.querySelector('.modal-window-slider-inner');
const close = document.querySelector('.modal-window-close');

function end() {
    isDown = false;
    slider.classList.remove('active');
    slider.classList.remove('is-moving');
}

function start(e) {
    isDown = true;
    slider.classList.add('active');
    
    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;


    // Move or click
    slider.addEventListener('mousemove', move);
    slider.addEventListener('touchmove', move);

    modalWindowSliderItems.forEach((item) => {
        item.addEventListener("mouseup", () => {
            isDown = false;
            modalWindow.style.backgroundImage = `url(${item.src})`;
            index = item.id;
        });
    });
}

function move(e) {
    if(!isDown) return;
    slider.classList.add('is-moving');

    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const dist = (x - startX);
    slider.scrollLeft = scrollLeft - dist;

    // Stop scrolling
    slider.addEventListener('mouseleave', end);
    slider.addEventListener('mouseup', end);
    slider.addEventListener('touchend', end);
}


slider.addEventListener('mousedown', start);
slider.addEventListener('touchstart', start);
