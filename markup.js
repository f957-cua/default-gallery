import cards from './gallery-items.js';
import refs from './dom.js';

const cardsMarkup = createCardsMarkup(cards);

refs.imageContainer.insertAdjacentHTML('beforeend', cardsMarkup);

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
