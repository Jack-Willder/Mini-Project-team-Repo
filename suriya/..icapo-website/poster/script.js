const ws = new WebSocket('wss://icapoinaugrationxaviers.xyz/server');

ws.onopen = () => {
  console.log('WebSocket connected');
};

ws.onmessage = (event) => {
  if (event.data === 'button_pressed') {
    const messageElement = document.getElementById('message');
    const logoElement = document.getElementById('logo');
    if (messageElement && logoElement) {
      messageElement.innerText = 'Button has been pressed!';
      logoElement.style.display = 'block';
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