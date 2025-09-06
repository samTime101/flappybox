# SEP 6 2025
# SAMIP REGMI
# UTILS.py
# THE REPO IS UNDER MIT LICENSE

# IN TKINTER THE ORIGIN (0,0) IS AT THE TOP LEFT CORNER
# THE X AXIS INCREASES TO THE RIGHT
# THE Y AXIS INCREASES DOWNWARDS

# X1, Y1 -> TOP LEFT CORNER
# X2, Y2 -> BOTTOM RIGHT CORNER

class Canvas:
    def __init__(self,width,height):
        self.width = width
        self.height = height
        self.x = 0
        self.y = 0
    def coordinates(self):
        return{
            "x":((self.x,self.y+self.height),(self.x+self.width,self.y+self.height)),
            "y":((self.x,self.y),(self.x+self.width,self.y))
        }
    
class Bird:
    def __init__(self,width,height):
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
        return{
            "x":((self.x,self.y+self.height),(self.x+self.width,self.y+self.height)),
            "y":((self.x,self.y),(self.x+self.width,self.y))
        }
class UpperPipe:
    def __init__(self,width,height,canvas,x=None,y=None):
        self.x = x if x is not None else canvas.width
        self.y = y if y is not None else 0
        self.height = height
        self.width = width
    def moveleft(self, speed):
        self.x -= speed
    def coordinates(self):
        return{
            "x":((self.x,self.y+self.height),(self.x+self.width,self.y+self.height)),
            "y":((self.x,self.y),(self.x+self.width,self.y))
        }

class LowerPipe:
    def __init__(self,width,height,canvas,x=None,y=None):
        self.x = x if x is not None else canvas.width
        self.y = y if y is not None else canvas.height - height
        self.height = height
        self.width = width
    def moveleft(self, speed):
        self.x -= speed
    def coordinates(self):
        return{
            "x":((self.x,self.y+self.height),(self.x+self.width,self.y+self.height)),
            "y":((self.x,self.y),(self.x+self.width,self.y))
        }