window.onload = function () {
   
    document.querySelector('body').style.opacity = 0;

    setTimeout(() => {
        document.querySelector('body').style.opacity = 1;
    });


    var body = document.querySelector('body'),
        tilesNumber = document.querySelector('#settings p span'),
        tilesInput = document.querySelector('#settings input'),
        startBtn = document.querySelector('#settings button[name=start]'),
        resetBtn = document.querySelector('#settings button[name=reset]'),
        playArea = document.querySelector('#play-area');


    tilesInput.addEventListener('input', () => {
        tilesNumber.innerHTML = tilesInput.value;
    });

    resetBtn.addEventListener('click', () => {
        startBtn.removeAttribute('disabled', '');
        tilesInput.removeAttribute('disabled', '');
        playArea.innerHTML = '';
    });

    startBtn.addEventListener('click', () => {
        startBtn.setAttribute('disabled', '');
        tilesInput.setAttribute('disabled', '');

        // Creating cards
        for (let i = 0; i < tilesInput.value; i++) {
            playArea.innerHTML += '<div class="tile"><img src="" /></div>';
        }

        // Push to `worldcards` all the numbers from 0 to `tilesInput / 2`
        var worldcards = [];

        for (let i = 0; i < tilesInput.value / 2; i++) {
            worldcards.push(i, i);
        }

        // Assign each number of `worldcards` to each card randomly

        var R_no = Math.floor(Math.random() * tilesInput.value);
        var R_card = document.querySelectorAll('.tile img')[R_no];

        for (let i = 0; i < tilesInput.value; i++) {
            do {

                if (R_card.getAttribute('src') == "") {
                    console.log(i, R_card.getAttribute('src'));
                    R_card.src = "./Images/" + worldcards.shift() + ".jpg";
                    R_card.style.opacity = 0;
                    console.log(i + " #### " + R_card.getAttribute('src'));
                }


                R_no = Math.floor(Math.random() * tilesInput.value);
                R_card = document.querySelectorAll('.tile img')[R_no];
                console.log(i + "while" + R_card.getAttribute('src'));

            } while (!(R_card.getAttribute('src') == "") && worldcards.length > 0)
        }

        startGame();
    });


    function startGame() {
        let tiles = document.querySelectorAll('.tile');
        let firstClickedTile;
        let secondClickedTile;

        // Add click event for every tile
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', matching);
        }

        function matching(e) {
            if (!firstClickedTile) {
                firstClickedTile = e.target.parentNode;
                firstClickedTile.firstChild.style.opacity = 1;
            } else if (e.target.parentNode !== firstClickedTile) {
                secondClickedTile = e.target.parentNode;
                secondClickedTile.firstChild.style.opacity = 1;

                if (firstClickedTile.firstChild.getAttribute('src') == secondClickedTile.firstChild.getAttribute('src')) {
                    firstClickedTile.classList.add('matched');
                    secondClickedTile.classList.add('matched');

                    firstClickedTile.removeEventListener('click', matching);
                    secondClickedTile.removeEventListener('click', matching);

                    tilesClickDelayAndWinCheck();
                } else {
                    setTimeout(() => {
                        firstClickedTile.firstChild.style.opacity = 0;
                        secondClickedTile.firstChild.style.opacity = 0;
                    }, 400);

                    tilesClickDelayAndWinCheck();
                }

                setTimeout(() => {
                    firstClickedTile = undefined;
                }, 400);
            }
        }

        // Removes click events on tiles to be able to see the second tile, then adds events back.
        function tilesClickDelayAndWinCheck() {
            let notMatchedTiles = 0;

            for (let i = 0; i < tiles.length; i++) {
                tiles[i].removeEventListener('click', matching);

                if (!tiles[i].classList.contains('matched')) {
                    notMatchedTiles++;
                }
            }

            if (notMatchedTiles === 0) {
                console.log('You won!');
                winMenu();
                return;
            }

            setTimeout(() => {
                for (let i = 0; i < tiles.length; i++) {
                    tiles[i].addEventListener('click', matching);
                }
            }, 400);
        }

        function winMenu() {
            body.innerHTML += '<div id="winScreen"></div>';
            document.querySelector('#winScreen').innerHTML = '<p>You won!</p>';

            setTimeout(() => {
                document.querySelector('#winScreen').style.background = 'rgba(0, 0, 0, .7)';
            }, 100);

            setTimeout(() => {
                body.removeChild(document.querySelector('#winScreen'));
            }, 2000);
        }

    }
}