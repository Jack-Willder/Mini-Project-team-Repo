  const ws = new WebSocket('ws://localhost:3000');
  ws.onmessage = (event) => {
    if (event.data === 'button_pressed') {
      document.getElementById('message').innerText = 'Button has been pressed!';
      document.getElementById('logo').style.display = "block";
    }
  };