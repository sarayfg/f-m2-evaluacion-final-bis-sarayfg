/* eslint-disable strict */

function checkCards (element) {
  cards = document.querySelectorAll ('.pokemon-card');
  for (const card of cards) {
    if (cardGroup.length === 2 && cardGroup[0] !== cardGroup[1]) {
      setTimeout (startAgain, 2000);
      cardGroup = [];
    } else if (cardGroup.length === 2 && cardGroup[0] === cardGroup[1]) {
      cardGroup = [];
    }
  }
}
const startAgain = () => {
  for (const card of cards) {
    card.firstElementChild.classList.add ('hidden');
    card.lastElementChild.classList.remove ('hidden');
  }
};
