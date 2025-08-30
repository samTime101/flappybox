import { initMenu } from './js/menu.js';
import { HUD } from './js/hud.js';
import { showPlayAgain } from './js/showplayagain.js';
import { GameObject, createTower } from './js/gameobject.js';
import { isColliding } from './js/iscolliding.js';
import { GRAVITY, BIRD_WIDTH, BIRD_HEIGHT, TOWER_WIDTH, TOWER_SPACING } from './js/constants.js';
import { colorpicker } from './js/colorpicker.js';

initMenu(main);



async function main(){
    let canvas = document.querySelector('#gameCanvas');
    let ctx = canvas.getContext('2d');
    let SCORE = 0;
    let gameover = false;

    // BACKGROUND MUSIC
    const BGMUSIC = new Audio('./audio/bgm.mp3');
    BGMUSIC.loop = true;
    BGMUSIC.volume = 0.2;
    BGMUSIC.play();
    
    // JUMP MUSIC
    const JUMPMUSIC = new Audio('./audio/bounce.mp3');
    JUMPMUSIC.volume = 0.2;

    let BIRD = new GameObject(50, 50, BIRD_WIDTH, BIRD_HEIGHT,null, './image/bird.png');
    let hud = new HUD(ctx);

    let towers = [];
    for (let i = 0; i < 5; i++) {
        let tower = createTower(canvas.width + i * (TOWER_WIDTH + TOWER_SPACING), canvas.height, BIRD_HEIGHT, TOWER_WIDTH, BIRD_HEIGHT * 3);
        towers.push(tower);
    }
    
    document.onkeydown = function(){
        if (gameover) return;
        JUMPMUSIC.currentTime = 0;
        JUMPMUSIC.play();
        BIRD.yvelocity = -40; 
    }

    for (let i = 0; i < 100000; i++){
        BIRD.yvelocity = BIRD.yvelocity + GRAVITY * 0.333333;
        BIRD.y = BIRD.y + BIRD.yvelocity * 0.333333;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hud.writeScore(SCORE);
        hud.credits();
        BIRD.draw(ctx);

        for (let tower of towers){
            tower.top.draw(ctx);
            tower.bottom.draw(ctx);

            tower.top.x -= 5;
            tower.bottom.x -= 5;

            if (tower.top.x + TOWER_WIDTH < 0){

                let lastX = 0
                for (let t of towers){
                    if (t.top.x + TOWER_WIDTH > lastX){
                        lastX = t.top.x + TOWER_WIDTH;
                    }
                }
                // RESET VAYE PAXI KO COLOR
                // OBJECT ASSIGN WILL CHANGE THE PROPERTIES OF THE EXISTING OBJECT AND NOT CREATE A NEW OBJECT
                Object.assign(tower, createTower(lastX + TOWER_WIDTH + TOWER_SPACING, canvas.height, BIRD_HEIGHT, TOWER_WIDTH, BIRD_HEIGHT * 3, colorpicker()));
            }

            if (isColliding(BIRD, tower.top) || isColliding(BIRD, tower.bottom) || BIRD.y < 0 || BIRD.y + BIRD_HEIGHT > canvas.height){
                // alert('GAME OVER ' + SCORE);
                gameover = true;
                BGMUSIC.pause();
                JUMPMUSIC.pause();
                showPlayAgain(canvas,SCORE, main);
                return;
            }
            if (!tower.passed && tower.top.x + TOWER_WIDTH < BIRD.x){
                SCORE += 1;
                tower.passed = true;
            }
        }

        await new Promise(r => setTimeout(r, 0.033333*1000));
    }
}

// main();
