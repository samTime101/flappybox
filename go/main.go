// SEPTEMBER 6 2025
// SAMIP REGMI
// UTILS.GO
package main

import "fmt"

const (
	CANVASWIDTH  = 800
	CANVASHEIGHT = 600
	PIPESPEED = 5
	PIPEWIDTH = 50
	PIPEHEIGHT = 200
	FRAME  = 10
)

func main(){
	// INSTANCES
	canvas := NewCanvas(CANVASWIDTH, CANVASHEIGHT)
	upperpipe := NewUpperPipe(PIPEWIDTH, PIPEHEIGHT, nil,nil, canvas)
	lowerpipe := NewLowerPipe(PIPEWIDTH, PIPEHEIGHT, nil,nil, canvas)
	
	for i:=0; i < FRAME; i++ {
		upperpipe.MoveLeft(PIPESPEED)
		lowerpipe.MoveLeft(PIPESPEED)
		fmt.Println("UPPER PIPE X0 AND X1:",upperpipe.Coordinates()["x0"], upperpipe.Coordinates()["x1"])
	}
}
