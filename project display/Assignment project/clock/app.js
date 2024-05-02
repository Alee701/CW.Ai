function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert to 12-hour format
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  document.getElementById('hour').textContent = hours;
  document.getElementById('minute').textContent = minutes;
  document.getElementById('second').textContent = seconds;
  document.getElementById('ampm').textContent = ampm;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = now.toLocaleDateString('en-US', options);
  document.getElementById('date').textContent = date;
}

setInterval(updateTime, 1000); // Update time every second
updateTime(); // Initial call to update time
