let i = 0;
setInterval(() => {
  document.getElementById('count')!.innerText = String(i++);
}, 1000);
