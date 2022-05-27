import turtle
import time
import random

lag = 0.2

#Screen

wn = turtle.Screen()
wn.title("Termogame")
wn.bgcolor("black")
wn.setup(width=600, height=600)
wn.tracer(0)

#Bote

bote = turtle.Turtle()
bote.speed(0)
bote.shape("square")
bote.color("white")
bote.penup()
bote.goto(0,0)
bote.direction = "stop" 

#-T_H & +T_H

#Movement function's
tmax = turtle.Turtle()
tmax.speed(0)
tmax.shape("triangle")
tmax.color("red")
tmax.penup()
tmax.goto(0,100)

def up():
    bote.direction = "up"
def down():
    bote.direction = "down"
def left():
    bote.direction = "left"
def right():
    bote.direction = "right"

def mov():
    if bote.direction == "up":
        y = bote.ycor()
        bote.sety(y + 20)
    if bote.direction == "down":
        y = bote.ycor()
        bote.sety(y - 20)
    if bote.direction == "left":
        x = bote.xcor()
        bote.setx(x - 20)
    if bote.direction == "right":
        x = bote.xcor()
        bote.setx(x + 20)

#Keyboard control's
wn.listen()
wn.onkeypress(up, "Up")
wn.onkeypress(down, "Down")
wn.onkeypress(left, "Left")
wn.onkeypress(right, "Right")

#Main loop
while True:
    wn.update()
    
    if bote.distance(tmax) < 20:
       x = random.randint(-280,280)
       y = random.randint(-280,280)
       tmax.goto(x,y)


    mov()
    time.sleep(lag)

turtle.done()
