// SEPTEMBER 6 2025
// SAMIP REGMI
// UTILS.GO
package main

import (
	"fmt"
	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/ebitenutil"
	"image/color"
	"log"
)

var (
	// INSTANCES
	canvas := NewCanvas(CANVASWIDTH, CANVASHEIGHT)
	upperpipe := NewUpperPipe(PIPEWIDTH, PIPEHEIGHT, nil,nil, canvas)
	lowerpipe := NewLowerPipe(PIPEWIDTH, PIPEHEIGHT, nil,nil, canvas)	
)

const (
	CANVASWIDTH  = 800
	CANVASHEIGHT = 600
	PIPESPEED = 5
	PIPEWIDTH = 50
	PIPEHEIGHT = 200
	FRAME  = 10
)

func main(){
	for i:=0; i < FRAME; i++ {
		upperpipe.MoveLeft(PIPESPEED)
		lowerpipe.MoveLeft(PIPESPEED)
		fmt.Println("UPPER PIPE X0 AND X1:",upperpipe.Coordinates()["x0"], upperpipe.Coordinates()["x1"])
	}
}
