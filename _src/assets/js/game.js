/* eslint-disable strict */

function game (element) {
  cards = document.querySelectorAll ('.pokemon-card');
  for (const card of cards) {
    if (
      card.lastElementChild.classList.contains ('hidden') &&
      element.dataset.id !== card.dataset.id
    ) {
      setTimeout (startAgain, 2000);
    }
  }
}
const startAgain = () => {
  for (const card of cards) {
    card.firstElementChild.classList.add ('hidden');
    card.lastElementChild.classList.remove ('hidden');
  }
};
