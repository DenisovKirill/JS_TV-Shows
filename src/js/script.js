import { getData } from './getData.js';
import { tabsInit } from './tabs.js';
import { createElement, handleLoad, clearContainer } from './cards.js';
import { modalInit } from './modal.js';
import { favouriteInit } from './favourite.js';

export const searchInput = document.getElementById('inp');
export const tabsContent = document.querySelectorAll('.tabsContent');
const serverBtn = document.getElementById('serverButton');
const filmContainer = document.getElementById('filmContainer');
const paginationList = document.getElementById('pagination');
const genreSelection = document.getElementById('genre');
const langSelection = document.getElementById('language');
const itemsPerPage = document.getElementById('itemsPerPage');
const backToMain = document.querySelector('.search__return-btn');
const paginationBlock = document.querySelector('.pagination')
const filterHolder = document.querySelector('.filter__holder');
const paginationDrop = document.querySelector('.pagination__drop');
const paginationHolder = document.querySelector('.pagination__holder')
const paginationPrev = document.querySelector('.pagination__prev-btn');
const paginationNext = document.querySelector('.pagination__next-btn');
const paginationCurrent = document.querySelector('.pagination__current');
const paginationMaximum = document.querySelector('.pagination__maximum');

export let paginationPage = 1;
let paginationItemsOnPage = 10;
// let initialFilmsOnPage = 12;
let genre = genreSelection.value;
let language = langSelection.value;
let filmsOnPage = itemsPerPage.value;
let films = [];

tabsInit();
modalInit();
favouriteInit();

//Search and load

const chooseFilmsParams = {
    films: films,
    genre: genre,
    language: language,
    number: filmsOnPage
};

const chooseFilms = (args) => {
    const chosen = args.films.map((item) => (item.show ? item.show : item));

    if (args.genre === 'All' && args.language === 'All') {
        return chosen.slice(0, args.number);
    }

    if (args.genre !== 'All' && args.language !== 'All') {
        return chosen.filter((film) => film.genres.includes(args.genre) && film.language === args.language)
        .slice(0, args.number);
    }

    if (args.genre === 'All' && args.language !== 'All') {
        return chosen.filter((film) => film.language === args.language)
        .slice(0, args.number);
    }

    if (args.genre !== 'All' && args.language === 'All') {
        return chosen.filter((film) => film.genres.includes(args.genre))
        .slice(0, args.number);
    }
};

const loadFilms = async (args, attr) => {
    args.films = await getData(attr);
    const filtered = args.films.length ? chooseFilms(args) : [];
    if (filtered.length) {
        handleLoad(filtered, filmContainer);
    } else {
        clearContainer(filmContainer);
        const noFilmsMessage = createElement('div', 'no-films-msg');
        noFilmsMessage.innerText = 'No films were found'
        filmContainer.append(noFilmsMessage);
    }
};

//Filters

const changeOnSearch = () => {
    paginationBlock.style.display = 'none';
    // itemsPerPage.style.display = 'none';
    backToMain.style.display = 'block';
}

langSelection.addEventListener('change', () => {
    chooseFilmsParams.language = langSelection.value;
    loadFilms(chooseFilmsParams);
    changeOnSearch();
});

genreSelection.addEventListener('change', async () => {
    chooseFilmsParams.genre = genreSelection.value;
    loadFilms(chooseFilmsParams);
    changeOnSearch();
});

itemsPerPage.addEventListener('change', () => {
    chooseFilmsParams.number = itemsPerPage.value;
    loadFilms(chooseFilmsParams);
    // changeOnSearch();
});


const resetPage = () => {
    genreSelection.value = 'All';
    langSelection.value = 'All';
    chooseFilmsParams.genre = 'All';
    chooseFilmsParams.language = 'All';
    // filmsOnPage = itemsPerPage.value;
    // itemsPerPage.value = initialFilmsOnPage;
    // filmsOnPage = initialFilmsOnPage;
    // paginationPage = 1;
    paginationCurrent.innerText = paginationPage;
    searchInput.value = '';
    loadFilms(chooseFilmsParams);
};

window.onload = function() {
    resetPage();
  };

// loadFilms(chooseFilmsParams);

serverBtn.addEventListener('click', () => {
    loadFilms(chooseFilmsParams, searchInput.value);
    changeOnSearch();
    filterHolder.style.display = 'none';
});

backToMain.addEventListener('click', ()=> {
    resetPage();
    itemsPerPage.style.display = 'block';
    paginationBlock.style.display = 'block';
    filterHolder.style.display = 'flex';
    backToMain.style.display = 'none';
});

//Pagination

const createPaginationItems = (number) => {
    const item = createElement('li', 'pagination__item');
    item.innerText = number;
    paginationList.append(item);
};

const renderPaginationItems = () => {
    clearContainer(paginationList);
        for(let i = 1; i <= paginationItemsOnPage; i++) {
        createPaginationItems(i);
    }
};

paginationDrop.addEventListener('click', ()=> {
    paginationHolder.classList.toggle('hidden')
});

renderPaginationItems();

paginationPrev.addEventListener('click', ()=> {
    if (paginationPage > 1) {
        paginationPage -= 1;
        paginationCurrent.innerText = paginationPage;
        loadFilms(chooseFilmsParams);
    }
})

paginationNext.addEventListener('click', ()=> {
    if (paginationPage < paginationItemsOnPage) {
        paginationPage += 1;
        paginationCurrent.innerText = paginationPage;
        loadFilms(chooseFilmsParams);
    }
})

paginationMaximum.addEventListener('click', ()=> {
    paginationPage = paginationItemsOnPage;
    paginationCurrent.innerText = paginationPage;
    loadFilms(chooseFilmsParams);
})

paginationList.addEventListener('click', ({ target }) => {
    if (target && target.classList.contains('pagination__item')) {
        paginationPage = +target.innerText;
        paginationCurrent.innerText = paginationPage;
        loadFilms(chooseFilmsParams);
    }
});
