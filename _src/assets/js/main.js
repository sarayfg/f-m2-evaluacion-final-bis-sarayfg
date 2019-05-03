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

//BUCLE PARA INCLUIR UN LISTENER EN CADA INPUT
for (const input of inputs) {
  input.addEventListener ('click', handlerInputClick);
}

// FUNCION DEL CLICK DEL INPUT QUE RECOGE SU VALOR Y CREA LA URL
function handlerInputClick (event) {
  cardNumber = event.currentTarget.value;
  url = `https://raw.githubusercontent.com/Adalab/cards-data/master/${cardNumber}.json`;
}

btnEl.addEventListener ('click', handlerBtnClick);

// FUNCION HANDLER BUTTON QUE RECOGE EL FETCH
function handlerBtnClick () {
  cardsList.innerHTML ='';
  backCardsList.innerHTML ='';
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
        printBackCards();
      }
    });
}

// cuando hago el fetch quiero hacer dos cosas :
// que se me pinten las tarjetas
// que se me pinten las imagenes por defecto

function printCards (imagen) {
  const newItem = document.createElement ('li');
  const newImage = document.createElement ('img');
  newImage.src = `${imagen}`;
  newItem.appendChild (newImage);
  cardsList.appendChild (newItem);
}

function printBackCards () {
  const newBackCard = document.createElement ('li');
  const newImgBackCard = document.createElement ('img');
  newImgBackCard.src = backCardImg;
  newBackCard.appendChild(newImgBackCard);
  backCardsList.appendChild(newBackCard);
}
