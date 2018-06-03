// morseSymbols

let clickBlock = document.querySelector('.click-block'),
    button = document.querySelector('.button'),
    morse = document.querySelector('.morse'),
    translate = document.querySelector('.translate');

let dot = `.`;
let dash = `-`;
let space = ` `;

let downDate;
let upDate;

let stringMorse = '';

let addFromString = (symbols) => {
  stringMorse += symbols;
  morse.textContent = stringMorse;
}

let getDelay = (down, up) => {
  let delay = up - down;

  if (delay  <= 200) {
    addFromString(dot);
  } else if (delay > 200 && delay <= 400) {
    addFromString(dash);
  } else {
    addFromString(space);
  }
}

clickBlock.addEventListener('mousedown', () => {
  downDate = new Date().getTime();
});

clickBlock.addEventListener('mouseup', () => {
  upDate = new Date().getTime();
  getDelay(downDate, upDate);
});

button.addEventListener('click', () => {
  let arrSymbols = [];

  stringMorse.split(' ').map(x => arrSymbols.push(morseSymbols[x]));
  translate.textContent = arrSymbols.join('');
});
