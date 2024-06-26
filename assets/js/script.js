//java
const randomBtn = document.querySelector(`#randomizeBtn`);
const battleBtn = document.querySelector(`#battleBtn`);
const pastBtn = document.querySelector(`#pastBtn`);
const nameValue = document.querySelector(`#searchName`);
const breedValue = document.querySelector(`#searchBreed`);
let dogsArray = [];
let cpuDogFact = [];
let yourDogFact = [];
let rd;
let ld;
let winner = [];
let winnersFact = [];
let whoWon = [];

console.log("hi")

function fetchImage(dogName) {
  console.log(dogName);
}

console.log(fetchImage);

function fetchDog() {
  fetch("https://dogapi.dog/api/v2/breeds")
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((breed) => {
        const name = breed.attributes.name;
        const dogHypo = breed.attributes.hypoallergenic;
        //Here we are pulling attributes for max and min weight
        const weightmax = breed.attributes.male_weight.max;
        const weightmin = breed.attributes.male_weight.min;
        const dogWeight = weightmax - weightmin;

        const lifespanmax = breed.attributes.life.max;
        const lifespanmin = breed.attributes.life.min;
        const dogLife = lifespanmax / lifespanmin;

        const fact = breed.attributes.description;

        let dog = {
          name: name,
          dogHypo: dogHypo,
          dogLife: dogLife,
          dogWeight: dogWeight,
          fact: fact,
        };

        dogsArray.push(dog);

        //  console.log(`Your dog is a: ${name}, He has a weight of: ${dogWeight}, A Lifespan of: ${dogLife}, and ${dogHypo} a Hypoallergy.`);
        // console.log(` `);
      });
    });
}
function rollDice() {
    // Generate a random number between 1 and 6
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // Display the result in the console
    console.log("You rolled a " + diceRoll);
    return diceRoll;

}

function leftDogImage() {
  fetch(`https://dog.ceo/api/breed/${ld.name.toLowerCase()}/images/random`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Image api data left dog", data);
        const ldimageUrl = data.message;
        // Get the img element by id and set the src attribute to the image URL
        document.getElementById('leftDogImage').src = ldimageUrl;
      })
      .catch((error) => console.error('Error fetching left dog image:', error));
    }

function rightDogImage() {
  fetch(`https://dog.ceo/api/breed/${rd.name.toLowerCase()}/images/random`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Image api data right dog", data);
      const rdimageUrl = data.message;
      // Get the img element by id and set the src attribute to the image URL
      document.getElementById('rightDogImage').src = rdimageUrl;
    })
    .catch((error) => console.error('Error fetching right dog image:', error));
    }

//Call the function to roll the dice
// rollDice();

let myDog;

function convertDogNameRD() {
  if (rd.name === "Caucasian Shepherd Dog") {
    rd.name = "ovcharka/caucasian";
  }
  if (rd.name === "Bouvier des Flandres") {
    rd.name = "Bouvier";
  }
  if (rd.name === "Grand Basset Griffon Vendéen") {
    rd.name = "hound/basset";
  }
  if (rd.name === "Hokkaido") {
    rd.name = "Akita";
  }
  if (rd.name === "Japanese Terrier") {
    rd.name = "spitz/japanese";
  }
  if (rd.name === "Hanoverian Scenthound") {
    rd.name = "Coonhound";
  }
  if (rd.name === "Tibetan Spaniel") {
    rd.name = "terrier/tibetan";
  }
  if (rd.name === "Border Collie") {
    rd.name = "collie/border";
  }
  if (rd.name === "Curly-Coated Retriever") {
    rd.name = "retriever/curly";
  }
  if (rd.name === "Skye Terrier") {
    rd.name = "terrier/scottish";
  }
  rightDogImage();
}
fetch("https://dogapi.dog/api/v2/breeds")
  .then((response) => response.json())
  .then((data) => {
    data.data.forEach((breed) => {
      console.log(breed);
      const name = breed.attributes.name;
      const weightmax = breed.attributes.male_weight.max;
      const weightmin = breed.attributes.male_weight.min;
      const lifespanmax = breed.attributes.life.max;
      const lifespanmin = breed.attributes.life.min;

      console.log(
        `Name: ${name}, Weight: ${weightmax}, Lifespan: ${lifespanmax},`
      );
    });
  });

//.catch(error => console.error('Error fetching data:', error));

function rollDice() {
  // Generate a randometween 1 and 6
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  // Display the result in the console
  console.log("You rolled a " + diceRoll);
}


function convertDogNameLD() {
  if (ld.name === "Caucasian Shepherd Dog") {
    ld.name = "ovcharka/caucasian";
  }
  if (ld.name === "Bouvier des Flandres") {
    ld.name = "Bouvier";
  }
  if (ld.name === "Grand Basset Griffon Vendéen") {
    ld.name = "hound/basset";
  }
  if (ld.name === "Hokkaido") {
    ld.name = "Akita";
  }
  if (ld.name === "Japanese Terrier") {
    ld.name = "spitz/japanese";
  }
  if (ld.name === "Hanoverian Scenthound") {
    ld.name = "Coonhound";
  }
  if (ld.name === "Tibetan Spaniel") {
    ld.name = "terrier/tibetan";
  }
  if (ld.name === "Border Collie") {
    ld.name = "collie/border";
  }
  if (ld.name === "Curly-Coated Retriever") {
    ld.name = "retriever/curly";
  }
  if (ld.name === "Skye Terrier") {
    ld.name = "terrier/scottish";
  }

  leftDogImage();
}

//Creating cards for left and right side of screen, user and cpu.
randomBtn.addEventListener(`click`, function (event) {
  event.preventDefault();
  createCard();
  // console.log(dogsArray);
});
function fetchRandomDoggo() {
  fetch("https://dogapi.dog/api/v2/breeds")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data && data.data.length > 0) {
        // Selecting a random object from the array
        const randomIndex = Math.floor(Math.random() * data.data.length);
        // console.log(data.data.length)
        const randomObject = data.data[randomIndex];

        console.log(randomIndex);

        console.log(randomObject);

        console.log(`Display data ${randomIndex}`);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) =>
      console.error("Error fetching or processing data:", error)
    );
}
// Call the function to fetch and log a random dog
fetchRandomDoggo();

//For popup at end of battle.
function createCard() {
  rd = dogsArray[Math.floor(Math.random() * dogsArray.length)];
  console.log(rd);
  let rdn = rd.name;
  console.log(rdn);
  let rdw = rd.dogWeight;
  console.log(rdw);
  let rdh = rd.dogHypo;
  console.log(rdh);
  let rdl = rd.dogLife;
  console.log(rdl);

  cpuDogFact.push(rd.fact);
  console.log(cpuDogFact);

  ld = dogsArray[Math.floor(Math.random() * dogsArray.length)];
  console.log(ld);
  let ldn = ld.name;
  console.log(ldn);
  let ldw = ld.dogWeight;
  console.log(ldw);
  let ldh = ld.dogHypo;
  console.log(ldh);
  let ldl = ld.dogLife;
  console.log(ldl);

  fetchImage(ldn);

  myDog = {
    ldn: ld.name,
    ldw: ld.dogWeight,
    ldh: ld.dogHypo,
    ldl: ld.dogLife,
  };

  cpuDog = {
    rdn: rd.name,
    rdw: rd.dogWeight,
    rdh: rd.dogHypo,
    rdl: rd.dogLife,
  };

  yourDogFact.push(ld.fact);
  console.log(yourDogFact);
  //Appending it to screen in code below.
  let rightDog = document.getElementById(`rightDog`);
  console.log(rightDog);

  rightDog.children[0].textContent = rdn;
  //Tie in photo here.

  let leftDog = document.getElementById(`leftDog`);
  console.log(leftDog);

  leftDog.children[0].textContent = ldn;
  //Tie in photo here.
  convertDogNameRD();
  convertDogNameLD();
}

let rightDogUniversalscore;
let leftDogUniversalscore;

let ldFinalScore;

//total power tally for left dog / player dog
function totallifeLD() {
  const diceRoll = rollDice();
  console.log(rollDice());
  console.log("THIS IS MY DICE ROLL", diceRoll);

  if (myDog.ldh == true) {
    console.log("ITS TRUE");
    ldFinalScore = diceRoll + myDog.ldw + myDog.ldl + 1;
  } else {
    console.log("ITS FalSE");
    ldFinalScore = diceRoll + myDog.ldw + myDog.ldl;
  }
  console.log("My dog final score is:", ldFinalScore);
}

let rdFinalScore;
function totallifeRD() {
  const diceRoll = rollDice();

  console.log("THIS IS MY COMPUTERS DICE ROLL", diceRoll);

  if (cpuDog.rdh == true) {
    console.log("ITS TRUE");
    rdFinalScore = diceRoll + cpuDog.rdw + cpuDog.rdl + 1;
    rightDogUniversalscore = rdFinalScore;
  } else {
    console.log("ITS FalSE");
    rdFinalScore = diceRoll + cpuDog.rdw + cpuDog.rdl;
    rightDogUniversalscore = rdFinalScore;
  }
  console.log("CPU dog final score is:", rdFinalScore);

  //             console.log(`these are our competing final scores, My dog:, ${ldFinalScore} CPU Dog: ${rightDogUniversalscore}`)
}

function modal() {
  var modal = document.createElement('div');
  var modalContent = document.createElement('div');
  var closeBtn = document.createElement('span');
  var ff = document.createElement(`p`)
  var ww = document.createElement(`p`);
  var cardContent = document.createElement('p');
  // Assign classes and styles to the elements
  modal.className = 'modal';
  modalContent.className = 'modal-content';
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '&times;'; // × symbol for close button
  if (winnersFact.length > 0) {
    cardContent.textContent = winnersFact[winnersFact.length - 1]; // Display the last fact
  } else {
    cardContent.textContent = "No winner's fact available."; // Default message if no facts
  } 

  if (whoWon.length > 0) {
    ww.textContent = whoWon[whoWon.length - 1]; // Display the last fact
  } else {
    ww.textContent = "No winner available."; // Default message if no facts
  } 
  ff.textContent = `A fun fact about the winner is.`


   // Append elements to build the modal structure
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(ww);
  modalContent.appendChild(ff);
  modalContent.appendChild(cardContent);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  // Close modal when close button is clicked
  closeBtn.onclick = function () {
    modal.style.display = 'none';
    winnersFact.length = 0;
    //console.log(winnersFact);
  }
  // Close modal when user clicks outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
      winnersFact.length = 0;
      //console.log(winnersFact);
    }
  }
  // Display the modal
  modal.style.display = 'block';
};


function winLoss() {
      if (ldFinalScore >= rdFinalScore) {
        winner.push(ldFinalScore);
        //console.log(yourDogFact);
        let youWin = (`YOU WIN!`);
        whoWon.push(youWin);
        console.log("YOU WIN!");
        winnersFact = winnersFact.concat(yourDogFact);
        modal();
    
      } else {
        winner.push(rdFinalScore);
        let cpuWin = (`YOU LOSE!`);
        whoWon.push(cpuWin);
        console.log("YOU LOSE!");
        //console.log(cpuDogFact);
        winnersFact = winnersFact.concat(cpuDogFact);
        modal();
      }
    };

battleBtn.addEventListener("click", finalBattle);

function finalBattle() {
  totallifeLD();
  totallifeRD();

  //console.log(
  //  `these are our competing final scores, My dog:, ${ldFinalScore} CPU Dog: ${rightDogUniversalscore}`
  //);
  winLoss();
}

function rollDice() {
  // Generate a random number between 1 and 6
  const diceRoll = Math.floor(Math.random() * 6) + 1;

  // Display the result in the console
  console.log("You rolled a " + diceRoll);
  return diceRoll;
}

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
const adjectives = [
  "realistic",
  "plain",
  "wise",
  "lethal",
  "roasted",
  "vacuous",
  "gaudy",
  "flaky",
  "frightened",
  "goofy",
  "eminent",
  "highfalutin",
  "pushy",
  "laughable",
  "tearful",
  "expensive",
  "fair",
  "second-hand",
  "general",
  "superb",
];
const nouns = [
  "emotion",
  "union",
  "girlfriend",
  "world",
  "complaint",
  "dad",
  "delivery",
  "flight",
  "people",
  "piano",
  "weakness",
  "pie",
  "philosophy",
  "permission",
  "importance",
  "sample",
  "presence",
  "operation",
  "problem",
  "student",
];
function getRandomWords() {
  const randomAdjective = getRandomElement(adjectives);
  const randomNoun = getRandomElement(nouns);
  return `${randomAdjective} ${randomNoun}`;
}
function displayRandomWords(elementId) {
  const randomWords = getRandomWords();
  document.getElementById(elementId).textContent = randomWords;
}

fetchDog();

console.log(whoWon);