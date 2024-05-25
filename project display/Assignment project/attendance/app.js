// app.js
const users = [
    { name: 'John Doe', fatherName: 'Richard Doe', age: 16, rollNo: '101', class: '10th Grade' },
    { name: 'Jane Smith', fatherName: 'Robert Smith', age: 15, rollNo: '102', class: '9th Grade' },
    { name: 'Michael Johnson', fatherName: 'James Johnson', age: 17, rollNo: '103', class: '11th Grade' },
    { name: 'Emily Davis', fatherName: 'William Davis', age: 14, rollNo: '104', class: '8th Grade' },
    { name: 'Jessica Brown', fatherName: 'Charles Brown', age: 16, rollNo: '105', class: '10th Grade' },
    { name: 'Daniel Wilson', fatherName: 'Thomas Wilson', age: 15, rollNo: '106', class: '9th Grade' },
    { name: 'Sarah Taylor', fatherName: 'Andrew Taylor', age: 17, rollNo: '107', class: '11th Grade' },
    { name: 'David Lee', fatherName: 'George Lee', age: 14, rollNo: '108', class: '8th Grade' },
    { name: 'Laura Martin', fatherName: 'Paul Martin', age: 16, rollNo: '109', class: '10th Grade' },
    { name: 'Kevin White', fatherName: 'Mark White', age: 15, rollNo: '110', class: '9th Grade' },
    { name: 'Anna Harris', fatherName: 'Steven Harris', age: 17, rollNo: '111', class: '11th Grade' },
    { name: 'Brian Clark', fatherName: 'Edward Clark', age: 14, rollNo: '112', class: '8th Grade' },
    { name: 'Sophia Lewis', fatherName: 'Henry Lewis', age: 16, rollNo: '113', class: '10th Grade' },
    { name: 'Christopher Walker', fatherName: 'Frank Walker', age: 15, rollNo: '114', class: '9th Grade' },
    { name: 'Grace Hall', fatherName: 'Peter Hall', age: 17, rollNo: '115', class: '11th Grade' },
    { name: 'Justin Allen', fatherName: 'Patrick Allen', age: 14, rollNo: '116', class: '8th Grade' },
    { name: 'Olivia Young', fatherName: 'Bruce Young', age: 16, rollNo: '117', class: '10th Grade' },
    { name: 'Nathan Hernandez', fatherName: 'Larry Hernandez', age: 15, rollNo: '118', class: '9th Grade' },
    { name: 'Mia King', fatherName: 'Joe King', age: 17, rollNo: '119', class: '11th Grade' },
    { name: 'Ethan Wright', fatherName: 'Stanley Wright', age: 14, rollNo: '120', class: '8th Grade' },
    { name: 'Ava Lopez', fatherName: 'Timothy Lopez', age: 16, rollNo: '121', class: '10th Grade' },
    { name: 'Jacob Scott', fatherName: 'Chris Scott', age: 15, rollNo: '122', class: '9th Grade' },
    { name: 'Samantha Green', fatherName: 'Shawn Green', age: 17, rollNo: '123', class: '11th Grade' },
    { name: 'Andrew Adams', fatherName: 'Jason Adams', age: 14, rollNo: '124', class: '8th Grade' },
    { name: 'Ella Baker', fatherName: 'Ryan Baker', age: 16, rollNo: '125', class: '10th Grade' },
  ];
  
  let attendanceData = {};
  let currentDate = new Date().toISOString().split('T')[0];
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('attendance-date').value = currentDate;
    document.getElementById('attendance-date').addEventListener('change', handleDateChange);
    document.getElementById('export-weekly').addEventListener('click', () => exportCSV('weekly'));
    document.getElementById('export-monthly').addEventListener('click', () => exportCSV('monthly'));
    document.getElementById('previous-day').addEventListener('click', () => navigateDate(-1));
    document.getElementById('next-day').addEventListener('click', () => navigateDate(1));
    document.getElementById('save-and-next-day').addEventListener('click', saveAndNextDay);
  
    renderTable();
    updateTotals();
    updateDisplayedDate();
  });
  
  function handleDateChange(event) {
    currentDate = event.target.value;
    renderTable();
    updateDisplayedDate();
  }
  
  function navigateDate(days) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + days);
    currentDate = date.toISOString().split('T')[0];
    document.getElementById('attendance-date').value = currentDate;
    renderTable();
    updateDisplayedDate();
  }
  
  function saveAndNextDay() {
    navigateDate(1);
  }
  
  function updateDisplayedDate() {
    document.getElementById('displayed-date').innerText = currentDate;
  }
  
  function renderTable() {
    const tbody = document.getElementById('attendance-table-body');
    tbody.innerHTML = '';
    users.forEach((user, index) => {
      const tr = document.createElement('tr');
  
      tr.innerHTML = `
        <td>${user.rollNo}</td>
        <td>${user.name}</td>
        <td>${user.fatherName}</td>
        <td>${user.class}</td>
        <td>
          <button class="attendance-btn" onclick="setAttendance(${index}, 'present', this)">Present</button>
          <button class="attendance-btn" onclick="setAttendance(${index}, 'absent', this)">Absent</button>
          <button class="attendance-btn" onclick="setAttendance(${index}, 'leave', this)">Leave</button>
        </td>
      `;
  
      const attendance = attendanceData[currentDate] && attendanceData[currentDate][user.rollNo];
      if (attendance) {
        const btn = tr.querySelector('.attendance-btn');
        btn.classList.add(attendance);
      }
  
      tbody.appendChild(tr);
    });
  
    document.getElementById('total-students').innerText = `Total Students: ${users.length}`;
  }
  
  function setAttendance(userIndex, status, button) {
    const user = users[userIndex];
    if (!attendanceData[currentDate]) {
      attendanceData[currentDate] = {};
    }
    attendanceData[currentDate][user.rollNo] = status;
  
    const buttons = button.parentNode.querySelectorAll('.attendance-btn');
    buttons.forEach(btn => {
      btn.classList.remove('present', 'absent', 'leave');
    });
    button.classList.add(status);
  
    updateTotals();
  }
  
  function updateTotals() {
    const totals = { present: 0, absent: 0, leave: 0 };
  
    if (attendanceData[currentDate]) {
      Object.values(attendanceData[currentDate]).forEach(status => {
        totals[status]++;
      });
    }
  
    document.getElementById('total-present').innerText = `Present: ${totals.present}`;
    document.getElementById('total-absent').innerText = `Absent: ${totals.absent}`;
    document.getElementById('total-leave').innerText = `Leave: ${totals.leave}`;
  }
  
  function exportCSV(period) {
    const csvData = [
      ['Roll No', 'Name', 'Father\'s Name', 'Class']
    ];
  
    const startDate = new Date(currentDate);
    if (period === 'weekly') {
      startDate.setDate(startDate.getDate() - startDate.getDay());
    } else if (period === 'monthly') {
      startDate.setDate(1);
    }
  
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (period === 'weekly' ? 6 : new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate() - 1));
  
    const dateRange = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dateRange.push(new Date(d).toISOString().split('T')[0]);
    }
  
    csvData[0].push(...dateRange);
  
    users.forEach(user => {
      const row = [
        user.rollNo,
        user.name,
        user.fatherName,
        user.class
      ];
  
      dateRange.forEach(date => {
        row.push(attendanceData[date] && attendanceData[date][user.rollNo] ? attendanceData[date][user.rollNo] : '');
      });
  
      csvData.push(row);
    });
  
    const csvContent = csvData.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${period}-attendance-${currentDate}.csv`;
    link.click();
  }
  