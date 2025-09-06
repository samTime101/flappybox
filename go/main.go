// SEPTEMBER 6 2025
// SAMIP REGMI
// UTILS.GO
package main

import "fmt"

const (
	canvasWidth  = 800
	canvasHeight = 600
	pipeSpeed = 5
	pipeWidth = 50
	pipeHeight = 200
)

func main(){
	canvas := NewCanvas(canvasWidth, canvasHeight)
	upperpipe := NewUpperPipe(pipeWidth, pipeHeight, nil,nil, canvas)
	cc := canvas.Coordinates()
	pc := upperpipe.Coordinates()
	fmt.Println("Canvas Width:", canvas.Width)
	fmt.Println("Canvas Height:", canvas.Height)
	fmt.Println("Canvas Coordinates:", cc)
	fmt.Println("Upper Pipe Coordinates:", pc)
}
