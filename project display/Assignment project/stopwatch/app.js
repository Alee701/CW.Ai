let startTime;
  let interval;
  let running = false;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  function startStopwatch() {
    if (!running) {
      startTime = Date.now() - (hours * 3600000 + minutes * 60000 + seconds * 1000);
      interval = setInterval(updateStopwatch, 1000);
      running = true;
    }
  }

  function stopStopwatch() {
    if (running) {
      clearInterval(interval);
      running = false;
    }
  }

  function resetStopwatch() {
    clearInterval(interval);
    running = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateDisplay();
  }

  function updateStopwatch() {
    let currentTime = Date.now();
    let elapsedTime = currentTime - startTime;

    hours = Math.floor(elapsedTime / 3600000);
    minutes = Math.floor((elapsedTime % 3600000) / 60000);
    seconds = Math.floor((elapsedTime % 60000) / 1000);

    updateDisplay();
  }

  function updateDisplay() {
    document.getElementById("hours").innerText = formatTime(hours);
    document.getElementById("minutes").innerText = formatTime(minutes);
    document.getElementById("seconds").innerText = formatTime(seconds);
  }

  function formatTime(time) {
    return time < 10 ? "0" + time : time;
  }