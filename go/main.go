// SEPTEMBER 6 2025
// SAMIP REGMI
// UTILS.GO
package main

import "fmt"

func main(){
	canvas := NewCanvas(800, 600)
	coords := canvas.Coordinates()
	fmt.Println("Canvas Width:", canvas.Width)
	fmt.Println("Canvas Height:", canvas.Height)
	fmt.Println("Canvas Coordinates:", coords)
}
