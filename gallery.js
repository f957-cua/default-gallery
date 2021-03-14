import cards from './gallery-items.js';
import refs from './dom.js';
    
refs.imageContainer.addEventListener('click', (e) => {
    e.preventDefault();
    const imageClick = e.target.classList.contains('gallery__image');

    if (!imageClick) {
        return
    };

    modalOpen(e);
})

refs.buttonCloseModal.addEventListener('click', onButtonCloseModal);

refs.modalOverlay.addEventListener('click', onButtonCloseModal);

window.addEventListener('keydown', (e) => {

    if (e.code !== "Escape") {
        return;
    }
    onButtonCloseModal();
});

function getModalImg(e) {
    refs.modalImage.src = e.target.dataset.source;
    refs.modalImage.alt = e.target.alt;
    refs.modalImage.dataset.index = e.target.dataset.index;
}

function onButtonCloseModal(e) {
    const modalIsOpen = refs.modalWindow.classList.contains('is-open');
    if (!modalIsOpen) {
        return; 
    }
    refs.modalWindow.classList.remove('is-open');

    getModalImg(e);
}

function modalOpen(e) {
    refs.modalWindow.classList.add('is-open');
    addImageInModal(e);
}

function addImageInModal(e) {
    getModalImg(e); 
}

//----ArrowLeft&Right-----

window.addEventListener('keydown', (e) => {
    let index;

    if (e.code === "ArrowRight") {
        onArrowRight();
    }

    if (e.code === "ArrowLeft") {
        onArrowLeft();
    }
});



function onArrowLeft(index) {
    index = +refs.modalImage.dataset.index;
    if (index === 0) {
        setNewSrc(cards.length - 1, 0);
        return;
    }
    setNewSrc(index, -1);
}

function onArrowRight(index) {
    index = +refs.modalImage.dataset.index;

    if (index === cards.length -1) {
        setNewSrc(0, 0);
        return;
    }
    setNewSrc(index, 1);
}

function setNewSrc(index, step) {
    refs.modalImage.dataset.index = `${index + step}`;
    refs.modalImage.src = cards[index + step].original;
}
