class GameObject {
    constructor(x, y, width, height , color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.xvelocity = 0;
        this.yvelocity = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function createTower(x, canvasHeight, BIRD_HEIGHT, TOWER_WIDTH, verticalgap, color = 'green') {
    let height = Math.random() * (canvasHeight - verticalgap);
    return {
        top: new GameObject(x, 0, TOWER_WIDTH, height, color),
        bottom: new GameObject(x, height + verticalgap, TOWER_WIDTH, canvasHeight - (height + verticalgap), color),
        verticalgap: verticalgap,
        passed: false
    };
}
function writeScore(ctx,score){
    ctx.fillStyle = 'black';
    ctx.font = '48px serif';
    ctx.fillText("Score: " + score, 10, 50);
}
function credits(ctx){
    ctx.fillStyle = 'black';
    ctx.font = '24px serif';
    ctx.fillText("github.com/samTime101", 10, 100);
    ctx.fillText("Created on August 29 2025", 10, 130);
}

async function main(){
    let canvas = document.querySelector('#gameCanvas');
    let ctx = canvas.getContext('2d');

    const GRAVITY = 9.8;
    const BIRD_WIDTH = 100;
    const BIRD_HEIGHT = 100;
    const TOWER_WIDTH = 100;
    const TOWER_SPACING = 300;
    let SCORE = 0;
    
    let BIRD = new GameObject(50, 50, BIRD_WIDTH, BIRD_HEIGHT, 'red');

    let towers = [];
    for (let i = 0; i < 5; i++) {
        let tower = createTower(canvas.width + i * (TOWER_WIDTH + TOWER_SPACING), canvas.height, BIRD_HEIGHT, TOWER_WIDTH, BIRD_HEIGHT * 3);
        towers.push(tower);
        lastX = tower.top.x + TOWER_WIDTH + TOWER_SPACING;
    }

    document.onkeydown = function(){
        BIRD.yvelocity = -40; 
    }



    function isColliding(r1, r2){
        return !(r2.x > r1.x + r1.width ||
                 r2.x + r2.width < r1.x ||
                 r2.y > r1.y + r1.height ||
                 r2.y + r2.height < r1.y);
    }

    for (let i = 0; i < 100000; i++){
        BIRD.yvelocity = BIRD.yvelocity + GRAVITY * 0.333333;
        BIRD.y = BIRD.y + BIRD.yvelocity * 0.333333;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        credits(ctx);
        writeScore(ctx,SCORE);

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
                Object.assign(tower, createTower(lastX + TOWER_WIDTH + TOWER_SPACING, canvas.height, BIRD_HEIGHT, TOWER_WIDTH, BIRD_HEIGHT * 3, 'yellow'));
            }

            if (isColliding(BIRD, tower.top) || isColliding(BIRD, tower.bottom) || BIRD.y < 0 || BIRD.y + BIRD_HEIGHT > canvas.height){
                alert('GAME OVER ' + SCORE);
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

main();
