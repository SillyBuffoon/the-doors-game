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
            
            var lostscreen = document.getElementById('losttitle')

            console.log(`Opened the door ${doorNumber} while the bad door is the ${randomnumber}nd one`);

            if (doorNumber === randomnumber) {
                var explosionsound = new Audio('media/explosion.mp3');
                console.log('You lost!');
                lostscreen.style.display='block';
                explosionsound.play()
                doorImage.src ="media/baddoor.png";
                for (v=0;v<doors.length;v++) {
                    if (doors[v] !== doorImage) {
                        doors[v].style.display='none';
                        setTimeout(function() {
                            lostscreen.style.display='none';
                            for (k=0;k<doors.length;k++) {
                                doors[k].style.display='inline-block';
                            }
                        }, 300);
                    }
                }
                if (currentscore > highscore) {
                  //  window.location.href="gameover.html";
                    highscore = currentscore;
                    
                    highscoreElement.textContent = highscore;
                }
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
