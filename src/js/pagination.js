import { createElement, clearContainer } from './cards.js';
import { paginationCurrent, chooseFilmsParams, loadFilms} from './script.js';

export let paginationPage = 1;

export const initPagination = () => {
    const paginationList = document.getElementById('pagination');
    const paginationDrop = document.querySelector('.pagination__drop');
    const paginationHolder = document.querySelector('.pagination__holder')
    const paginationPrev = document.querySelector('.pagination__prev-btn');
    const paginationNext = document.querySelector('.pagination__next-btn');
    const paginationMaximum = document.querySelector('.pagination__maximum');
    const paginationItemsOnPage = 10;

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
        paginationHolder.classList.toggle('hidden');
    });

    renderPaginationItems();

    paginationPrev.addEventListener('click', ()=> {
        if (paginationPage > 1) {
            paginationPage -= 1;
            paginationCurrent.innerText = paginationPage;
            loadFilms(chooseFilmsParams);
        }
    });

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
    });

    paginationList.addEventListener('click', ({ target }) => {
        if (target && target.classList.contains('pagination__item')) {
            paginationPage = +target.innerText;
            paginationCurrent.innerText = paginationPage;
            loadFilms(chooseFilmsParams);
        }
    });
}