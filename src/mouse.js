"use strict;"

import { map, filter, scan, flatMap, delay, first, buffer } from 'rxjs/operators';
import { Observable, Subject, fromEvent, pipe, of, from, merge, interval } from 'rxjs';
import { morseSymbols } from './morseSymbols';

// let O = Rx.Observable;

let clickBlock = document.querySelector('.click-block'),
    button = document.querySelector('.button'),
    morse = document.querySelector('.morse'),
    translate = document.querySelector('.output');


// За единицу времени принимается длительность одной точки.
// Длительность тире равна трём точкам.
// Пауза между знаками в слове — 3 точки.
// Пауза между словами — 7 точек. (TODO)

let dot = `.`;
let dash = `-`;

let span = 200; // Единица времени

let dotSpan = span; // Длительность точки
let dashSpan = span * 3; // Длительность тире

let letterSpan = span * 3; // Пауза между буквами
let wordSpan = span * 7; // Пауза между словами


/*
  1. Задача: Создать последовательность двух событий (mousedown, mouseup)
*/


let mouseDown = fromEvent(button, `mousedown`);
let mouseUp = fromEvent(button, `mouseup`);


/*
  2. Задача: Время начала сигнала и конец сигнала (mouse == signal)
*/

let mouseStart = mouseDown.pipe(map(() => new Date().getTime()));
let mouseEnd = mouseUp.pipe(map(() => new Date().getTime()));


/*
  3. Задача: Найти временную разницу между началом и концом сигнала
*/

let mouseDelay = mouseStart.pipe(flatMap(timeStart => {
  return mouseEnd.pipe(
          map(timeEnd => timeEnd - timeStart),
          first()
        );
}));


/*
  4. Задача: Точка или тире?
*/

let dotOrDash = mouseDelay.pipe(
                  map(delay => delay >= dashSpan ? dash : dot)
);

/*
  5. Задача: Пуза

  5.1 Найти задержку между mouseEnd (когда кнопка мыши была отжата) и mouseStart (кнопка нажата)
  5.2 Отфильтровать для letterSpan
*/

let pauseDelay = mouseEnd.pipe(flatMap(end => {
  let timeout = of(letterSpan).pipe(delay(letterSpan))
  let starts = mouseStart.pipe(map(start => start - end));

  return merge(timeout, starts).pipe(first());
}));

let pauseForLetter = pauseDelay.pipe(
                        filter(delay => delay >= letterSpan),
                        map(() => letterSpan)
);


/*
  6. Задача: Собрать все символы до паузы
*/

let morseSymbols$ = dotOrDash.pipe(buffer(pauseForLetter));
morseSymbols$.subscribe(x => console.log(x));

/*
  7. Задача: Найти соответствие буквы и набранного кода в таблице
*/

let streamLetter$ = morseSymbols$.pipe(
                    map(x => x.join('')),
                    map(x => morseSymbols[x])
);


/*
  8. Задача: Выввести в DOM для проверки
*/

streamLetter$.subscribe(x => {
  translate.textContent += x;
});

