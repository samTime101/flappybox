async function main(){
    let canvas = document.querySelector('#gameCanvas')
    let ctx = canvas.getContext('2d')
    let y = 0
    let yVelocity = 0
    let a = 9.8

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
        await new Promise(r => setTimeout(r, 0.0333333*1000))
    }
}
main()