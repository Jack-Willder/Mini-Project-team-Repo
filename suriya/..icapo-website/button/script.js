  document.getElementById('pressBtn').onclick = () => {
    fetch('http://localhost:3000/press', { method: 'POST' });
  };

  document.getElementById("pressBtn").addEventListener("click", function () {
    const screenText1 = document.getElementById("screen");
    const screenText2 = document.getElementById("screen2");
    screenText1.classList.add("animate");
    screenText2.classList.add("animate");
  });