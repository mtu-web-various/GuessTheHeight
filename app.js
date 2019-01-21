//after DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  var playerCount = 1;
  var guessCount = 3;
  var theHeight;
  var otherInfo;
  var playerTag
  choosePlayer();

  //Start Button Toggling between screens and call startGame
  var start = document.getElementById('start');
  start.addEventListener('click', function() {
    toggleClasses(document.getElementById('start-screen'), 'hide', 'show');
    toggleClasses(document.getElementById('game-screen'), 'hide', 'show');
    startGame();
  });

  //Toggling Logic
  function toggleClasses(element) {
    for (var i = 1; i < arguments.length; i++) {
      element.classList.toggle(arguments[i]);
    }
  }

  //Showing the height list
  function startGame() {
    // show the player info 
    playerTag = document.getElementById("player-info");
    playerTag.innerText = otherInfo;

    // get random words and append them to the DOM
    var heightList = document.getElementById("height-list");
    var heights = [168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189,
                  190, 191, 192, 193, 194, 195, 196, 197, 198];
    heights.forEach(function(h) {
      var li = document.createElement("li");
      li.innerText = h;
      heightList.appendChild(li);
    });

    setGuessCount(guessCount);

    // add update listener for clicking on a word
    heightList.addEventListener('click', updateGame);
  }

  function updateGame(e) {
    if (e.target.tagName === "LI" && !e.target.classList.contains("disabled")){
      // grab guessed word, check it against password, update view
      var guess = e.target.innerText;
      var result = comparePlayers(guess);
      e.target.classList.add("disabled");
      if (result === 0){ e.target.innerText = e.target.innerText + " --> You get it right!"; }
      else if (result === 1){ e.target.innerText = e.target.innerText + " --> Lower!"; }
      else {e.target.innerText = e.target.innerText + " --> Higher!";}
      setGuessCount(guessCount - 1);  
      console.log(theHeight);

      // check whether the game is over
      if (result === 0) {
        toggleClasses(document.getElementById("winner"), 'hide', 'show');
        this.removeEventListener('click', updateGame);
      } else if (guessCount === 0) {
        toggleClasses(document.getElementById("loser"), 'hide', 'show');
        this.removeEventListener('click', updateGame);
        playerTag.innerText = otherInfo + theHeight + ":(";
      }
    }
  }

  //if true return 0, less -1, high 1
  function comparePlayers(guess){
    if (guess > theHeight){ return 1; }
    else if (guess < theHeight){ return -1; }
    else {return 0;}
  }

  function choosePlayer(){
    var chosen = Math.floor((Math.random() * 188));
    theHeight = players[chosen].Height;
    otherInfo = players[chosen]["Player Name"] + " / " + 
                players[chosen].Nationality + " / " + 
                players[chosen].Position + " / " + 
                players[chosen]["Team Name"] + " / "; 
  }

  function setGuessCount(newCount) {
    guessCount = newCount;
    document.getElementById("guesses-remaining").innerText = "Guesses remaining: " + guessCount + ".";
  }

});