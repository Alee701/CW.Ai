let count = 0;
let historyLogs = [];

const digitBoxes = document.querySelectorAll('.digit-box');
const evenOddDisplay = document.getElementById('evenOdd');

function updateCounter() {
  const countString = count.toString().padStart(6, '0'); // Pad with leading zeros
  for (let i = 0; i < digitBoxes.length; i++) {
    if (digitBoxes[i].textContent !== countString[i]) {
      digitBoxes[i].style.transform = `rotateX(90deg)`;
      setTimeout(() => {
        digitBoxes[i].textContent = countString[i];
        digitBoxes[i].style.transform = `rotateX(0deg)`;
      }, 300);
    }
  }
  const evenOddText = count % 2 === 0 ? 'Even' : 'Odd';
  evenOddDisplay.textContent = ` ${evenOddText}`;
  evenOddDisplay.style.color = count % 2 === 0 ? '#4CAF50' : '#ff7e5f';
}

function increment() {
  count++;
  updateCounter();
}

function reset() {
  count = 0;
  updateCounter();
}

function saveHistory() {
  const log = { count, type: count % 2 === 0 ? 'Even' : 'Odd' };
  historyLogs.push(log);
  updateHistoryTable();
}

function updateHistoryTable() {
  const historyBody = document.getElementById('historyBody');
  historyBody.innerHTML = '';
  historyLogs.forEach(log => {
    const row = document.createElement('tr');
    const countCell = document.createElement('td');
    const typeCell = document.createElement('td');
    countCell.textContent = log.count;
    typeCell.textContent = log.type;
    row.appendChild(countCell);
    row.appendChild(typeCell);
    historyBody.appendChild(row);
  });
}
