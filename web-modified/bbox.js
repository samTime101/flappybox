// BOUNDING BOX CODE
// SAMIP REGMI
function get_bbox(coords){
    let x1 = coords["y"][0][0]
    let y1 = coords["y"][0][1]
    let x2 = coords["y"][1][0]
    let y2 = coords["y"][1][1]
    return [x1,y1,x2,y2]
}