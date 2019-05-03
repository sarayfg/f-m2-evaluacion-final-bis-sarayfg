'use strict';

// Recoger elementos del html
const inputs = document.querySelectorAll('.input-cards-number');
const btnEl = document.querySelector('.btn-start');
let cardNumber = '';
let url ='';

//BUCLE PARA INCLUIR UN LISTENER EN CADA INPUT
for (const input of inputs) {
  input.addEventListener('click', handlerInputClick);
}

// FUNCION DEL CLICK DEL INPUT QUE RECOGE SU VALOR Y CREA LA URL
function handlerInputClick(event) {
  console.log('el input funciona');
  cardNumber = event.currentTarget.value;
  url =`https://raw.githubusercontent.com/Adalab/cards-data/master/${cardNumber}.json`;
}

btnEl.addEventListener('click', handlerBtnClick);

// FUNCION HANDLER BUTTON QUE RECOGE EL FETCH
function handlerBtnClick () {
  getCards();
}

// FUNCION QUE HACE EL FETCH
function getCards() {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) { 
      console.log(data);
    });
}




