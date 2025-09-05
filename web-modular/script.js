import { initMenu } from './js/menu.js';
import { Pipes } from './js/pipes.js';
import {Population} from './js/population.js';

initMenu(main);



async function main() {
    const canvas = document.querySelector('#gameCanvas');
    const ctx = canvas.getContext('2d');

    let population = new Population(ctx ,1);

        document.onkeydown = (e) => {
            for (let bird of population.birds) {
                if (bird.alive) {
                    console.log("SPACE PRESSED");   
                    bird.decision = "JUMP";
                }
            }
    };

    const pipesArray = [];
    const horizontal_spacing = 200; 

    

    for (let i = 0; i < 5; i++) {
        pipesArray.push(new Pipes(ctx, canvas.width + i * horizontal_spacing, canvas.height));
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
	

        for (let pipe of pipesArray) {
            pipe.update();
            pipe.draw();
        }
	
        population.update_live_bird(canvas.height, pipesArray);

	    for (let i = pipesArray.length - 1; i >= 0; i--) {
            if (pipesArray[i].off_screen) {
                pipesArray.splice(i, 1); // REMOVE OFFSCREEN PIPE FROM ARRAY

                let x_of_rightmost_pipe;
                if (pipesArray.length > 0) {
                    let x_all_pipes = pipesArray.map(p => p.x);
                    x_of_rightmost_pipe = Math.max(...x_all_pipes);
                }else{
                    x_of_rightmost_pipe = canvas.width;
                }
                pipesArray.push(new Pipes(ctx, x_of_rightmost_pipe + horizontal_spacing, canvas.height));
            }
        }
        if (population.extinct()) {
            console.log("Game Over");
            return; 
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
