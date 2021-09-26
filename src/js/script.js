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

const setFilm = ({ img, id }, targetBlock) => {
    const div = createElement('div', 'films__img-block');
    div.setAttribute('data-id', id)
    const imgElem = createElement('img', 'films__img');
    const heart = createElement('i', 'icon-holder icon-linkedin');

    imgElem.setAttribute('src', img);
    targetBlock.append(div);
    div.append(imgElem);
    div.append(heart);
}

const spawnFilms = (filmData, targetBlock) => {
    filmData.forEach(item => {
        const filmObj = {
            img: item.show?.image?.medium,
            id: item.show?.id
        };
        setFilm(filmObj, targetBlock);
    });
}

const sendAction = () => { //Переписать валидацию.
    if (inp.value.length > 2) {
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

const handleFetch = async (querry) => {
    const promise = await fetch(`http://api.tvmaze.com/search/shows?q=${querry}`);
    try {
        const data = await promise.json();
        // console.log(data);
        return data;
    } catch {
        handleError (promise.status);
    }
}

const loadFilms = (querry) => {
    handleFetch(querry)
    .then((data) => {
        handleLoad(data)
    })
}

loadFilms('work');

serverBtn.addEventListener('click', () => {
    loadFilms(inp.value);
});

// inp.addEventListener('keydown', (e) => {
//     if (e.code = 'Enter') {
//         handleFetch(inp.value);
//     }
// });


//Filters

const genreSelection = document.getElementById('genre');
const langSelection = document.getElementById('language');
// console.log(langSelection.value);

const choseLang = (arr) => {
   return arr.filter(item => item?.show?.language === "Japanese")
}


const chooseSomething = (querry, value) => {
    handleFetch(querry)
    .then((data) => {
        const a = data.filter(item => item?.show?.language === value);
        // console.log(a);
    })
}
chooseSomething('elf', 'Japanese');


const selectGenre = (select, querry, value) => {
    select.addEventListener('change', () => {
        handleFetch(inp.value)
            .then((data) => {
                console.log(langSelection.value);
                return data.filter(item =>  item?.show?.language === langSelection.value);
            })
            .then((data => {
                console.log(inp.value);
                console.log(data);
                handleLoad(data);
            }))
    })
}

selectGenre(langSelection);
selectGenre(genreSelection);

//Favourite
const selected = [];

filmContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('icon-linkedin')) {
        console.log(event.target.parentElement.getAttribute('data-id'))
        foo(inp.value, event.target);
    }
})


const foo = (querry, elem) => {
    handleFetch(querry)
    .then((data) => {
        data.forEach(item => {
            if (+item?.show?.id === +elem.parentElement.getAttribute('data-id')) {
                console.log(item);
                localStorage.setItem('Item', JSON.stringify(item));
            }
        })
    })
}

// const toFavoriteButton = document.querySelectorAll('.heart');
// console.log(toFavoriteButton)


//Избавиться от зависимости от inp.value!!!