import { morseSymbols } from './morseSymbols';

let app = document.querySelector(`#app`);

// const renderTableSymbols = (symbols) => {
//   return `<table class="table">
//           ${Object.entries(symbols).map(([key, value], i) => {
//             // console.log(i)
//             return `<tr>
//                       <td>${key}</td>
//                       <td>${value}</td>
//                     </tr>`;
//             }
//           ).join('')}
//           </table>`;
// }

const renderTableSymbols = (symbols) => {
  return `<div class="symbols-list">
          ${Object.entries(symbols).map(([key, value], i) => {
            // console.log(i)
            return `<div class="symbol-item">
                      <div class="symbol">${value}</div>
                      <div class="code">${key}</div>
                    </div>`;
            }
          ).join('')}
          </div>`;
}

app.innerHTML = renderTableSymbols(morseSymbols);

// let renderToDom = (state) => {
//   app.innerHTML = renderSelectedScreen(state);
// }