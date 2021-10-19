export const createElement = (nodeType, className) => {
    const elem = document.createElement(nodeType);
    elem.setAttribute('class', className);
    return elem;
}

export const clearContainer = (container) => {
    container.innerHTML = '';
}

const setFilm = ({ img, id, title }, targetBlock) => {
    const div = createElement('div', 'films__img-block fade');
    const titleElem = createElement('h2', 'films__title');
    const imgElem = createElement('img', 'films__img');
    const heart = createElement('span', "icon icon-heart");
    div.setAttribute('data-id', id);

    titleElem.innerText = title;
    imgElem.setAttribute('src', img || '../img/no-img.jpg');
    targetBlock.append(div);
    div.append(titleElem);
    div.append(imgElem);
    div.append(heart);
}

export const spawnFilms = (filmData, targetBlock) => {
    filmData.forEach(item => {
        const filmObj = {
            img: item?.image?.medium,
            id: item?.id,
            title: item?.name
        };
        setFilm(filmObj, targetBlock);
    });
}

export const handleLoad = (data, container) => {
    clearContainer(container);
    if (data.length) {
        spawnFilms(data, container);
    } else {
        container.append('NOT FOUND');
    }
}