const word = document.getElementById("word");
const wrongletters = document.getElementById("wrong-letters");
const finalmessage = document.getElementById("final-message");
const playbutton = document.getElementById("play-button");
const notifcation = document.getElementById("notifcation-container");
const popup = document.getElementById("popup-container");
const figureparts = document.querySelectorAll(".figure-part");

const words = ["mango", "strawberry", "guava", "watermelon"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetter = [];

// function - Show hidden word
function displayHiddenWord() {
  word.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter"> ${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
    )
    .join("")}`;

  // remove new line character
  const innerWord = word.innerText.replace(/\n/g, "");
  if (innerWord == selectedWord) {
    finalmessage.innerText = "Congratulations! You won 😊";
    popup.style.display = "flex";
  }
}
// letter key press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      // check if this letter is already present in correct letter array
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        console.log(correctLetters);
        displayHiddenWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetter.includes(letter)) {
        wrongLetter.push(letter);
        updateWrongLetter();
      } else {
        showNotification();
      }
    }
  }
});
// function - updateWrongLetter();
function updateWrongLetter() {
  // Display wrong letters
  wrongletters.innerHTML = `
  ${wrongLetter.length > 0 ? `<p>Wrong</p>` : ""}
  ${wrongLetter.map((letter) => `<span>${letter}</span>`)}
  `;
  // Display parts
  figureparts.forEach((part, ind) => {
    const errors = wrongLetter.length;
    if (ind < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  // Check if lost
  if (wrongLetter.length === figureparts.length) {
    finalmessage.innerText = "Ohh noo! You Lost 👎";
    popup.style.display = "flex";
  }
}
// function - show notification
function showNotification() {
  notifcation.classList.add("show");
  setTimeout(() => {
    notifcation.classList.remove("show");
  }, 3000);
}
// Restart - play again
playbutton.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetter.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayHiddenWord();
  updateWrongLetter();
  popup.style.display = "none";
});
displayHiddenWord();
