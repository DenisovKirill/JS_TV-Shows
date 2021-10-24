import { checkFavourite } from './favourite.js';

export const createElement = (nodeType, className) => {
    const elem = document.createElement(nodeType);
    elem.setAttribute('class', className);
    return elem;
}

export const clearContainer = (container) => {
    container.innerHTML = '';
}

export const handleLoad = (filmData, targetBlock) => {
    clearContainer(targetBlock);

    filmData.forEach((film) => {
        const div = createElement('div', 'films__img-block fade');
        const titleElem = createElement('h2', 'films__title');
        const imgElem = createElement('img', 'films__img');
        const heart = createElement('span', "icon icon-heart");

        const { id, image, name } = film;

        div.setAttribute('data-id', id);
        titleElem.innerHTML = name;
        imgElem.setAttribute('src',  image?.medium || '../img/no-img.jpg');
        imgElem.setAttribute('alt', name || 'Unknown');
        div.append(titleElem, imgElem, heart);

        checkFavourite(id, heart);

        targetBlock.append(div);
    });
}
