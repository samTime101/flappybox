async function main(){
    let canvas = document.querySelector('#gameCanvas')
    let ctx = canvas.getContext('2d')
    let y = 0
    for (let i = 0; i < 100000; i++) {
        y += 1
        ctx.clearRect(0, 0, 1600, 900)
        ctx.beginPath()
        ctx.rect(10, i, 100, 100)
        ctx.fill()
        await new Promise(r => setTimeout(r, 0.0333333*1000))
    }
}
main()