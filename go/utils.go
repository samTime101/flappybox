// SEPTEMBER 6 2025
// SAMIP REGMI
// UTILS.PY

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


// LOWER PIPE DEFINITION
type LowerPipe struct {
	Width 	int
	Height 	int
	X 			int 
	Y 			int
}

// LOWER PIPE COORDINATES FUNCTION

func (lowerpipe *LowerPipe) Coordinates() map[string]int {
	return map[string]int{
		"x0" : lowerpipe.X,
		"y0" : lowerpipe.Y,
		"x1" : lowerpipe.X +	lowerpipe.Width,
		"y1" : lowerpipe.Y +	lowerpipe.Height,
	
	}
}

// MOVE LEFT FUNCTION FOR UPPER PIPE
func (lowerpipe *LowerPipe) MoveLeft(speed int) {
	lowerpipe.X -= speed
}

// LOWER PIPE INITIALIZATION FUNCTION

func NewLowerPipe(width int, height int, x *int, y *int , canvas *Canvas) *LowerPipe {
	// THE DEFAULT X POSITION OF THE UPPER PIPE IS THE WIDTH OF THE CANVAS
	pipeX := canvas.Width
	if x !=  nil {
		pipeX = *x
	}
	pipeY := 0
	if y != nil {
		pipeY = *y
	}

	return &LowerPipe{
		Width: width,
		Height: height,
		X: pipeX,
		Y: pipeY,
	}
}

// BIRD DEFINITION
type Bird struct {
	Width int
	Height int
	X int
	Y int
	Y_VELOCITY int
}

func (bird *Bird) Coordinates() map[string]int {
	return map[string]int{
		"x0" : bird.X,
		"y0" : bird.Y,
		"x1" : bird.X + bird.Width,
		"y1" : bird.Y + bird.Height,
	}
}

// FLAP FUNCTION FOR BIRD
func (bird *Bird) Flap() {
	bird.Y_VELOCITY = -10
}

// APPLY GRAVITY FUNCTION FOR BIRD
func (bird *Bird) ApplyGravity() {
	bird.Y_VELOCITY += 1
	bird.Y += bird.Y_VELOCITY
}


// BIRD INITIALIZATION FUNCTION
func NewBird(width int, height int) *Bird {
		return &Bird{
			Width				: width,
			Height			: height,
			X						:	100,
			Y						:	200,
			Y_VELOCITY	:	0,
		}
}
