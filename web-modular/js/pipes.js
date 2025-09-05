class Pipes {
    width = 75;
    vertical_gaps_between_pipes = 200; 
    top_height = 150;             
    bottom_height = 150;          

    constructor(ctx, window_width, window_height) {
        this.ctx = ctx;
        this.x = window_width;
        this.window_height = window_height;
        this.passed = false;
        this.off_screen = false;
        this.gap_start = this.top_height;
        this.gap_end = window_height - this.bottom_height;
    }

    draw() {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.x, 0, this.width, this.top_height);
        this.ctx.fillRect(this.x, this.window_height - this.bottom_height, this.width, this.bottom_height);
    }

    update() {
        this.x -= 2;
        if (this.x <= -this.width) this.off_screen = true;
    }
}

export { Pipes };