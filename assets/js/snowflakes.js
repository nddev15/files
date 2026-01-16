// Snowflakes Animation Module
const Snowflakes = (() => {
  const initSnowflakes = () => {
    const snowflakesContainer = document.querySelector('.snowflakes');
    if (!snowflakesContainer) return;

    function createSnowflake() {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = '❄';

      const size = Math.random() * 0.8 + 0.5;
      const duration = Math.random() * 8 + 6;
      const horizontalDrift = (Math.random() - 0.5) * 200;
      const startDelay = Math.random() * 2;
      const opacity = Math.random() * 0.4 + 0.3;

      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.opacity = opacity;
      snowflake.style.fontSize = (size * 20) + 'px';
      snowflake.style.setProperty('--tx', horizontalDrift + 'px');
      snowflake.style.animation = `snowfall ${duration}s linear ${startDelay}s forwards`;

      snowflakesContainer.appendChild(snowflake);

      const animationEndTime = (duration + startDelay) * 1000;
      setTimeout(() => {
        snowflake.remove();
      }, animationEndTime);
    }

    setInterval(createSnowflake, 300);

    for (let i = 0; i < 30; i++) {
      setTimeout(createSnowflake, Math.random() * 2000);
    }
  };

  return {
    init: initSnowflakes
  };
})();
