//after DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  var playerCount = 1;
  var guessCount = 4;
  var theHeight;
  var otherInfo;
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
    var playerTag = document.getElementById("player-info");
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
  }

  function choosePlayer(){
    var chosen = Math.floor((Math.random() * 188));
    theHeight = players[chosen].Height;
    otherInfo = players[chosen]["Player Name"] + " / " + 
                players[chosen].Nationality + " / " + 
                players[chosen].Position + " / " + 
                players[chosen]["Team Name"] + " / "; 
  }


});