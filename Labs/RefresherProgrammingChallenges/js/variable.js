const PI = 3.14;

document.getElementById("button").addEventListener("click", function() {

  let userInput;

  userInput = document.getElementById("txtUserInput").value;

if (userInput.trim() === "") {
    userInput = "You didn't enter anything!";
  }
  else if (!isNaN(Number(userInput))) {
    userInput = Number(userInput);
  }
  
  document.getElementById("buttonClick").innerText = `You entered: ${userInput} \nIt's Javascriptdata type is ${typeof(userInput)}`;

  

});