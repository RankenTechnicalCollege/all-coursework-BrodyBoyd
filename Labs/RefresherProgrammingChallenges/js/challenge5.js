function VowelCount(enteredWord) { 
  let vowelCount = 0;
  let vowels = "aeiouAEIOU";
  for (const char of enteredWord) {
    if (vowels.includes(char)) {
      vowelCount++;
    }
  }
  return vowelCount;
}
document.getElementById("button").addEventListener("click", function() {
  let enteredWord = document.getElementById("wordForVowels").value;
  document.getElementById('vowelOutput').innerText = VowelCount(enteredWord);
});

//--------------------------------------

function Reverse(wordToReverse) {
  let reversedWord = "";
  for (char of wordToReverse) {
    reversedWord = char + reversedWord;
  }
  return reversedWord;
}
document.getElementById("reverseButton").addEventListener("click", function() {
  let wordToReverse = document.getElementById("stringToReverse").value;
  document.getElementById('reverseOutput').innerText = Reverse(wordToReverse);
});

//-------------------------------------

const Capatlize = function cap(wordsToCap) {
  let capitalizedWords = "";
  let wordsArray = wordsToCap.split(" ");
  for (let word of wordsArray) {
    if (word.length > 0) {
      capitalizedWords += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + " ";
    }
  }
  return capitalizedWords.trim();
}

document.getElementById("capButton").addEventListener("click", function() {
  let wordsToCap = document.getElementById("wordsToCap").value;
  document.getElementById('capOutput').innerText = Capatlize(wordsToCap);
});

//-------------------------------------

const count = wordsToCount => {
  let wordsArray = wordsToCount.split(" ");
  let wordCount = 0;
  for (let word of wordsArray) {
    if (word.length > 0) {
      wordCount++;
    }
  }
  return wordCount;
}
document.getElementById("countButton").addEventListener("click", function() {
  let wordsToCount = document.getElementById("wordsToCount").value;
  document.getElementById('countOutput').innerText = count(wordsToCount);
});

//-------------------------------------

const addWords = (word1, word2) => word1 + " " + word2;
document.getElementById("addButton").addEventListener("click", function() {
  let word1 = document.getElementById("word1").value;
  let word2 = document.getElementById("word2").value;
  document.getElementById('addOutput').innerText = addWords(word1, word2);
});