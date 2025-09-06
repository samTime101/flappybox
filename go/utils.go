package utils

// CANVAS DEFINITION
type Canvas struct {
	Width int,
	Heigh int,
	X int,
	Y int,
}

// COORDINATES FUNCTION PART OF CANVAS STRUCT
function (c *Canvas) Coordinates() map[string]int {
	return map[string]int{
		"x0" : c.X,
		"y0" : c.Y,
		"x1" : c.X + c.Width,
		"y1" : c.Y + c.Height,
	}

}
// FUNCTION TO INITIALIZE CANVAS
func NewCanvas(width int, height int) *Canvas {
	return &Canvas{
	Width: width,
	Height: height,
	X: 0,
	Y: 0,
	}
}

