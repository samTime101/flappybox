function colorpicker(){
    let colors = ['red', 'blue', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
}

export { colorpicker };