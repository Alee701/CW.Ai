// script.js

document.addEventListener('DOMContentLoaded', () => {
  const modeToggle = document.getElementById('modeToggle');
  const lightBulb = document.getElementById('lightBulb');
  const body = document.body;

  modeToggle.addEventListener('change', () => {
      if (modeToggle.checked) {
          body.classList.add('dark-mode');
          body.classList.remove('light-mode');
          changeLightBulbImage('bulb on.png');
      } else {
          body.classList.add('light-mode');
          body.classList.remove('dark-mode');
          changeLightBulbImage('bulb off.png');
      }
  });

  const changeLightBulbImage = (src) => {
      lightBulb.classList.add('fade-out');
      setTimeout(() => {
          lightBulb.src = src;
          lightBulb.classList.remove('fade-out');
          lightBulb.classList.add('fade-in');
      }, 500); // Match the transition duration in CSS
  };

  // Set initial mode
  if (modeToggle.checked) {
      body.classList.add('dark-mode');
      changeLightBulbImage('bulb on.png');
  } else {
      body.classList.add('light-mode');
      changeLightBulbImage('bulb off.png');
  }
});
