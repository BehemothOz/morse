import { morseSymbols } from './morseSymbols';

let app = document.querySelector(`#app`);

let renderHeading = () => {
  return `<h1 class="main-title">M<span>o</span>rse C<span>o</span>de</h1>`
};

let renderTableSymbols = (symbols) => {
  return `<div class="symbols-list">
          ${Object.entries(symbols).map(([key, value]) => {
            return `<div class="symbol-item">
                      <div class="symbol">${value.toUpperCase()}</div>
                      <div class="code">${key}</div>
                    </div>`;
            }
          ).join('')}
          </div>`;
};

let renderActionBlock = () => {
  return `<div class="action-code">
            <button class="button">Click</button>
            <div class="output">Output to result</div>
          </div>`;
}

app.innerHTML = `${renderHeading()} ${renderActionBlock()} ${renderTableSymbols(morseSymbols)}`;