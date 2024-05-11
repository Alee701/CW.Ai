const monthlyEntriesTable = document.getElementById('monthly-entries');
const totalSavingInput = document.getElementById('total-saving');

let monthlyData = {};

function addEntry() {
    const month = document.getElementById('month').value;
    const revenue = parseFloat(document.getElementById('revenue').value);
    const expense = parseFloat(document.getElementById('expense').value);
    const transactionType = revenue ? 'income' : (expense ? 'expense' : '');

    // Data Validation
    if (!month || (isNaN(revenue) && isNaN(expense))) {
        alert('Please fill in all fields with valid data.');
        return;
    }

    // Calculate saving
    let saving;
    if (transactionType === 'income') {
        saving = revenue;
    } else if (transactionType === 'expense') {
        saving = -expense;
    }

    // Check if the month already exists
    if (!monthlyData[month]) {
        monthlyData[month] = [];
    }

    // Add entry to monthly data
    monthlyData[month].push({ transactionType, revenue, expense, saving });

    // Clear input fields after adding entry
    document.getElementById('month').value = '';
    document.getElementById('revenue').value = '';
    document.getElementById('expense').value = '';

    // Render the monthly list and calculate total saving
    renderMonthlyList();
    calculateTotalSaving();
}

function renderMonthlyList() {
    const tbody = monthlyEntriesTable.querySelector('tbody');
    tbody.innerHTML = '';

    for (const month in monthlyData) {
        const entries = monthlyData[month];
        entries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.transactionType}</td>
                <td>${month}</td>
                <td>${entry.revenue}</td>
                <td>${entry.expense}</td>
                <td>${entry.saving}</td>
            `;
            tbody.appendChild(row);
        });
    }
}

function calculateTotalSaving() {
    let totalSaving = 0;
    for (const month in monthlyData) {
        const entries = monthlyData[month];
        entries.forEach(entry => {
            totalSaving += entry.saving;
        });
    }
    totalSavingInput.value = totalSaving.toFixed(2);

    // Console message based on total saving
    if (totalSaving > 0) {
        showMessage('Congratulations! You have saved: ' + totalSaving.toFixed(2) + ' PKR', 'success');
    } else if (totalSaving < 0) {
        showMessage('Warning! You are in debt: ' + totalSaving.toFixed(2) + ' PKR', 'warning');
    } else {
        showMessage('You have neither saved nor spent anything.', 'error');
    }
}

function exportToCSV() {
    const csvContent = "data:text/csv;charset=utf-8," +
        Object.keys(monthlyData).map(month =>
            monthlyData[month].map(entry =>
                `${entry.transactionType},${month},${entry.revenue},${entry.expense},${entry.saving}`
            ).join('\n')
        ).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "monthly_entries.csv");
    document.body.appendChild(link);

    link.click();
}

function showMessage(message, type) {
    const consoleDiv = document.getElementById('console-messages');
    const p = document.createElement('p');
    p.textContent = message;
    p.classList.add(type);
    consoleDiv.appendChild(p);

    // Remove previous messages after 3 seconds
    setTimeout(() => {
        consoleDiv.removeChild(p);
    }, 3000);
}
