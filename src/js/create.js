export const createElement = (nodeType, className) => {
    const elem = document.createElement(nodeType);
    elem.setAttribute('class', className);
    return elem;
}

export const clearContainer = (container) => {
    container.innerHTML = '';
}

const setFilm = ({ img, id }, targetBlock) => {
    const div = createElement('div', 'films__img-block fade');
    div.setAttribute('data-id', id)
    const imgElem = createElement('img', 'films__img');
    const heart = createElement('i', 'icon icon-circle-right');

    imgElem.setAttribute('src', img);
    targetBlock.append(div);
    div.append(imgElem);
    div.append(heart);
}

const spawnFilms = (filmData, targetBlock) => {
    filmData.forEach(item => {
        const filmObj = {
            img: item.show?.image?.medium || item?.image?.medium,
            id: item?.show?.id || item?.id
        };
        setFilm(filmObj, targetBlock);
    });
}

export const handleLoad = (data, container) => {
    clearContainer(container);

    if(data.length) {
        spawnFilms(data, container);
    } else {
        container.append('NOT FOUND');
    }
}