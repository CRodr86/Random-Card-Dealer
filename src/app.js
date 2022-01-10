import "bootstrap";
import "./style.css";

let cardElement = document.querySelector(".card");
const randomCard = document.querySelector("#random");
const anotherSuit = document.querySelector("#another");
const uniqueCard = document.querySelector("#unique");

const suits = ["diamondssuit", "heartssuit", "clubssuit", "spadessuit"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];
let deck = [];

function Card(value, suit, used) {
  (this.value = value), (this.suit = suit), (this.used = used);
}

//FUNCTIONS
// Generates a new array with 52 cards and suits by looping through both arrays
const newDeck = newArr => {
  suits.map(suit => {
    values.map(value => {
      newArr.push(new Card(value, suit, false));
    });
  });
  return newArr;
};
newDeck(deck);

// Generates a random element
const generateRandom = newArr => {
  let index = Math.floor(Math.random() * newArr.length);
  return newArr[index];
};

//Generates a non repeating random suit
const generateUniqueSuit = () => {
  //Array with filter suit that doesn't repeat.
  let differentSuit = deck.filter(
    elem => elem.suit !== cardElement.classList[1]
  );
  renderCard(generateRandom(differentSuit));
};

//Generate unique card from deck
const generateUniqueCard = () => {
  //Array is filtered and shows only the elements that not used
  let differentValue = deck.filter(elem => elem.used === false);
  if (differentValue.length !== 0) {
    renderCard(
      generateRandom(differentValue),
      //Switch the used value to true so it doesn't show no more.
      (generateRandom(differentValue).used = true)
    );
    //Restart deck
  } else newDeck(deck);
};

//Render card elements
const renderCard = elem => {
  cardElement.classList.remove(cardElement.classList[1]);
  cardElement.classList.add(elem.suit);
  cardElement.innerHTML = `<p>${elem.value}</p>`;
};

// Display
window.onload = renderCard(generateRandom(deck));
randomCard.addEventListener("click", () => renderCard(generateRandom(deck)));
anotherSuit.addEventListener("click", () => generateUniqueSuit());
uniqueCard.addEventListener("click", () => generateUniqueCard());
