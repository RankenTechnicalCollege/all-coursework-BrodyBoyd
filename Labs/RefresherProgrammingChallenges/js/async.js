document.getElementById("brewCoffeeButton").addEventListener("click", function() {
  document.getElementById("brewCoffeeOutput").innerText = "loading....";
  setTimeout(() => {
    document.getElementById("brewCoffeeOutput").innerText = "Coffee is Brewed!";
  }, 3000)
});

document.getElementById("makeToastButton").addEventListener("click", function() {
  document.getElementById("makeToastOutput").innerText = "loading....";
  setTimeout(() => {
    document.getElementById("makeToastOutput").innerText = "Toast is made!";
  }, 2000)
});

document.getElementById("pourJuiceButton").addEventListener("click", function() {
  document.getElementById("pourJuiceOutput").innerText = "loading....";
  setTimeout(() => {
    document.getElementById("pourJuiceOutput").innerText = "Juice is poured!";
  }, 1000)
});