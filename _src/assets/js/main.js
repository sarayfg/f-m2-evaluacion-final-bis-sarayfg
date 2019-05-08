'use strict';

const inputs = document.querySelectorAll ('.input-cards-number');
const btnEl = document.querySelector ('.btn-start');
const cardsList = document.querySelector ('.cards__container');
const backCardImg = `https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB`;
let cardNumber = '';
let url = '';
let img = '';
let cardId = '';
let cards = '';
let name= '';
let isFav= '';
const logButton= document.querySelector('.log-button');



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
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        name= data[i].name;
        isFav= data[i].fav;
        img = data[i].image;
        cardId = data[i].pair;
        printCards (img);
      }
    });
}

function printCards (imagen) {
  const newItem = document.createElement ('li');
  newItem.classList.add ('pokemon-card');
  newItem.setAttribute ('data-id', `${cardId}`);
  const newImage = document.createElement ('img');
  newImage.classList.add ('hidden', 'pokemon-img');
  newImage.src = `${imagen}`;
  const newDefaultImage = document.createElement ('img');
  newDefaultImage.classList.add ('pokemon-card-default');
  newDefaultImage.src = backCardImg;
  const newName= document.createElement('p');
  const newNameContent = document.createTextNode(`${name}`);
  newName.appendChild(newNameContent);
  newItem.appendChild (newImage);
  newItem.appendChild(newName);
  newItem.appendChild (newDefaultImage);
  cardsList.appendChild (newItem);
  pokemonFav();
  newItem.addEventListener ('click', handlerItemClick);
}
logButton.addEventListener('click', handlerLogButtonClick);

function handlerLogButtonClick() {
  const pokemonList = document.querySelectorAll('.pokemon-card');
  for ( const pokemonItem of pokemonList) {
    console.log(pokemonItem.querySelector('p').innerHTML);
  }
  
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
let cardGroup = [];
function handlerItemClick (event) {
  const element = event.currentTarget;
  element.firstElementChild.classList.toggle ('hidden');
  element.lastElementChild.classList.toggle ('hidden');
  cardGroup.push (element.dataset.id);
  checkCards (element);
}

function pokemonFav() {
  if(isFav === true) {
    console.log(name);
  }
}