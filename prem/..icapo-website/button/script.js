  document.getElementById('pressBtn').onclick = () => {
    fetch('http://localhost:3000/press', { method: 'POST' });
  };

  document.getElementById("pressBtn").addEventListener("click", function () {
    const screenText = document.getElementById("screen");
    screenText.classList.add("animate");
  });

function goGet() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    document.getElementById("screen").innerHTML = this.responseText;
  };
  xhttp.open("GET", "https://api.raykooyenga.com/ip");
  xhttp.send();
}
