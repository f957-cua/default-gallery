import cards from './gallery-items.js';

const imageContainer = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const buttonCloseModal = document.querySelector('button[data-action = "close-lightbox"]');
const modalOverlay = document.querySelector('.lightbox__overlay');


const cardsMarkup = createCardsMarkup(cards);

imageContainer.insertAdjacentHTML('beforeend', cardsMarkup);
    
imageContainer.addEventListener('click', (e) => {
    e.preventDefault();
    const imageClick = e.target.classList.contains('gallery__image');

    if (!imageClick) {
        return
    };

    modalOpen(e);
})

buttonCloseModal.addEventListener('click', onButtonCloseModal);

modalOverlay.addEventListener('click', onButtonCloseModal);

window.addEventListener('keydown', (e) => {

    if (e.code !== "Escape") {
        return;
    }
    onButtonCloseModal();
});


function onButtonCloseModal() {
    const modalIsOpen = modalWindow.classList.contains('is-open');
    if (!modalIsOpen) {
        return; 
    }
    modalWindow.classList.remove('is-open');

    modalImage.src = '';
    modalImage.alt = '';
}

function modalOpen(e) {
    modalWindow.classList.add('is-open');
    addImageInModal(e);
}

function addImageInModal(e) {
    modalImage.src = e.target.dataset.source;
    modalImage.alt = e.target.alt;
    modalImage.dataset.index = e.target.dataset.index;  
}

function createCardsMarkup(cards) {
    return cards.map(({ preview, original, description }, index) => {
        return `
    <li class="gallery__item">
        <a
            class="gallery__link"
            href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
        >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
            />
        </a>
    </li>
        `;
    }).join('');
}; 

//----ArrowLeft&Reight-----

window.addEventListener('keydown', (e) => {
    let index;

    if (e.code === "ArrowRight") {
        onArrowReight();
    }

    if (e.code === "ArrowLeft") {
        onArrowLeft();
    }
});



function onArrowLeft(index) {
    index = +modalImage.dataset.index;
    if (index === 0) {
        setNewSrc(cards.length - 1, 0);
        return;
    }
    setNewSrc(index, -1);
}

function onArrowReight(index) {
    index = +modalImage.dataset.index;

    if (index === cards.length -1) {
        setNewSrc(0, 0);
        return;
    }
    setNewSrc(index, 1);
}

function setNewSrc(index, step) {
    modalImage.dataset.index = `${index + step}`;
    modalImage.src = cards[index + step].original;
}