class HUD {
    constructor(ctx) {
        this.ctx = ctx;
    }

    writeScore(score) {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '48px serif';
        this.ctx.fillText("Score: " + score, 10, 50);
    }

    credits() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '24px serif';
        this.ctx.fillText("github.com/samTime101", 10, 100);
        this.ctx.fillText("Created on August 29 2025", 10, 130);
    }
}
export { HUD };