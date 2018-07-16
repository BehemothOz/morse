import { morseSymbols } from './morseSymbols';

let app = document.querySelector(`#app`);

const renderTableSymbols = (symbols) => {
  return `<table class="table">
          ${Object.entries(symbols).map(([key, value]) => {
            return `<tr>
                      <td>${key}</td>
                      <td>${value}</td>
                    </tr>`;
            }
          ).join('')}
          </table>`;
}

app.innerHTML = renderTableSymbols(morseSymbols);

// let renderToDom = (state) => {
//   app.innerHTML = renderSelectedScreen(state);
// }