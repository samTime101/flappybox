async function main(){
    let canvas = document.querySelector('#gameCanvas')
    let ctx = canvas.getContext('2d')
    let y = 0
    let yVelocity = 0
    let a = 9.8

    const TOWER_WIDTH = 50
    const TOWER_HEIGHT = 200
    const TOWER_SPACING = 400  

    let towers = []
    for (let i = 0; i < 5; i++) {
        towers.push({x:800 +i * TOWER_SPACING,height: Math.random() * (900 - 2 * TOWER_HEIGHT)})
    }

    document.onkeydown = function() {
        yVelocity =  -50 
    }

    function isColliding(r1,r2) {
        return !(r2.x > r1.x + r1.width ||
                 r2.x + r2.width < r1.x ||
                 r2.y > r1.y + r1.height ||
                 r2.y + r2.height < r1.y);
    }

    for (let i = 0; i < 100000; i++) {
        yVelocity = yVelocity + a * 0.333333
        y = y + yVelocity * 0.333333
        ctx.clearRect(0, 0, 1600, 900)
        ctx.beginPath()
        ctx.rect(10, y, 100, 100)
        ctx.fill()

        for (let tower of towers) {
           ctx.beginPath()
            ctx.rect(tower.x, 0, TOWER_WIDTH, tower.height)
            ctx.fill()

            ctx.beginPath()
            ctx.rect(tower.x, 900 - TOWER_HEIGHT, TOWER_WIDTH, tower.height)
            ctx.fill()

            tower.x -= 5
            if (tower.x + TOWER_WIDTH < 0) {
                tower.x = 1600
            }

            let playerRect = {x:10, y:y, width:100, height:100}
            let topTowerRect = {x:tower.x, y:0, width:TOWER_WIDTH, height:tower.height}
            let bottomTowerRect = {x:tower.x, y:900 - TOWER_HEIGHT, width:TOWER_WIDTH, height:TOWER_HEIGHT} 
            if (isColliding(playerRect, topTowerRect) || isColliding(playerRect, bottomTowerRect)) {
                alert("Game Over!")
                return
            }


        }


        await new Promise(r => setTimeout(r, 0.0333333*1000))
    }
}
main()