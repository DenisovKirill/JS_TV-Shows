//Modal
import { getData } from './getData.js';

export const modalOperating = () => {
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');

    filmContainer.addEventListener('click', (event) => {
        const t = event.target
        if (t && t.classList.contains('films__img')) {
            modal.classList.remove('hidden');
            modal.classList.add('visible');
            const id = t.getAttribute('data-id');
            console.log(id)
            // setModal()
        }
    })

    modalClose.addEventListener('click', () => {
        modal.classList.remove('visible');
        modal.classList.add('hidden');
    })

    const setModal = (item) => {
        const modalTitle = document.createElement('h3', 'modal__title');
        modalTitle.innerHTML = item.name;
    }

}
