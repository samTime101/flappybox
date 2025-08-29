class GameObject {
    constructor(x, y, width, height , color=null , imgsrc=null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.xvelocity = 0;
        this.yvelocity = 0;
        if (imgsrc) {
            this.image = new Image();
            this.image.src = imgsrc;
    }
    else{
        this.image = null;
    }}
    draw(ctx) {
        if (this.image) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
function createTower(x, canvasHeight, BIRD_HEIGHT, TOWER_WIDTH, verticalgap, color = 'blue') {
    let height = Math.random() * (canvasHeight - verticalgap);
    return {
        top: new GameObject(x, 0, TOWER_WIDTH, height, color),
        bottom: new GameObject(x, height + verticalgap, TOWER_WIDTH, canvasHeight - (height + verticalgap), color),
        verticalgap: verticalgap,
        passed: false
    };
}

export { GameObject, createTower };