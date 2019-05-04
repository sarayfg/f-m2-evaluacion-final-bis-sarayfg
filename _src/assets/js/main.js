'use strict';

const inputs = document.querySelectorAll ('.input-cards-number');
const btnEl = document.querySelector ('.btn-start');
const cardsList = document.querySelector ('.cards__container');
const backCardImg = `https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB`;
let cardNumber = '';
let url = '';
let img = '';
let cardId ='';

getSavedCards ();

for (const inputEl of inputs) {
  inputEl.addEventListener ('input', handlerInputClick);
}

function handlerInputClick (event) {
  cardNumber = event.currentTarget.value;
  url = `https://raw.githubusercontent.com/Adalab/cards-data/master/${cardNumber}.json`;
  saveCardsNumber ();
}

btnEl.addEventListener ('click', handlerBtnClick);

function handlerBtnClick () {
  cardsList.innerHTML = '';
  getCards ();
}

function getCards(){
  fetch (url)
    .then (function(response) {
      return response.json ();
    })
    .then (function (data) {
      //console.log(data);
      for (let i = 0; i < data.length; i++) {
        img = data[i].image;
        cardId = data[i].pair;
        printCards (img);
        console.log(cardId);
      }
    });
}

function printCards (imagen) {
  const newItem = document.createElement ('li');
  newItem.classList.add ('pokemon-card');
  newItem.setAttribute('data-id', `${cardId}`);
  console.log('este es', newItem);
  const newImage = document.createElement ('img');
  newImage.classList.add ('hidden', 'pokemon-img');
  newImage.src = `${imagen}`;
  const newDefaultImage = document.createElement ('img');
  newDefaultImage.classList.add ('pokemon-card-default');
  newDefaultImage.src = backCardImg;
  newItem.appendChild (newImage);
  newItem.appendChild (newDefaultImage);
  cardsList.appendChild (newItem);
  newItem.addEventListener ('click', handlerItemClick);
}

function saveCardsNumber () {
  localStorage.setItem ('number', cardNumber);
}

function getSavedCards () {
  if (localStorage.number) {
    const savedCards = localStorage.getItem ('number');
    for (const input of inputs) {
      if (input.value === savedCards) {
        input.setAttribute ('checked', 'checked');
        url = `https://raw.githubusercontent.com/Adalab/cards-data/master/${savedCards}.json`;
      }
    }
  }
}

function handlerItemClick (event) {
  const element = event.currentTarget;
  element.firstElementChild.classList.toggle ('hidden');
  element.lastElementChild.classList.toggle ('hidden'); 

  //hacer un bucle por la lista, si alguno de ellos contiene pokemon img y su .pair es igual al del event.current.target....sino. se dan la vuelta(hid
  game(element);
}

function game(element) {
  const cards =document.querySelectorAll('.pokemon-card');
  console.log(cards);
  for (const card of cards) {
    if(card.lastElementChild.classList.contains('hidden') && element.dataset.id !== card.dataset.id){
      console.log('casi esta');
      startAgain(card);
    }
  }
}
function startAgain(card) {
  card.firstElementChild.classList.add('hidden');
  card.lastElementChild.classList.remove('hidden');
}

