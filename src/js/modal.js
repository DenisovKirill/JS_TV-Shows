//Modal
export const modalOperating = () => {
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
}
