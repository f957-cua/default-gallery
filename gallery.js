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

    modalImageOpen(e);
})

buttonCloseModal.addEventListener('click', onButtonCloseModal);

modalOverlay.addEventListener('click', onButtonCloseModal);

function onButtonCloseModal() {
    const modalIsOpen = modalWindow.classList.contains('is-open');
    if (!modalIsOpen) {
        return; 
    }
    modalWindow.classList.remove('is-open');

    modalImage.src = '';
    modalImage.alt = '';
}

function modalImageOpen(e) {
    modalWindow.classList.add('is-open');
    modalImage.src = e.target.dataset.source;
    modalImage.alt = e.target.alt;
}

function createCardsMarkup(cards) {
    return cards.map(({ preview, original, description }) => {
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
            alt="${description}"
            />
        </a>
    </li>
        `;
    }).join('');
}; 

//----in progress---

// window.addEventListener('keydown', (e) => {
//     console.log(e);
// });

// function onModalImageChange(cards) {
//     let index 
//     const currentImage = cards.find(card => card.description === modalImage.alt);
//     console.log(currentImage);
// }