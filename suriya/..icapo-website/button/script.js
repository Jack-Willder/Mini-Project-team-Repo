const pressBtn = document.getElementById('pressBtn');
const screenText1 = document.getElementById('screen');
const screenText2 = document.getElementById('screen2');

if (pressBtn) {
  pressBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('https://icapoinaugrationxaviers.xyz/server/press', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('POST /press successful');
    } catch (error) {
      console.error('Fetch error:', error);
    }

    if (screenText1 && screenText2) {
      screenText1.classList.add('animate');
      screenText2.classList.add('animate');
    } else {
      console.error('Element(s) not found: screen or screen2');
    }
  });
} else {
  console.error('Element not found: pressBtn');
}