class NewCanvas{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
    }
    coordinates(){
        return{
            "x":[[this.x,this.y+this.height],[this.x+this.width,this.y]],
            "y":[[this.x,this.y],[this.x+this.width,this.y+this.height]]
        }
    }
}

class Bird{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.x = 100;
        this.y = 100;
        this.y_velocity = 0;
    }
    flap(){
        this.y_velocity = -10;
    }
    apply_gravity(){
        this.y_velocity += 1
        this.y += this.y_velocity
    }
    coordinates(){
        return{
            "x":[[this.x,this.y+this.height],[this.x+this.width,this.y]],
            "y":[[this.x,this.y],[this.x+this.width,this.y+this.height]]
        }
    }
}
class UpperPipe{
    constructor(width,height,x,y){
        this.width = width;
        this.height = height;
        // IF X AND Y ARE NOT PROVIDED, SET THEM TO 0
        this.x = x !== undefined ? x : 0;
        this.y = y !== undefined ? y : 0;
    }
    move_left(){
        this.x -= 5
    }
    coordinates(){
        return{
            "x":[[this.x,this.y+this.height],[this.x+this.width,this.y]],
            "y":[[this.x,this.y],[this.x+this.width,this.y+this.height]]
        }
    }
}
class LowerPipe{
    constructor(width,height,x,y){
        this.width = width;
        this.height = height;
        this.x = x !== undefined ? x : 0;
        this.y = y !== undefined ? y : 0;
    }
    move_left(){
        this.x -= 5
    }
    coordinates(){
        return{
            "x":[[this.x,this.y+this.height],[this.x+this.width,this.y]],
            "y":[[this.x,this.y],[this.x+this.width,this.y+this.height]]
        }
    }
}