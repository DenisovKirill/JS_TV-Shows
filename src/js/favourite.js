import { getData } from './getData.js';
import { spawnFilms, clearContainer } from './cards.js';

export const favouriteInit = () => {
    const favouriteContainer = document.getElementById('favouriteContainer');

    if (!localStorage.getItem('favoriteInStorage')) {
        localStorage.setItem('favoriteInStorage', JSON.stringify([]));
    };

    filmContainer.addEventListener('click', ({ target }) => {
        if (target && target.classList.contains('icon-heart')) {
            const filmId = +target.parentElement.getAttribute('data-id');
            console.log(filmId);
            addToFavourite(target, filmId);
            spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
        }
    });

    const addToFavourite = async (elem, id) => {
        const film = await getData(id);
        const storageFilms = localStorage.getItem('favoriteInStorage');
        let fav = [...JSON.parse(storageFilms ?  storageFilms : JSON.stringify([]))];
        const elemId = film?.id;
            if (elemId === +elem.parentElement.getAttribute('data-id')) {
                const exist = fav.find(item => +item === elemId);
                if (!exist)  {
                    fav = [...fav, film.id]
                }
            }

        localStorage.setItem('favoriteInStorage', JSON.stringify(fav));
        spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
    };

    const spawnFavourite = async (data) => {
        let arr = [];

        for (const id of data) {
            const film = await getData(id);
            arr = [...arr, film];
        }
        clearContainer(favouriteContainer);
        spawnFilms(arr, favouriteContainer);
    };

    spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
    // localStorage.clear();
}