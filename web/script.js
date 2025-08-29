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
        let verticalgap = BIRD_HEIGHT * 3;
        let height = Math.random() * (canvas.height - verticalgap);
        towers.push({
            top: new GameObject(800 + i * 400, 0, TOWER_WIDTH, height, 'green'),
            bottom: new GameObject(800 + i * 400, height + verticalgap, TOWER_WIDTH, canvas.height - (height + verticalgap), 'green'),
            verticalgap: verticalgap,
            horizontalgap: TOWER_SPACING,
            passed: false
        });
    }

    document.onkeydown = function(){
        BIRD.yvelocity = -50; 
    }

    function writeScore(score){
        ctx.fillStyle = 'black';
        ctx.font = '48px serif';
        ctx.fillText("Score: " + score, 10, 50);
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

        writeScore(SCORE);

        BIRD.draw(ctx);

        for (let tower of towers){
            tower.top.draw(ctx);
            tower.bottom.draw(ctx);

            tower.top.x -= 5;
            tower.bottom.x -= 5;

            if (tower.top.x + TOWER_WIDTH < 0){
                let verticalgap = BIRD_HEIGHT * 3;
                let height = Math.random() * (canvas.height - verticalgap);
                tower.top = new GameObject(canvas.width, 0, TOWER_WIDTH, height, 'green');
                tower.bottom = new GameObject(canvas.width, height + verticalgap, TOWER_WIDTH, canvas.height - (height + verticalgap), 'green');
                tower.verticalgap = verticalgap;
                tower.horizontalgap = TOWER_SPACING;
                tower.passed = false;
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
