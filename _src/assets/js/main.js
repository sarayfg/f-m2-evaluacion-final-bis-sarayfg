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
// let newItem = '';
// let newImage ='';
let listItems =[];


getSavedCards ();
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
function getCards(){
  fetch(url)
    .then (function(response) {
      return response.json();
    })
    .then(function(data){
      for (let i = 0; i < data.length; i++) {
        img = data[i].image;
        printCards (img);
        //printBackCards ();
      }
    });
}

// cuando hago el fetch quiero hacer dos cosas :
// que se me pinten las tarjetas
// que se me pinten las imagenes por defecto

function printCards (imagen) {
  const newItem = document.createElement ('li');
  newItem.setAttribute ('class', 'pokemon-card-default');
  const newImage = document.createElement ('img');
  newImage.setAttribute ('class', 'hidden');
  newImage.src = `${imagen}`;
  newItem.appendChild (newImage);
  cardsList.appendChild (newItem);
  newItem.addEventListener('click', handlerItemClick);
}


// function printBackCards () {
//   const newBackCard = document.createElement ('li');
//   newBackCard.setAttribute ('class', 'back-card');
//   const newImgBackCard = document.createElement ('img');
//   newImgBackCard.src = backCardImg;
//   newImgBackCard.setAttribute('class', 'default-img')
//   newBackCard.appendChild (newImgBackCard);
//   backCardsList.appendChild (newBackCard); 
//   console.log(backCardsList);

//   newBackCard.addEventListener('click', handlerItemClick);
// }

//local storage

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



function handlerItemClick(event){
    const element = event.currentTarget;
    element.classList.remove('pokemon-card-default');
    element.classList.add('pokemon-card');
    element.firstElementChild.classList.remove('hidden');
    element.firstElementChild.classList.add('pokemon-img');




//   event.currentTarget.classList.toggle('pokemon-card-default');
//   event.currentTarget.firstElementChild.classList.toggle('hidden');
    }
