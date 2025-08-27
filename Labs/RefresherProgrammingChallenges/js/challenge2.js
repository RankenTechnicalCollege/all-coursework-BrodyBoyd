const SECRET = true;
document.getElementById("button").addEventListener("click", function() {

  let userInput;

  userInput = document.getElementById("txtUserInput").value;

if (userInput.trim() === "") {
    userInput = "Please enter a guess!";
  }
  else if (!isNaN(Number(userInput))) {
    userInput = Number(userInput);
  }
  else if (userInput.toLowerCase() === "true"){
    userInput = true;
  }
  else if (userInput.toLowerCase() === "false"){
    userInput = false;
  }
  
  
  if (userInput === SECRET){
    userInput = `You got it! The secret value is ${SECRET}! \nIt's Javascript data type is ${typeof(userInput)}`;
    document.getElementById("output").innerText = userInput;

  }else{
    document.getElementById("output").innerText = `You entered: ${userInput} \nThis is the incorrect answer. Try again! \nIt's Javascript data type is ${typeof(userInput)}`;
  }
});