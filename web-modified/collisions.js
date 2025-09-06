function canvas_bird_collision(canvas, bird){
    let [bx1,by1,bx2,by2] = get_bbox(bird.coordinates());
    let [cx1,cy1,cx2,cy2] = get_bbox(canvas.coordinates());

    if (by2 >= cy2 || by1 <= cy1) {
        return true;
    }
    return false;

}
function bird_upperpipe_collision(bird, upperpipe){
    let [bx1,by1,bx2,by2] = get_bbox(bird.coordinates());
    let [ux1,uy1,ux2,uy2] = get_bbox(upperpipe.coordinates());
    if(bx2 >= ux1 && bx1 <= ux2 && by1 <= uy2){
        return true;
    }
    return false;
}
function bird_lowerpipe_collision(bird, lowerpipe){
    let [bx1,by1,bx2,by2] = get_bbox(bird.coordinates());
    let [lx1,ly1,lx2,ly2] = get_bbox(lowerpipe.coordinates());
    if(bx2 >= lx1 && bx1 <= lx2 && by2 >= ly1){
        return true;
    }
    return false;
}
