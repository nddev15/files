// Real-time Clock Module
const Clock = (() => {
  const initRealTimeClock = () => {
    const clockElement = document.getElementById('realTimeClock');
    if (!clockElement) return;

    function updateClock() {
      const now = new Date();
      const hcmTime = now.toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const isMobile = window.innerWidth <= 768;
      clockElement.textContent = isMobile ? hcmTime : hcmTime + ' ASIA/HCM CITY';
    }

    updateClock();
    setInterval(updateClock, 1000);
    window.addEventListener('resize', updateClock);
  };

  return {
    init: initRealTimeClock
  };
})();
