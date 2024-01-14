document.addEventListener('DOMContentLoaded', function () {

    var currentscore = 0;
    var highscore = 0;

    var doors = document.querySelectorAll('.door');

    var currentscoreElement = document.getElementById('currentscore');
    var highscoreElement = document.getElementById('highscore');
    
    /* sounds */

    var opensound = new Audio('media/dooropen.mp3');

    opensound.preload = 'auto';

    for (var i = 0; i < doors.length; i++) {
        doors[i].addEventListener('click', function () {
            
            var randomnumber = getRandomInt(3);
            var doorNumber = parseInt(this.getAttribute('data-door-number'), 10);
            var doorImage = this

            console.log(`Opened the door ${doorNumber} while the bad door is the ${randomnumber}nd one`);

            if (doorNumber === randomnumber) {
                var explosionsound = new Audio('media/explosion.mp3');
                console.log('You lost!');
                explosionsound.play()
                if (currentscore > highscore) {
                  //  window.location.href="gameover.html";
                    highscore = currentscore;
                    
                    highscoreElement.textContent = highscore;
                }
                doorImage.src ="media/baddoor.png";
                currentscore = 0
                currentscoreElement.textContent = currentscore;
            } else {
                currentscore++
                opensound.play()
                console.log(`You opened the right door! \n Current Score: ${currentscore}`);
                currentscoreElement.textContent = currentscore;

                doorImage.src ="media/gooddoor.png";
            }
            setTimeout(function() {
                for (i=0;i<doors.length;i++) {
                    doors[i].src = 'media/doorplaceholder.png'
                }
                console.log("This code will be executed after 3 seconds.");
            }, 500);
        });
    }
});



function getRandomInt(max) {
    var numbert = Math.floor(Math.random() * max) + 1;
    if (numbert === 0) {
       return getRandomInt(max)
    }
    return numbert
  }