const serverBtn = document.getElementById('serverButton');
const inp = document.getElementById('inp');
const filmContainer = document.getElementById('filmContainer');


const createElement = (nodeType, className) => {
    const elem = document.createElement(nodeType);
    elem.setAttribute('class', className);
    return elem;
}

const clearContainer = (container) => {
    container.innerHTML = '';
}

const setFilm = ({ img }, targetBlock) => {
    const div = createElement('div', 'films__img-block');
    const imgElem = createElement('img', 'films__img');

    imgElem.setAttribute('src', img);
    targetBlock.append(div);
    div.append(imgElem);
}

const spawnFilms = (filmData, targetBlock) => {
    filmData.forEach(item => {
        const filmObj = {
            img: item.show?.image?.medium
        };
        setFilm(filmObj, targetBlock);
    });
}

const sendAction = () => { //Переписать валидацию.
    if (inp.value.length > 2) {
        // xhr.send();
        //Как блокировать fetch?
        inp.style.border = '1px solid grey';
    } else {
        inp.style.border = '1px solid red';
    }
}

const handleLoad = (data) => {
    clearContainer(filmContainer);

    if(data.length) {
        spawnFilms(data, filmContainer);
    } else {
        filmContainer.append('NOT FOUND');
    }
}

const handleError = ({ status }) => {
    console.log('Ошибка соединения ', status);//Раньше тут был XMLHttpRequest. Проверить правильность статуса.
}

const handleFetch = () => {
    const promise = fetch(`http://api.tvmaze.com/search/shows?q=${inp.value}`);

    promise
        .then((response) => {
            console.log(response.status)
            return response.json();
        })
        // .then((data) => {
        //     handleLoad(data)
        // })
        .then(handleLoad)
        .catch(handleError)
}

serverBtn.addEventListener('click', handleFetch);

//Пятидесятая минута 16 урока.