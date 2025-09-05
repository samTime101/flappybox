# SEP 4 2025
# SAMIP REGMI
# A RECTANGULAR CANVAS

class Canvas:
    def __init__(self, width , height):
        self.width = width
        self.height = height
        self.x = 0
        self.y = 0

    def coordinates(self):
        x0, x1 = self.x, self.x + self.width
        y0, y1 = self.y, self.y + self.height
        return {
            "x0": x0,
            "y0": y0,
            "x1": x1,
            "y1": y1
        }

class Bird:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.x = 100
        self.y = 100
        self.y_velocity = 0
    def flap(self):
        self.y_velocity = -10
    def apply_gravity(self):
        self.y_velocity += 1
        self.y += self.y_velocity
    def coordinates(self):
        x0, x1 = self.x, self.x + self.width
        y0, y1 = self.y, self.y + self.height
        return {
            "x0": x0,
            "y0": y0,
            "x1": x1,
            "y1": y1
        }

class UpperPipe:
    def __init__(self, width, height , canvas, x=None, y=None):
        # THE PIPE WILL START FROM THE RIGHT EDGE OF THE CANVAS
        self.x = x if x is not None else canvas.width
        # THE PIPE WILL START FROM THE TOP EDGE OF THE CANVAS
        self.y = y if y is not None else 0
        self.height = height
        self.width = width

    def coordinates(self):
        x0, x1 = self.x, self.x + self.width
        y0, y1 = self.y, self.y + self.height
        return {
            "x0": x0,
            "y0": y0,
            "x1": x1,
            "y1": y1
        }
    def move_left(self, speed):
        self.x -= speed

class LowerPipe:
    def __init__(self, width, height , canvas , x=None, y=None):
        self.x = x if x is not None else canvas.width
        self.y = y if y is not None else canvas.height - height
        self.height = height
        self.width = width

    def coordinates(self):
        x0, x1 = self.x, self.x + self.width
        y0, y1 = self.y, self.y + self.height
        return {
            "x0": x0,
            "y0": y0,
            "x1": x1,
            "y1": y1
        }
    def move_left(self, speed):
        self.x -= speed
