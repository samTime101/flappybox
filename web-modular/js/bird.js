class Bird{
    width = 20;
    height = 20
    constructor(ctx){
        this.ctx = ctx;
        this.x = 50
        this.y = 50
        this.y_vel = 0;
        this.flap = false;
        this.alive = true;
        // RANDOM COLOR RGB
        this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        this.decision = null;
    }
    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    ground_collision(ground_height){
        return this.y + this.height >= ground_height;
    }
    sky_collision(){
        return this.y <= 0;
    }
    pipe_collision(pipesArray){
        for(let pipe of pipesArray){
            let within_x = this.x + this.width > pipe.x && this.x < pipe.x + pipe.width;
            let within_y = this.y < pipe.gap_start || this.y + this.height > pipe.gap_end;
            if(within_x && within_y){
                return true;
            }
        }
        return false;
    }

    update(ground , pipesArray){
        if (this.ground_collision(ground) || this.sky_collision() || this.pipe_collision(pipesArray)) {
            this.alive = false;
            this.flap = false;
            this.y_vel = 0;
        } else {
            this.y_vel += 0.25;
            if (this.y_vel > 30) this.y_vel = 30;
            this.y += this.y_vel;
        }
    }
    flap_wings(){
        if (this.alive) {
            this.y_vel = -5;
        }
    }
    action(){
        // JUMP WHEN PRESSED SPACE
	if (this.decision === "JUMP"){
	    this.flap_wings();
        this.decision = null;
	}
	
    }
}

export {Bird};
