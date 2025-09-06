# SEP 6 2025
# SAMIP REGMI
# MAIN.py
# THE REPO IS UNDER MIT LICENSE


# X1, Y1 -> TOP LEFT CORNER
# X2, Y2 -> BOTTOM RIGHT CORNER

from utils import Canvas ,Bird, UpperPipe , LowerPipe 
import tkinter as tk
import random

VERTICAL_PIPE_GAP = 150
HORIZONTAL_PIPE_GAP = 200

canvas = Canvas(800,600)
bird = Bird(width=30, height=30)
up_pipes = []
low_pipes = []
SPEED = 5

window = tk.Tk()
window.title("GUI FLAPPY BIRD")
canvas_widget = tk.Canvas(window, width=canvas.width, height=canvas.height, bg="lightblue")
canvas_widget.pack()


def get_bbox(coords):
    # X1, Y1 -> TOP LEFT CORNER
    x1 = coords["y"][0][0]
    y1 = coords["y"][0][1]
    # X2, Y2 -> BOTTOM RIGHT CORNER
    x2 = coords["y"][1][0]
    y2 = coords["x"][0][1]
    return x1, y1, x2, y2

cx1, cy1, cx2, cy2 = get_bbox(canvas.coordinates())

def add_pipe():
    if len(up_pipes) == 0:
        upper_height = random.randint(50, canvas.height - VERTICAL_PIPE_GAP - 50)
        new_upper_pipe = UpperPipe(width=50, height=upper_height, canvas=canvas, x=cx2)
        nupx1, nupy1, nupx2, nupy2 = get_bbox(new_upper_pipe.coordinates())
        lower_height = canvas.height - upper_height - VERTICAL_PIPE_GAP
        new_lower_pipe = LowerPipe(width=50, height=lower_height, canvas=canvas, x=nupx2)
        up_pipes.append(new_upper_pipe)
        low_pipes.append(new_lower_pipe)
    else:
        last_upper_pipe = up_pipes[-1]
        lupx1, lupy1, lupx2, lupy2 = get_bbox(last_upper_pipe.coordinates())

        # IG THE LAST PIPE IS AT LEAST HORIZONTAL PIPE GAP AWAY FROM THE RIGHT EDGE OF THE CANVAS
        if lupx2 < cx2 - HORIZONTAL_PIPE_GAP:
            upper_height = random.randint(50, canvas.height - VERTICAL_PIPE_GAP - 50)
            new_upper_pipe = UpperPipe(width=50, height=upper_height, canvas=canvas, x=cx2)
            nupx1, nupy1, nupx2, nupy2 = get_bbox(new_upper_pipe.coordinates())
            lower_height = canvas.height - upper_height - VERTICAL_PIPE_GAP
            new_lower_pipe = LowerPipe(width=50, height=lower_height, canvas=canvas, x=nupx2)
            up_pipes.append(new_upper_pipe)
            low_pipes.append(new_lower_pipe)

def canvas_pipe_collision(canvas, upper_pipe, lower_pipe):
    upx1, upy1, upx2, upy2 = get_bbox(upper_pipe.coordinates())
    lowx1, lowy1, lowx2, lowy2 = get_bbox(lower_pipe.coordinates())
    # MAKE SURE BOTH PIPES ARE OUTSIDE THE CANVAS
    if upx2 <= cx1 and lowx2 <= cx1:
        return True
    return False
    

def check_pipe_collision(bird, upper_pipes, lower_pipes):
    bx1, by1, bx2, by2 = get_bbox(bird.coordinates())
    for up, low in zip(upper_pipes, lower_pipes):
        ux1, uy1, ux2, uy2 = get_bbox(up.coordinates())
        lx1, ly1, lx2, ly2 = get_bbox(low.coordinates())

        if bx2 >= ux1 and bx1 <= ux2 and by1 <= uy2:
            return True
        if bx2 >= lx1 and bx1 <= lx2 and by2 >= ly1:
            return True

    return False


def canvas_bird_collision(canvas, bird):
    bx1, by1, bx2, by2 = get_bbox(bird.coordinates())

    # IF BY2 IS EQUAL TO CANVAS BOTTOM OR BY1 IS EQUAL TO CANVAS TOP
    if by2 >= cy2 or by1 <= cy1:
        return True


# USE SPACEBAR TO MAKE THE BIRD FLAP
def on_spacebar(event: tk.Event):
    bird.flap()
window.bind("<space>", on_spacebar)

def gameloop():
    global up_pipes, low_pipes, bird
    print(len(up_pipes), len(low_pipes))

    add_pipe()
    # REMOVE PIPES THAT ARE OUTSIDE THE CANVAS
    up_pipes = [pipe for pipe in up_pipes if pipe.coordinates()["x"][1][0] > 0]
    low_pipes = [pipe for pipe in low_pipes if pipe.coordinates()["x"][1][0] > 0]

    bird.apply_gravity()
    for up_pipe in up_pipes:
        up_pipe.moveleft(SPEED)
    for low_pipe in low_pipes:
        low_pipe.moveleft(SPEED)
    
    lat_upper_pipe = up_pipes[-1]
    if lat_upper_pipe.coordinates()["x"][1][0] < canvas.width:
        add_pipe()

    bird_cords = bird.coordinates()

    canvas_widget.delete("all")
    canvas_widget.create_rectangle(bird_cords["x"][0],bird_cords["y"][1],fill="yellow")
    for up_pipe in up_pipes:
        up_cords = up_pipe.coordinates()
        canvas_widget.create_rectangle(up_cords["x"][0], up_cords["y"][1], fill="green")
    for low_pipe in low_pipes:
        low_cords = low_pipe.coordinates()
        canvas_widget.create_rectangle(low_cords["x"][0], low_cords["y"][1], fill="green")

    if check_pipe_collision(bird, up_pipes, low_pipes) or canvas_bird_collision(canvas, bird):
        print("GAME OVER")
        return
    
    window.after(30, gameloop)

gameloop()
window.mainloop()
