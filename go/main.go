// SEPTEMBER 6 2025
// SAMIP REGMI
// UTILS.GO

package main

import (
	"fmt"
	"image/color"
	"log"

	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/vector"
)

const (
	CANVASWIDTH  = 800
	CANVASHEIGHT = 600
	PIPESPEED    = 5
	PIPEWIDTH    = 50
	PIPEHEIGHT   = 200
	PIPEGAP      = 100
)

var (
	canvas    = NewCanvas(CANVASWIDTH, CANVASHEIGHT)
	upperpipe = NewUpperPipe(PIPEWIDTH, PIPEHEIGHT, nil, nil, canvas)
	y         = CANVASHEIGHT - PIPEGAP
	lowerpipe = NewLowerPipe(PIPEWIDTH, PIPEHEIGHT, nil, &y, canvas)
	bird      = NewBird(30, 30)
)

type Game struct{}

func canvas_bird_collision(Canvas *Canvas, bird *Bird) bool {
	// X0 YO IS TOP LEFT AND X1 Y1 IS BOTTOM RIGHT
	if bird.Coordinates()["y0"] >= canvas.Coordinates()["y1"] || bird.Coordinates()["y1"] <= canvas.Coordinates()["y0"] {
		return true
	}
	return false
}

func bird_upperpipe_collision(bird *Bird, upperpipe *UpperPipe) bool {
	if bird.Coordinates()["x1"] >= upperpipe.Coordinates()["x0"] && bird.Coordinates()["x0"] <= upperpipe.Coordinates()["x1"] &&
		bird.Coordinates()["y0"] <= upperpipe.Coordinates()["y1"] {
		return true
	}
	return false
}
func bird_lowerpipe_collision(bird *Bird, lowerpipe *LowerPipe) bool {
	if bird.Coordinates()["x1"] >= lowerpipe.Coordinates()["x0"] && bird.Coordinates()["x0"] <= lowerpipe.Coordinates()["x1"] &&
		bird.Coordinates()["y1"] >= lowerpipe.Coordinates()["y0"] {
		return true
	}
	return false
}

func (g *Game) Update() error {
	bird.ApplyGravity()
	if ebiten.IsKeyPressed(ebiten.KeySpace) {
		fmt.Println("Space key pressed")
		bird.Flap()
	}

	upperpipe.MoveLeft(PIPESPEED)
	lowerpipe.MoveLeft(PIPESPEED)

	// RESET THE POSITOION OF PIPES IF THEY GO OUT OF THE CANVAS
	if upperpipe.Coordinates()["x1"] < 0 {
		upperpipe.X = canvas.Coordinates()["x1"]
		lowerpipe.X = canvas.Coordinates()["x1"]
	}
	// GAME OVER CHECKS
	if canvas_bird_collision(canvas, bird) || bird_upperpipe_collision(bird, upperpipe) || bird_lowerpipe_collision(bird, lowerpipe) {
		return fmt.Errorf("Game Over")
	}

	return nil
}

func (g *Game) Draw(screen *ebiten.Image) {
	screen.Fill(color.RGBA{0, 0, 0, 255})
	vector.DrawFilledRect(screen, float32(upperpipe.X), float32(upperpipe.Y),
		float32(upperpipe.Width), float32(upperpipe.Height), color.RGBA{255, 0, 0, 255}, true)
	vector.DrawFilledRect(screen, float32(lowerpipe.X), float32(lowerpipe.Y),
		float32(lowerpipe.Width), float32(lowerpipe.Height), color.RGBA{0, 255, 0, 255}, true)
	vector.DrawFilledRect(screen, float32(bird.X), float32(bird.Y),
		float32(bird.Width), float32(bird.Height), color.RGBA{0, 0, 255, 255}, true)
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
