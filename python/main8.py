# SEP 4
# 2025
# SAMIP REGMI 
from main import Canvas ,Bird, UpperPipe , LowerPipe 
import tkinter as tk
import random

class Bird(Bird):
    def flap(self):
        self.y_velocity = -10
    def apply_gravity(self):
        self.y_velocity += 1
        self.y += self.y_velocity


canvas = Canvas(400, 600)
PIPE_GAP = 150
up_pipes = [UpperPipe(width=50, height=200, canvas=canvas)]
low_pipes = [LowerPipe(width=50, height=200 - PIPE_GAP, canvas=canvas)]
bird = Bird(width=30, height=30)

def add_pipe():
    last_upper_pipe = up_pipes[-1]
    last_lower_pipe = low_pipes[-1]

    upper_height = random.randint(50, canvas.height - PIPE_GAP - 50)
    new_upper_pipe = UpperPipe(width=50, height=upper_height, canvas=canvas, x=last_upper_pipe.x + 200)

    lower_height = 200 - PIPE_GAP
    new_lower_pipe = LowerPipe(width=50, height=lower_height, canvas=canvas, x=new_upper_pipe.x)

    up_pipes.append(new_upper_pipe)
    low_pipes.append(new_lower_pipe)

def canvas_pipe_collision(canvas, upper_pipe, lower_pipe):
    # CHECK IF THE UPPER PIPE IS OUTSIDE THE CANVAS
    if upper_pipe.coordinates()["x1"] <= canvas.x:
        return True
    # CHECK IF THE LOWER PIPE IS OUTSIDE THE CANVAS
    if lower_pipe.coordinates()["x1"] <= 0:
        return True
    return False

def check_pipe_collision(bird, upper_pipes, lower_pipes):
    for up, low in zip(upper_pipes, lower_pipes):
        b = bird.coordinates()
        up_c = up.coordinates()
        low_c = low.coordinates()

        # BIRD HITS UPPER PIPE
        if b["x1"] >= up_c["x0"] and b["x0"] <= up_c["x1"] and b["y0"] <= up_c["y1"]:
            return True
        # BIRD HITS LOWER PIPE
        if b["x1"] >= low_c["x0"] and b["x0"] <= low_c["x1"] and b["y1"] >= low_c["y0"]:
            return True

    return False


def canvas_bird_collision(canvas, bird):
    # CHECK IF BIRD TOUCH TOP OF THE CANVAS
    if bird.coordinates()["y0"] <= canvas.y:
        return True
    # CHECK IF BIRD TOUCH BOTTOM OF THE CANVAS
    if bird.coordinates()["y1"] >= canvas.height:
        return True
    return False

window = tk.Tk()
window.title("GUI FLAPPY BIRD")
canvas_widget = tk.Canvas(window, width=canvas.width, height=canvas.height, bg="lightblue")
canvas_widget.pack()


SPEED = 5

# USE SPACEBAR TO MAKE THE BIRD FLAP
def on_spacebar(event: tk.Event):
    bird.flap()
window.bind("<space>", on_spacebar)

def gameloop():
    bird.apply_gravity()
    for up_pipe in up_pipes:
        up_pipe.move_left(SPEED)
    for low_pipe in low_pipes:
        low_pipe.move_left(SPEED)
    if up_pipes[-1].coordinates()["x1"] < canvas.width:
        add_pipe()
    bird_cords = bird.coordinates()

    # GUI
    canvas_widget.delete("all")
    canvas_widget.create_rectangle(bird_cords["x0"], bird_cords["y0"], bird_cords["x1"], bird_cords["y1"], fill="yellow")
    for up_pipe in up_pipes:
        top_pipe_cords = up_pipe.coordinates()
        canvas_widget.create_rectangle(top_pipe_cords["x0"], top_pipe_cords["y0"], top_pipe_cords["x1"], top_pipe_cords["y1"], fill="green")
    for low_pipe in low_pipes:
        bottom_pipe_cords = low_pipe.coordinates()
        canvas_widget.create_rectangle(bottom_pipe_cords["x0"], bottom_pipe_cords["y0"], bottom_pipe_cords["x1"], bottom_pipe_cords["y1"], fill="green")

    if canvas_bird_collision(canvas, bird) or check_pipe_collision(bird, up_pipes, low_pipes):
        print("GAME OVER")
        return

    window.after(30, gameloop)

gameloop()
window.mainloop()
