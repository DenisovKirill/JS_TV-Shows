import { getData } from './getData.js';
import { tabsInit } from './tabs.js';
import { createElement, handleLoad, clearContainer } from './create.js';
import { modalOperating } from './modal.js'
// import { handleLoad } from './create.js';

tabsInit();

//Search
export const searchInput = document.getElementById('inp');
const serverBtn = document.getElementById('serverButton');
const filmContainer = document.getElementById('filmContainer');

let films = [];

const loadFilms = async () => {
    films = await getData();
    handleLoad(films, filmContainer);
}

loadFilms();

serverBtn.addEventListener('click', () => {
    loadFilms();
});


//Filters
//Поменять местами поиск и выбор фильтра!
const genreSelection = document.getElementById('genre');
console.dir(genreSelection)
const langSelection = document.getElementById('language');

const selectFilter = (select) => {
    select.addEventListener('change', async () => {
        films = await getData();
        const filteredFilms = films.filter(item =>  item?.show?.language === select.value);
        handleLoad(filteredFilms, filmContainer);
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

const addToFavourite = async (elem) => {
    films = await getData();
    films.forEach(item => {
        if ((+item?.show?.id || +item?.id) === +elem.parentElement.getAttribute('data-id')) {
            selected = [...selected, item];
            selected.forEach((item, i) => {
                localStorage.setItem(`Item ${item.show?.id || item?.id}`, JSON.stringify(item));
            })
        }
    });
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

modalOperating();

//Pagination
//Правим баг с загрузкой запароса.
const pagination = document.getElementById('pagination');
const itemsPerPage = document.getElementById('itemsPerPage')

const createPaginationItems = (number) => {
    const item = createElement('li', 'pagination__item');
    item.innerText = number;
    pagination.append(item);
}

const foo = async (arg) => {
    let itemsOnPage  = +itemsPerPage.value || 8;
    let pageNum = +arg.innerText || 1;
    let start = (pageNum - 1) * itemsOnPage;
    let end = start + itemsOnPage;

    films = await getData();
    handleLoad(films.slice(start, end), filmContainer);
}

const renderPaginationItems = async () => {
    clearContainer(pagination);

    films = await getData();
    const paginationLength = Math.ceil(+films.length / +itemsPerPage.value);
        for(let i = 1; i <= paginationLength; i++) {
        createPaginationItems(i);
        foo(itemsPerPage.value);//разобраться, что передаем!!!
    }
}

renderPaginationItems();
itemsPerPage.addEventListener('change', renderPaginationItems);

//renderPaginationItems();

pagination.addEventListener('click', (event) => {
    const t = event.target;
    if (t && t.classList.contains('pagination__item')) {
        foo(t)
    }
})

