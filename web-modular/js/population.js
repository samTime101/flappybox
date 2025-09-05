import { Bird } from "./bird.js";

class Population {
    constructor(ctx, size) {
        this.ctx = ctx;
        this.size = size;
        this.birds = [];

        for (let i = 0; i < size; i++) {
            this.birds.push(new Bird(ctx));
        }
    }

    update_live_bird(ground, pipesArray) {
        for (let bird of this.birds) {
            if (bird.alive) {
                bird.action();
                bird.draw();
                bird.update(ground, pipesArray);
            }
            
        }
    }

    extinct() {
        for (let bird of this.birds) {
            if (bird.alive) {
                return false; 
            }
        }
        return true; 
    }
}

export { Population };
