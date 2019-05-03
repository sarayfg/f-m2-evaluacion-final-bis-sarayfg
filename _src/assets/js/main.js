'use strict';

// Recoger elementos del html
const inputs = document.querySelectorAll ('.input-cards-number');
const btnEl = document.querySelector ('.btn-start');
const cardsList = document.querySelector ('.cards__container');
const backCardsList = document.querySelector ('.back-cards__container');
const backCardImg = `https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB`;
let cardNumber = '';
let url = '';
let img = '';

getSavedCards();
//BUCLE PARA INCLUIR UN LISTENER EN CADA INPUT
for (const inputEl of inputs) {
  inputEl.addEventListener ('input', handlerInputClick);
}

// FUNCION DEL CLICK DEL INPUT QUE RECOGE SU VALOR Y CREA LA URL
function handlerInputClick (event) {
  cardNumber = event.currentTarget.value;
  url = `https://raw.githubusercontent.com/Adalab/cards-data/master/${cardNumber}.json`;
  saveCardsNumber ();
}

btnEl.addEventListener ('click', handlerBtnClick);

// FUNCION HANDLER BUTTON QUE RECOGE EL FETCH
function handlerBtnClick () {
  cardsList.innerHTML = '';
  backCardsList.innerHTML = '';
  getCards ();
}

// FUNCION QUE HACE EL FETCH
function getCards () {
  fetch (url)
    .then (function (response) {
      return response.json ();
    })
    .then (function (data) {
      for (let i = 0; i < data.length; i++) {
        img = data[i].image;
        printCards (img);
        printBackCards ();
      }
    });
}

// cuando hago el fetch quiero hacer dos cosas :
// que se me pinten las tarjetas
// que se me pinten las imagenes por defecto

function printCards (imagen) {
  const newItem = document.createElement ('li');
  newItem.setAttribute ('class', 'pokemon-card');
  const newImage = document.createElement ('img');
  newImage.setAttribute ('class', 'pokemon-img');
  newImage.src = `${imagen}`;
  newItem.appendChild (newImage);
  cardsList.appendChild (newItem);
}

function printBackCards () {
  const newBackCard = document.createElement ('li');
  newBackCard.setAttribute ('class', 'back-card');
  const newImgBackCard = document.createElement ('img');
  newImgBackCard.src = backCardImg;
  newBackCard.appendChild (newImgBackCard);
  backCardsList.appendChild (newBackCard);
}

//local storage

function saveCardsNumber () {
  localStorage.setItem ('number', cardNumber);
}

function getSavedCards() {
  if (localStorage.number) {
    const savedCards = localStorage.getItem('number');
    console.log(savedCards);
    for (const input of inputs) {
        if(input.value === savedCards) {
            input.setAttribute('checked', 'checked');
        }
    }
}
}

//hacer funcion que al hacer click en la tarjeta, me quite la clase hidden de la imagen de pokemon y me la añada a la otra

//otre opcion seria : quitame este elemento de la lista y añademe este
