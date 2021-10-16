import { getData } from './getData.js';
import { spawnFilms, clearContainer } from './cards.js';

export const favouriteInit = () => {
    let films = [];
    const favouriteContainer = document.getElementById('favouriteContainer');

    if (!localStorage.getItem('favoriteInStorage')) {
        localStorage.setItem('favoriteInStorage', JSON.stringify([]));
    };

    filmContainer.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('icon-circle-right')) {
            console.log(event.target.parentElement.getAttribute('data-id'));
            addToFavourite(event.target, JSON.parse(localStorage.getItem('favoriteInStorage')));
            spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
        }
    });

    const addToFavourite = async (elem) => {
        films = await getData();
        const storageFilms = localStorage.getItem('favoriteInStorage');
        const film = [ ...JSON.parse(storageFilms ?  storageFilms : JSON.stringify([]))];
        // const film = [ ...JSON.parse(storageFilms)]
        films.forEach(item => {
            const elemId = item?.id;
            if (elemId === +elem.parentElement.getAttribute('data-id')) {
                // console.log(film);
                const exist = film.find(item => +item?.id === elemId);
                console.log(+item?.id === elemId)
                //Асинхронность!
                if (!exist)  {
                    film.push(item.id);
                }
            }
        });
        localStorage.setItem('favoriteInStorage', JSON.stringify(film));
        spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
    };


    const spawnFavourite = async (array) => {
        // const favLocal = localStorage.getItem('favoriteInStorage')
        // const data = favLocal ? JSON.parse(favLocal) : [];
        const data = array;
        let arr = [];

        for (const id of data) {
            const film = await getData(id);
            arr = [...arr, film];
        }
        clearContainer(favouriteContainer);
        spawnFilms(arr, favouriteContainer);
    };

    spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
    localStorage.clear();

}