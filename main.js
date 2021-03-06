'use strict'

// creamos la funcion main
const main = () => {



    const buildDom = (html) => {
        // document.querySelector para seleccionar main
        const main = document.querySelector('main');
        //  escribir dentro del main un documento HTML con main.innerHTML
        main.innerHTML = html;
        return main;
    };


    // Creamos SPLASH y escribimos el contenido en el main
    const buildSplashScreen = () => {
        const splashScreen = buildDom(`
   <section class="splash-screen">
   <div class="gameLogo">
   <img src="./images/arkanoid-png-9.png" alt=""></img>
   </div>
   <div class="bola"> </div>
   <button class="startGame">START GAME</button>
   <div class="instructions">
   <h1>game controls</h1>
    <p>arrow left</p>
    <p>arrow right</p>
   </div>
   <audio controls autoplay loop>
    <source src="./audio/BestMenuMusicever.mp3">
    </audio>
   </section>
   `);

        // Seleccionamos el TAG button con querySelector y añadimos evento addEventListener
        // para que al hacer click ejecute la funcion buildGamesScreen
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', buildGameScreen);
    };


    // Creamos GameScreen  y escribios contenido dentro del main
    const buildGameScreen = () => {
        const gameScreen = buildDom(`
     <section class="game-screen">
     <canvas></canvas>
     <div class="livesScore">
     <div id="lives"></div>
     <div id="score"></div>
     </div>
     <audio controls autoplay loop>
    <source src="./audio/AmstradCPC.mp3">
    </audio>
    </section>
    `);


        const width = document.querySelector('.game-screen').offsetWidth;
        const height = document.querySelector('.game-screen').offsetHeight;

        // Cuadrado canvas

        const canvasElement = document.querySelector('canvas');
        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);


        //setTimeout(buildGameOver, 3000);

        // New Game
        const game = new Game(canvasElement);
        game.gameOverCallBack(buildGameOver);


        game.startLoop();

        // movimiento del Bloque con teclas

        let rightPressed = false;
        let leftPressed = false;

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(event) {
            if (event.keyCode == 39) {
                game.player.rightPressed();
            } else if (event.keyCode == 37) {
                game.player.leftPressed();
            }
        }

        function keyUpHandler(event) {
            if (event.keyCode == 39) {
                game.player.cancelRightPressed();
            } else if (event.keyCode == 37) {
                game.player.cancelLeftPressed();
            }
        }

    };

    const buildGameOver = () => {
        const gameOverScreen = buildDom(`
       <section class="game-over">
         <div class="gameLogo">
         <img src="./images/arkanoid-png-9.png" alt=""></img>
         </div>
         <button class="startGame">restart</button>
         <div class="divGameOver"> <p class="textGameOver"> game over <p></div>
         </section>
     `);

        const restartButton = document.querySelector('button');
        restartButton.addEventListener('click', buildGameScreen);
    }

    buildSplashScreen();
};

// Al cargar el navegador se ejecuta  el juego en main ('load', main);
window.addEventListener('load', main);