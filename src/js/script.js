//Tabs

const tabsParent = document.getElementById('tabParent');
const tabs = document.querySelectorAll('.header__link');
const tabsContent = document.getElementsByClassName('tabsContent');

const hideTabsContent = () => {
    for (let item of tabsContent) {
        item.classList.remove('visible', 'fade');
        item.classList.add('hidden');
    }

    tabs.forEach(item => {
        item.classList.remove('header__link_active', 'fade')
    })
}

const showTabsContent = (i = 1) => {
    tabsContent[i].classList.remove('hidden');
    tabsContent[i].classList.add('visible', 'fade');
    tabs[i].classList.add('header__link_active', 'fade')
}

hideTabsContent();
showTabsContent();

tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('header__link')) {
        tabs.forEach((item, i) => {
            if (target === item) {
                hideTabsContent();
                showTabsContent(i);
            }
        })
    }
})

//Search

const serverBtn = document.getElementById('serverButton');
const searchInput = document.getElementById('inp');
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

const sendAction = () => { //Переписать валидацию.
    if (searchInput.value.length > 2) {
        //Как блокировать fetch?
        searchInput.style.border = '1px solid grey';
    } else {
        searchInput.style.border = '1px solid red';
    }
}

const handleLoad = (data, container) => {
    clearContainer(container);

    if(data.length) {
        spawnFilms(data, container);
    } else {
        container.append('NOT FOUND');
    }
}

const handleError = ({ status }) => {
    console.log('Ошибка соединения ', status);
}

const handleFetch = async () => {
    let url;
    if(searchInput.value) {
        url = `http://api.tvmaze.com/search/shows?q=${searchInput.value}`;
    } else {
        url = 'http://api.tvmaze.com/shows?page=1';
    }

    const promise = await fetch(url);
    try {
        const data = await promise.json();
        // return data
        return data.slice(0, 40);
    } catch {
        handleError (promise.status);
    }
}

// const getDataLength = () => {
//     handleFetch()
//         .then((data) => {
//             // console.log(data.length);
//             return data.length
//         })
// }

const loadFilms = () => {
    handleFetch()
    .then((data) => {
        handleLoad(data, filmContainer);
    })
}

loadFilms();

serverBtn.addEventListener('click', () => {
    loadFilms();
});

// searchInput.addEventListener('keydown', (e) => {
//     if (e.code = 'Enter') {
//         handleFetch();
//     }
// });


//Filters
//Поменять местами поиск и выбор фильтра!
const genreSelection = document.getElementById('genre');
console.dir(genreSelection)
const langSelection = document.getElementById('language');

const choseLang = (arr) => {
   return arr.filter(item => item?.show?.language === "Japanese");
}


const selectFilter = (select) => {
    select.addEventListener('change', () => {
        handleFetch()
            .then((data) => {
                return data.filter(item =>  item?.show?.language === select.value);
            })
            .then((data => {
                handleLoad(data, filmContainer);
            }))
    })
}

selectFilter(langSelection);
selectFilter(genreSelection);

//Favourite
const favouriteContainer = document.getElementById('favouriteContainer');
let selected = [];

filmContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('icon-circle-right')) {
        console.log(event.target.parentElement.getAttribute('data-id'));
        addToFavourite(event.target);
        spawnFavourite(); //Почему последний добавляется через итерацию?
    }
})

const addToFavourite = (elem) => {
    handleFetch()
    .then((data) => {
        data.forEach(item => {
            if ((+item?.show?.id || +item?.id) === +elem.parentElement.getAttribute('data-id')) {
                selected = [...selected, item];
                selected.forEach((item, i) => {
                    localStorage.setItem(`Item ${item.show?.id || item?.id}`, JSON.stringify(item));
                })
            }
        })
    })
}

const spawnFavourite = () => {
    let arr = [];
    for (let i = 0, length = localStorage.length; i < length; i++) {
        let item = localStorage.getItem(localStorage.key(i));
        arr = [...arr, JSON.parse(item)];
    }
    handleLoad(arr, favouriteContainer);
}

spawnFavourite();

// localStorage.clear();

//Modal
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');

filmContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('films__img')) {
        modal.classList.remove('hidden');
        modal.classList.add('visible');
    }
})

modalClose.addEventListener('click', () => {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
})



//Pagination
const pagination = document.getElementById('pagination');
const itemsPerPage = document.getElementById('itemsPerPage')

const createPaginationItems = (number) => {
    const item = createElement('li', 'pagination__item');
    item.innerText = number;
    pagination.append(item);
}

const foo = (arg) => {
    let itemsOnPage  = +itemsPerPage.value || 8;
    let pageNum = +arg.innerText || 1;
    let start = (pageNum - 1) * itemsOnPage;
    let end = start + itemsOnPage;

    handleFetch()
        .then((data) => {
            return data.slice(start, end);
    })
        .then((data) => {
            handleLoad(data, filmContainer);
        })
}

const renderPaginationItems = () => {
    clearContainer(pagination);
    handleFetch()
    .then((data => {
        // console.log(data.length)
        const paginationLength = Math.ceil(+data.length / +itemsPerPage.value);
        console.log(paginationLength)
        for(let i = 1; i <= paginationLength; i++) {
            createPaginationItems(i);
            foo(itemsPerPage.value);//разобраться, что передаем!!!
        }
    }))
}

itemsPerPage.addEventListener('change', renderPaginationItems)

// renderPaginationItems()

pagination.addEventListener('click', (event) => {
    const t = event.target;
    if (t && t.classList.contains('pagination__item')) {
        foo(t)
    }
})



