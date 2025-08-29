async function main(){
    let canvas = document.querySelector('#gameCanvas')
    let ctx = canvas.getContext('2d')

    for (let i = 0; i < 100000; i++) {
        ctx.clearRect(0, 0, 1600, 900)
        ctx.beginPath()
        ctx.rect(10, i, 100, 100)
        ctx.fill()
        await new Promise(r => setTimeout(r, 0.0333333*1000))
    }
}
main()