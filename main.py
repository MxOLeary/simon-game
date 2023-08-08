"""
Button Inputs
0 - A
1 - B
2 - Both
"""
def on_button_pressed_a():
    global userInput, selection
    userInput = True
    selection = 0
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global userInput, selection
    userInput = True
    selection = 1
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_ab():
    global userInput, selection
    userInput = True
    selection = 2
input.on_button_pressed(Button.AB, on_button_pressed_ab)

# Variables
userInput = False
selection = 0
gameState = 0
pattern: List[number] = []
score = 0
level = 0
gameRun = False
RunState()

"""
Game States
0 - Booting
1 - Reset
2 - Ready
3 - Play
4 - Game Over
"""

def RunState():
    global gameState
    while True:
        if gameState == 0:
            Boot()
        elif gameState == 1:
            Reset()
        elif gameState == 2:
            Ready()
            AddToPattern(3)
        elif gameState == 3:
            RunLevel()
        elif gameState == 4:
            GameOver()
        else:
            gameState = 0


def Boot():
    global gameState, score, level, userInput, selection
    for i in range(3):
        FlashSingle(0, 0, 250)
    score = 0
    selection = 0
    level = 0
    userInput = False
    gameState += 1

def Reset():
    global gameState, score, selection, level, userInput
    for i in range(3):
            FlashSingle(1, 1, 250)
    score = 0
    selection = 0
    level = 0
    userInput = False
    gameState += 1

def Ready():
    global gameState, userInput, selection, gameRun
    while not gameRun:
        FlashSingle(2,2,250)
        if userInput and selection==2:
            gameRun = True
    gameState += 1

def GameOver():
    global gameState
    basic.show_string("Game Over")
    gameState += 1

def AddToPattern(n: number):
    global pattern
    for i in range(n):
        pattern.append(randint(0,1))        

def RunLevel():
    global gameState
    basic.pause(5)
    DisplayPattern(250)
    gameState += 1

"""
LED Controls
- Single flashing
- left/right flashing
- all flashing
"""
def ToggleRight():
    led.toggle(4, 0)
    led.toggle(4, 1)
    led.toggle(4, 2)
    led.toggle(4, 3)
    led.toggle(4, 4)

def ToggleLeft():
    led.toggle(0, 0)
    led.toggle(0, 1)
    led.toggle(0, 2)
    led.toggle(0, 3)
    led.toggle(0, 4)

def FlashRight(waitTime: number):
    basic.clear_screen()
    ToggleRight()
    basic.pause(waitTime)
    ToggleRight()
    basic.pause(waitTime)

def FlashLeft(waitTime: number):
    basic.clear_screen()
    ToggleLeft()
    basic.pause(waitTime)
    ToggleLeft()
    basic.pause(waitTime)

def FlashAll(waitTime: number):
    basic.clear_screen()
    led.toggle_all()
    basic.pause(waitTime)
    led.toggle_all()
    basic.pause(waitTime)

def FlashSingle(x: number, y: number, waitTime: number):
    basic.clear_screen()
    led.toggle(x, y)
    basic.pause(waitTime)
    led.toggle(x, y)
    basic.pause(waitTime)

def SpinnyThing(waitTime: number):
    pass

def DeathAnimation(waitTime: number):
    pass

def DisplayScore():
    pass

def DisplayPattern(waitTime: number):
    global pattern
    for step in pattern:
        if step == 0:
            FlashLeft(waitTime)
        else:
            FlashRight(waitTime)
    
