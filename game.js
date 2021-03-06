'use strict'

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        // Class player
        this.player;
        // Clas ball
        this.ball;
        // Class bloque
        this.bloque = [];


        // Game over
        this.isGameOver = false;
    }

    startLoop() {
        //console.log("ha llamado loop");

        // Crear Bola
        this.ball = new Ball(this.canvas, 200, 400, "white");
        this.player = new Player(this.canvas, 300, 550, 3);

        let imageBlocks = ['image1', 'image2', 'image3'];
        let rows = 10;
        let cols = 5;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.bloque.push(new Bloque2(
                    this.canvas,
                    75 + 105 * col,
                    50 + 25 * row,
                    imageBlocks[col % imageBlocks.length]
                ));
            }
        }


        const loop = () => {
            //console.log(this.ball.y);
            // Mirar las colisiones
            this.checkAllCollisions();
            // Ir actualizando Canvas
            this.updateCanvas();
            // Ir refrescando Canvas
            this.clearCanvas();
            // Llamar a drawCanvas
            this.drawCanvas();

            this.player.getLives();

            this.player.getScore();

            if (!this.isGameOver) {
                window.requestAnimationFrame(loop);
            }

        }
        window.requestAnimationFrame(loop);
    };


    updateCanvas() {
        this.ball.speed();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCanvas() {
        // dibujas en el juego
        this.ball.drawBall();
        this.player.drawPlayer();
        for (let block = 0; block < this.bloque.length; block++) {
            this.bloque[block].draw();
        }
    }

    gameOverCallBack(callback) {
        this.onGameOver = callback;
    }

    checkAllCollisions() {
        //this.player.checkScreen();
        this.ball.colisionBall();
        let blocksToRemove = [];
        this.bloque.forEach((bloque, index) => {
            let collision = bloque.checkCollision(this.ball);
            if (collision != 0) {
                // marcar para eliminar el bloque del array this.bloque
                //console.log(collision);
                blocksToRemove.push(index);
                // cambiar la direccion de la pelota en base al tipo de colision
                this.ball.changeDirection(collision);
            }
        });

        let blocksRemoved = 0;
        blocksToRemove.forEach((blockToRemove) => {
            this.bloque.splice(blockToRemove - blocksRemoved, 1);
            blocksRemoved++;

        });

        if (blocksRemoved === 1) {
            this.player.sumScore();
        }


        // si hay algun bloque marcado para eliminar, eliminarlos del this.bloque


        // COLISION CON BARRA PLAYER
        let collision2 = this.player.checkCollisionPlayer(this.ball);
        if (collision2 != 0) {
            this.ball.changeDirection(collision2);

        }
        // CONDICIONES PARA EL GAME OVER


        if (this.ball.isFalling) {
            this.player.loseLive();
            //console.log('Pierde vida');
            this.ball = new Ball(this.canvas, 300, 300, "white");
        }

        if (this.player.lives === 0 || this.bloque.length === 0) {
            this.isGameOver = true;
            this.onGameOver();

        }

    }
}