// SEPTEMBER 6 2025
// SAMIP REGMI
// UTILS.GO

package main

import (
	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/ebitenutil"
	"image/color"
	"log"
)

const (
	CANVASWIDTH  = 800
	CANVASHEIGHT = 600
	PIPESPEED    = 5
	PIPEWIDTH    = 50
	PIPEHEIGHT   = 200
	PIPEGAP  = 100
)

var (
	canvas    = NewCanvas(CANVASWIDTH, CANVASHEIGHT)
	upperpipe = NewUpperPipe(PIPEWIDTH, PIPEHEIGHT, nil, nil, canvas)
	y = CANVASHEIGHT - PIPEGAP
	lowerpipe = NewLowerPipe(PIPEWIDTH, PIPEHEIGHT, nil, &y, canvas)
)

type Game struct{} 

func (g *Game) Update() error {
	upperpipe.MoveLeft(PIPESPEED)
	lowerpipe.MoveLeft(PIPESPEED)

	if upperpipe.Coordinates()["x1"] < canvas.Coordinates()["x0"] {
		upperpipe.X = canvas.Coordinates()["x1"]
	}
	if lowerpipe.Coordinates()["x1"] < canvas.Coordinates()["x0"] {
		lowerpipe.X = canvas.Coordinates()["x1"]
	}
	return nil
}

func (g *Game) Draw(screen *ebiten.Image) {
	screen.Fill(color.RGBA{0, 0, 0, 255})
	ebitenutil.DrawRect(screen, float64(upperpipe.X), float64(upperpipe.Y),
		float64(upperpipe.Width), float64(upperpipe.Height), color.RGBA{255, 0, 0, 255})
	ebitenutil.DrawRect(screen, float64(lowerpipe.X), float64(lowerpipe.Y),
		float64(lowerpipe.Width), float64(lowerpipe.Height), color.RGBA{0, 255, 0, 255})
}

func (g *Game) Layout(outsideWidth, outsideHeight int) (int, int) {
	return CANVASWIDTH, CANVASHEIGHT
}

func main() {
	ebiten.SetWindowSize(CANVASWIDTH, CANVASHEIGHT)
	ebiten.SetWindowTitle("FLAPPYYYY")

	if err := ebiten.RunGame(&Game{}); err != nil {
		log.Fatal(err)
	}
}
