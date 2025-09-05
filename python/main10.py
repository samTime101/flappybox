
# SEP 4 2025
# SAMIP REGMI
# A RECTANGULAR CANVAS I

from main import Canvas ,Bird, UpperPipe , LowerPipe 
import tkinter as tk
import random

SPEED = 5
PIPE_GAP = 150

canvas = Canvas(400, 600)
game_running = False
up_pipes = []
low_pipes = []
bird = Bird(width=30, height=30)

def add_pipe():
    last_upper_pipe = up_pipes[-1]
    # RANDOMLY GENERATE HEIGHT FOR THE NEW UPPER PIPE 
    # GENERATE HEIGHT BETWEEN 50 AND CANVAS HEIGHT - PIPE_GAP - 50
    upper_height = random.randint(50, canvas.height - PIPE_GAP - 50) 
    new_upper_pipe = UpperPipe(width=50, height=upper_height, canvas=canvas, x=last_upper_pipe.x + 200)

    lower_height = canvas.height - upper_height - PIPE_GAP
    new_lower_pipe = LowerPipe(width=50, height=lower_height, canvas=canvas, x=new_upper_pipe.x)

    up_pipes.append(new_upper_pipe)
    low_pipes.append(new_lower_pipe)

def check_pipe_collision(bird, upper_pipes, lower_pipes):
    for up, low in zip(upper_pipes, low_pipes):
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
    # CHECKS COLLISION OF BIRD WITH TOP AND BOTTOM OF THE CANVAS
    b = bird.coordinates()
    return b["y0"] <= canvas.y or b["y1"] >= canvas.height

window = tk.Tk()
window.title("GUI FLAPPY BIRD")
canvas_widget = tk.Canvas(window, width=canvas.width, height=canvas.height, bg="lightblue")
canvas_widget.pack()

def start_game():
    global up_pipes, low_pipes, bird, game_running, restart_button
    up_pipes = [UpperPipe(width=50, height=200, canvas=canvas)]
    low_pipes = [LowerPipe(width=50, height=200 - PIPE_GAP, canvas=canvas)]
    bird = Bird(width=30, height=30)
    bird.x = 100
    bird.y = canvas.height//2
    bird.y_velocity = 0
    game_running = True

    if 'restart_button' in globals():
        restart_button.destroy()

    if 'start_button' in globals():
        start_button.destroy()

    gameloop()

# USE SPACEBAR TO MAKE THE BIRD FLAP
def on_spacebar(event: tk.Event):
    if game_running:
        bird.flap()
window.bind("<space>", on_spacebar)

def gameloop():
    global up_pipes, low_pipes, game_running
    if not game_running:
        return

    bird.apply_gravity()

    for up_pipe in up_pipes:
        up_pipe.move_left(SPEED)
    for low_pipe in low_pipes:
        low_pipe.move_left(SPEED)

    # REMOVE OLD PIPES
    up_pipes = [p for p in up_pipes if p.coordinates()["x1"] > 0]
    low_pipes = [p for p in low_pipes if p.coordinates()["x1"] > 0]

    print(len(up_pipes), len(low_pipes))

    last_upper_pipe = up_pipes[-1]
    if last_upper_pipe.coordinates()["x1"] < canvas.width:
        add_pipe()

    canvas_widget.delete("all")
    b = bird.coordinates()
    canvas_widget.create_rectangle(b["x0"], b["y0"], b["x1"], b["y1"], fill="yellow")
    for up, low in zip(up_pipes, low_pipes):
        up_c = up.coordinates()
        low_c = low.coordinates()
        canvas_widget.create_rectangle(up_c["x0"], up_c["y0"], up_c["x1"], up_c["y1"], fill="green")
        canvas_widget.create_rectangle(low_c["x0"], low_c["y0"], low_c["x1"], low_c["y1"], fill="green")

    if canvas_bird_collision(canvas, bird) or check_pipe_collision(bird, up_pipes, low_pipes):
        game_over()
        return

    window.after(30, gameloop)

def show_start_screen():
    global start_button
    canvas_widget.delete("all")
    canvas_widget.create_text(canvas.width//2, canvas.height//2 - 50, text="FLAPPY BIRD", font=("Arial", 30), fill="black")
    canvas_widget.create_text(canvas.width//2, canvas.height//2, text="Press SPACE to flap", font=("Arial", 20), fill="black")
    start_button = tk.Button(window, text="Start Game", font=("Arial", 16), command=start_game)
    start_button.place(x=canvas.width//2 - 60, y=canvas.height//2 + 50)

def game_over():
    global game_running, restart_button
    game_running = False
    canvas_widget.delete("all")
    canvas_widget.create_text(canvas.width//2, canvas.height//2 - 50, text="GAME OVER", font=("Arial", 30), fill="red")
    canvas_widget.create_text(canvas.width//2, canvas.height//2, text="Click button to Play Again", font=("Arial", 20), fill="black")
    restart_button = tk.Button(window, text="Play Again", font=("Arial", 16), command=start_game)
    restart_button.place(x=canvas.width//2 - 60, y=canvas.height//2 + 50)

show_start_screen()
window.mainloop()
