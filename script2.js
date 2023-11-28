//Word and Hints Object
const options = {
    Paris: "City; The Effiel Tower",
    Himalayas: "Highest mountain range in the world",
    Mississippi: "American State; Birthplace of Elvis Presley",
    China: "Country; The Great Wall",
    England: "Country; London is it's capital",
    Wolverhampton: "City; Named after Wulfrun, a Merican noblewoman and landowner",
    Antarctic: "Uninhabited continent in the Southern Hemisphere and the site of the South Pole", 
    Salisbury: "City; Famous for Stonehenge", 
    Australia: "Country; Down Under", 
    Bethlehem: "Town; Biblical birthplace of Jesus",
    Gibraltar: "A British Overseas Territory on the south coast of Spain", 
    Mediterranean: "Sea; Between the continents of Europe and Africa",  
    Nevada: "The Silver State, Area 51",
    Kazakhstan: "Country; Former Soviet republic located in central Asia", 
    Jamaica: "Country; Birthplace of Bob Marley",
    Sahara: "The largest hot desert in the world",
    Peckham: "District in South-east London where Del Boy lives",
    Pamplona: "City; Running of the bulls", 
    Bermuda: "A British island territory in the North Atlantic",
    Mariana: "An oceanic trench located in the Western Pacific Ocean", 
    Southampton: "Port city; Where the Titanic started it's fatal maiden voyage from", 
    Houston: "City; Located in the Texan state and is nicknamed the Space City", 
    Keystone: "Resort town in the South Dakota state where Mount Rushmore is", 
    Chessington: "Part of Surrey, bordered by Greater London, which is known for having a popular theme park resort",
    Yellowstone: "A national park in the western United State where the Old Faithful geyser is located",
    Detroit: "The Motor City where fictional Robocop comes to life", 
    Manhattan: "One of boroughs of New York City which translate to 'the place where we get bows' from Lenape language",
    Guernsey: "The second largest island in the Channel Islands in the English Channel",
    Madagascar: "The world's fourth largest island near the southeastern coast of Africa",
    Indonesia: "Country; The world's largest archipelagic state",
  };
  
  //Initial References
  const message = document.getElementById("message");
  const hint = document.querySelector(".hints");
  const controls = document.querySelector(".controls-area");
  const startBtn = document.getElementById("start");
  const onScreenKeyboard = document.getElementById("on-screen-keyboard");
  const userInput = document.getElementById("user-input");
  const resultDisplay = document.getElementById("result");
  const word = document.getElementById("word");
  const words = Object.keys(options);
  let randomWord = "",
    randomHint = "";
  let winCount = 0,
    lossCount = 0;
  
  //Generate random location values
  const generateRandomlocation = (array) => Math.floor(Math.random() * array.length);
  
  //Block all the buttons
  const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
  };
  
  //Start the Game
  startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
  });
  
  //Stop the Game
  const stopGame = () => {
    controls.classList.remove("hide");
  };
  
  //Generate Location Function
  const generateLocation = () => {
    onScreenKeyboard.classList.remove("hide");
    userInput.innerText = "";
    randomWord = words[generateRandomlocation(words)];
    randomHint = options[randomWord];
    hint.innerHTML = `<div id="wordHint">
    <span>Hint: </span><br>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
      displayItem += '<span class="inputSpace">_ </span>';
    });
  
    //Display each element as span
    userInput.innerHTML = displayItem;
    userInput.innerHTML += `<div id='chancesCount'>Chances Left: ${lossCount}</div>`;
  };
  
  //Initial Game Function
  const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInput.innerHTML = "";
    onScreenKeyboard.classList.add("hide");
    onScreenKeyboard.innerHTML = "";
    generateLocation();
  
    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
  
      //Number to ASCII[A-Z]
      button.innerText = String.fromCharCode(i);
  
      //Character button onclick
      button.addEventListener("click", () => {
        message.innerText = `Correct Letter`;
        message.style.color = "#008000";
        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");
  
        //If array contains clicked value replace the matched Dash with Letter
        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            //If character in array is same as clicked button
            if (char === button.innerText) {
              button.classList.add("correct");
              //Replace dash with letter
              inputSpace[index].innerText = char;
              //increment counter
              winCount += 1;
              //If winCount equals word length
              if (winCount == charArray.length) {
                resultDisplay.innerHTML = "You Won";
                startBtn.innerText = "Restart";
                //block all buttons
                blocker();
              }
            }
          });
        } else {
          //lose count
          button.classList.add("incorrect");
          lossCount -= 1;
          document.getElementById("chancesCount").innerText = `Chances Left: ${lossCount}`;
          message.innerText = `Incorrect Letter`;
          message.style.color = "#ff0000";
          if (lossCount == 0) {
            word.innerHTML = `The word was: <span>${randomWord}</span>`;
            resultDisplay.innerHTML = "Game Over";
            blocker();
          }
        }
  
        //Disable clicked buttons
        button.disabled = true;
      });
  
      //Append generated buttons to the letters container
      onScreenKeyboard.appendChild(button);
    }
  };
  
  window.onload = () => {
    init();
  };