let data;

document.getElementById("button").addEventListener("click", function() {
      data = document.getElementById("inputValue").value;

  if (data.trim() === "") {
    data = null;
  }
  else if (!isNaN(Number(data))) {
    data = Number(data);
  }
  else if (data.toLowerCase() === "true"){
    data = true;
  }
  else if (data.toLowerCase() === "false"){
    data = false;
  }
  else {
    data = document.getElementById("inputValue").value;
  }
  if (data) {
  document.getElementById("output").innerText = `Your input ${inputValue.value} is truthy! its javascript data type is ${typeof(data)}`;
  }
  else {
  document.getElementById("output").innerText = `Your input ${inputValue.value} is falsy! its javascript data type is ${typeof(data)}`;
  }
});
