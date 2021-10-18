
// Modal Window Constructor
function galleryConstructor(type) {
    // Container
    const modalWindowContainer = document.createElement('div');
    modalWindowContainer.classList.add('modal-window-container');
    document.body.appendChild(modalWindowContainer);
    
    // Close button
    const modalWindowClose = document.createElement('button');
    modalWindowClose.classList.add('modal-window-close');
    modalWindowClose.innerHTML = 'close';
    modalWindowContainer.appendChild(modalWindowClose);

    // Modal Window
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');
    modalWindowContainer.appendChild(modalWindow);

    // Next & prev buttons
    const modalWindowPrev = document.createElement('button');
    const modalWindowNext = document.createElement('button');
    modalWindowPrev.classList.add('modal-window-prev');
    modalWindowNext.classList.add('modal-window-next');
    modalWindowPrev.innerHTML = 'prev';
    modalWindowNext.innerHTML = 'next';
    modalWindow.appendChild(modalWindowPrev);
    modalWindow.appendChild(modalWindowNext);

    // Slider outer & inner
    const modalWindowSliderOuter = document.createElement('div');
    modalWindowSliderOuter.classList.add('modal-window-slider-outer');
    modalWindowContainer.appendChild(modalWindowSliderOuter);
    const modalWindowSliderInner = document.createElement('div');
    modalWindowSliderInner.classList.add('modal-window-slider-inner');
    modalWindowSliderOuter.appendChild(modalWindowSliderInner);

    // Slider items

    // First item is thumbnail
    let idCounter = 1;
    let modalWindowSliderItem = document.createElement('div');
    modalWindowSliderItem.classList.add('modal-window-slider-item');
    modalWindowSliderInner.appendChild(modalWindowSliderItem);
    let modalWindowSliderItemImg = document.createElement('img');
    modalWindowSliderItemImg.src = `img/${type}_thumbnail.jpg`;
    modalWindowSliderItemImg.id = idCounter;
    modalWindowSliderItem.appendChild(modalWindowSliderItemImg);


    // Fetch for other images 
    fetch('/app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: type }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        let images = data;

        for (let i = 0; i < images.length; i++) {

            idCounter++

            let modalWindowSliderItem = document.createElement('div');
            modalWindowSliderItem.classList.add('modal-window-slider-item');
            modalWindowSliderInner.appendChild(modalWindowSliderItem);

            let modalWindowSliderItemImg = document.createElement('img');
            modalWindowSliderItemImg.src = images[i].path;
            modalWindowSliderItemImg.classList.add(images[i].path);
            modalWindowSliderItemImg.id = idCounter;
            modalWindowSliderItem.appendChild(modalWindowSliderItemImg);
        }
    });
        
}
const worksItems = document.querySelectorAll(".works-item-top");




// Open
let actingImageId = 1;

worksItems.forEach((item) => {
    item.addEventListener("click", () => openGallery(item.id));
});

function openGallery(item) {
    galleryConstructor(item);
    
    const modalWindow = document.querySelector('.modal-window')
    modalWindow.style.backgroundImage = `url('img/${item}_thumbnail.jpg')`;
    document.body.style.overflow = 'hidden';


    // Close
    const modalWindowClose = document.querySelector('.modal-window-close');
    modalWindowClose.addEventListener('click', closeGallery);

    // Next 
    const modalWindowNext = document.querySelector('.modal-window-next');
    modalWindowNext.addEventListener('click', galleryNext);

    // Prev
    const modalWindowPrev = document.querySelector('.modal-window-prev');
    modalWindowPrev.addEventListener('click', galleryPrev);

    // Slider click ability
    const modalWindowSliderItems = document.querySelectorAll('.modal-window-slider-item');
    console.log(modalWindowSliderItems)
    modalWindowSliderItems.forEach((item) => {
        item.addEventListener('click', () => galleryItemClick(item));
    });
}

function closeGallery() {
    const modalWindowClose = document.querySelector('.modal-window-close');
    modalWindowClose.removeEventListener('click', closeGallery);

    document.querySelector('.modal-window-container').remove();
    document.body.style.overflow = 'auto';
}

function galleryNext() {
    console.log("beeb")
    let images = document.querySelectorAll('.modal-window-slider-item img');

    if (actingImageId === images.length) return;

    actingImageId++;
    console.log(actingImageId)
    const modalWindow = document.querySelector('.modal-window');
    modalWindow.style.backgroundImage = `url(${images[actingImageId-1].src})`;

}

function galleryItemClick(item) {
    const modalWindow = document.querySelector('.modal-window');
    console.log(item)
}


function galleryPrev() {
    console.log("beeb")
    let images = document.querySelectorAll('.modal-window-slider-item img');

    if (actingImageId === 1) return;

    actingImageId -= 1;
    console.log(actingImageId)
    const modalWindow = document.querySelector('.modal-window');
    modalWindow.style.backgroundImage = `url(${images[actingImageId-1].src})`;
}


// Gallery click

// const modalWindowSliderItems = document.querySelectorAll(".modal-window-slider-item img");



// Modal Window Slider
// let isDown = false;
// let startX;
// let scrollLeft;
// const slider = document.querySelector('.modal-window-slider-inner');
// const close = document.querySelector('.modal-window-close');

// function end() {
//     isDown = false;
//     slider.classList.remove('is-moving');
//     slider.classList.remove('active');
// }

// function start(e) {
//     isDown = true;
//     slider.classList.add('active');

//     startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
//     scrollLeft = slider.scrollLeft;


//     // Move or click
//     slider.addEventListener('mousemove', move);
//     slider.addEventListener('touchmove', move);

//     modalWindowSliderItems.forEach((item) => {
//         item.addEventListener("mouseup", () => {
//             isDown = false;
//             slider.classList.remove('active');
            
//             modalWindow.style.backgroundImage = `url(${item.src})`;
//             index = item.id;
//         });
//     });
// }

// function move(e) {
//     if(!isDown) return;
//     slider.classList.add('is-moving');

//     e.preventDefault();
//     const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
//     const dist = (x - startX);
//     slider.scrollLeft = scrollLeft - dist;

//     // Stop scrolling
//     slider.addEventListener('mouseleave', end);
//     slider.addEventListener('mouseup', end);
//     slider.addEventListener('touchend', end);
// }


// slider.addEventListener('mousedown', start);
// slider.addEventListener('touchstart', start);


// Request for image


