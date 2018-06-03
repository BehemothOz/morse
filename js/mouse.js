// morseSymbols

let clickBlock = document.querySelector('.click-block'),
    button = document.querySelector('.button'),
    morse = document.querySelector('.morse'),
    translate = document.querySelector('.translate');

let dot = `.`;
let dash = `-`;
let space = ' ';

let dotSpan = 200;
let dashSpan = 400;

let stringMorse = '';

let mouseDown = Rx.Observable.fromEvent(clickBlock, `mousedown`).map(() => new Date().getTime());
let mouseUp = Rx.Observable.fromEvent(clickBlock, `mouseup`).map(() => new Date().getTime());

let mouseDelay = Rx.Observable
                    .zip(mouseDown, mouseUp)
                    .map(arrayTime => arrayTime[1] - arrayTime[0]);
                    
let chooseSign = mouseDelay.map(delay => delay <= dotSpan ? dot : delay > dotSpan && delay <= dashSpan ? dash : space);

let accumulationSign = chooseSign.scan((acc, value) => acc + value, ``);

accumulationSign.subscribe((symbols) => {
  stringMorse = symbols;
  morse.textContent = symbols;
});

button.addEventListener('click', () => {
  let arrSymbols = [];

  stringMorse.split(' ').map(x => arrSymbols.push(morseSymbols[x]));
  translate.textContent = arrSymbols.join('');
})
