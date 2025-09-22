const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const ws = new WebSocket(`${protocol}://${window.location.host}/server`);

ws.onopen = () => {
  console.log('WebSocket connected');
};

ws.onmessage = (event) => {
  if (event.data === 'button_pressed') {
    const messageElement = document.getElementById('message');
    const logoElement = document.getElementById('logo');
    const faviconEl = document.getElementById('favicon');
    if (messageElement && logoElement) {
      messageElement.innerText = 'Button has been pressed!';
      logoElement.style.display = 'block';
      if (faviconEl) {
        faviconEl.setAttribute('type', 'image/png');
        faviconEl.setAttribute('href', '/IMG_2558.PNG');
      }
    } else {
      console.error('Element(s) not found: message or logo');
    }
  }
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = (event) => {
  console.log('WebSocket closed:', event);
};