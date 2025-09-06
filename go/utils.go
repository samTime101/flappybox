// SEPTEMBER 6 2025
// SAMIP REGMI
// UTILS.GO

package main

// CANVAS DEFINITION
type Canvas struct {
	Width int
	Height int
	X int
	Y int
}
// COORDINATES FUNCTION PART OF CANVAS STRUCT
func (canvas *Canvas) Coordinates() map[string]int {
	return map[string]int{
		"x0" : canvas.X,
		"y0" : canvas.Y,
		"x1" : canvas.X + canvas.Width,
		"y1" : canvas.Y + canvas.Height,
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

// UPPER PIPE DEFINITION
type UpperPipe struct {
	Width 	int
	Height 	int
	X 			int 
	Y 			int
}

// UPPER PIPE COORDINATES FUNCTION

func (upperpipe *UpperPipe) Coordinates() map[string]int {
	return map[string]int{
		"x0" : upperpipe.X,
		"y0" : upperpipe.Y,
		"x1" : upperpipe.X +	upperpipe.Width,
		"y1" : upperpipe.Y +	upperpipe.Height,
	
	}
}

// MOVE LEFT FUNCTION FOR UPPER PIPE
func (upperpipe *UpperPipe) MoveLeft(speed int) {
	upperpipe.X -= speed
}

// UPPER PIPE INITIALIZATION FUNCTION

func NewUpperPipe(width int, height int, x *int, y *int , canvas *Canvas) *UpperPipe {
	// THE DEFAULT X POSITION OF THE UPPER PIPE IS THE WIDTH OF THE CANVAS
	pipeX := canvas.Width
	if x !=  nil {
		pipeX = *x
	}
	pipeY := 0
	if y != nil {
		pipeY = *y
	}

	return &UpperPipe{
		Width: width,
		Height: height,
		X: pipeX,
		Y: pipeY,
	}
}
