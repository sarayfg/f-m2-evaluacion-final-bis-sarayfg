'use strict';

// Recoger elementos del html
const inputs = document.querySelectorAll ('.input-cards-number');
const btnEl = document.querySelector ('.btn-start');
const cardsList = document.querySelector ('.cards__container');
const backCardImg = `https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB`;
let cardNumber = '';
let url = '';
let img = '';

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

function getCards () {
  fetch (url)
    .then (function (response) {
      return response.json ();
    })
    .then (function (data) {
      for (let i = 0; i < data.length; i++) {
        img = data[i].image;
        printCards (img);
        //printBackCards ();
      }
    });
}

function printCards (imagen) {
  const newItem = document.createElement ('li');
  newItem.classList.add ('pokemon-card');
  const newImage = document.createElement ('img');
  newImage.classList.add ('hidden', 'pokemon-img');
  newImage.src = `${imagen}`;
  const newDefaultImage = document.createElement('img');
  newDefaultImage.classList.add('pokemon-card-default');
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
    element.firstElementChild.classList.toggle('hidden');
    element.lastElementChild.classList.toggle('hidden');
}
