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
        towers.push({x:800 +i * TOWER_SPACING})
    }

    document.onkeydown = function() {
        yVelocity =  -50 
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
            ctx.rect(tower.x, 0, TOWER_WIDTH, TOWER_HEIGHT)
            ctx.fill()

            ctx.beginPath()
            ctx.rect(tower.x, 900 - TOWER_HEIGHT, TOWER_WIDTH, TOWER_HEIGHT)
            ctx.fill()

            tower.x -= 5
            if (tower.x + TOWER_WIDTH < 0) {
                tower.x = 1600
            }
        }

        await new Promise(r => setTimeout(r, 0.0333333*1000))
    }
}
main()