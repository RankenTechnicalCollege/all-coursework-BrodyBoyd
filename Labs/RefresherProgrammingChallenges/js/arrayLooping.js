const arr = ['cat', 'dog', 'fish', 'bird'];

//while loop
let i = 0;
while (i < arr.length) {
  document.getElementById("output").innerText += arr[i] + "\n";
  i++;
};

//do while loop
i = 0;
do {
  document.getElementById("output").innerText += arr[i] + "\n";
  i++;
} while (i < arr.length);

//for loop
for (let j = 0; j < arr.length; j++) {
  document.getElementById("output").innerText += arr[j] + "\n";
}

//for in loop (loops through properties of an object)
const person = {firstName: 'John', lastName: 'Doe', age: 30};
for (const property in person) {
  document.getElementById("output").innerText += `${property}: ${person[property]} \n`;
}

//for of loop (loops through values of an iterable object)
for (const item of arr) {
  document.getElementById("output").innerText += item + "\n";
}

//array forEach method
arr.forEach(item => {
  document.getElementById("output").innerText += item + "\n";
});