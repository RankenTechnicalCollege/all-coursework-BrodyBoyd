const usernames = ["ApeLincoln", "TheNotoriousP.I.G", "Brieonce"];

let searchedUsername = "";

document.getElementById("button").addEventListener("click", function() {
  searchedUsername = document.getElementById("inputValue").value;

  for(let i = 0; i < usernames.length; i++){
    if (usernames[i].toLowerCase() === searchedUsername.toLowerCase()){
      document.getElementById("output").innerText = `User ${searchedUsername} found!`
      break;
    }
    else {
      document.getElementById("output").innerText = `User ${searchedUsername} not found!`;
    }

  }
});