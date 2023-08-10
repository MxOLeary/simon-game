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
    global gameState, score
    while True:
        if gameState == 0:
            Boot()
        elif gameState == 1:
            Reset()
        elif gameState == 2:
            Ready()
            AddToPattern(3)
            score += 1
        elif gameState == 3:
            RunLevel()
        elif gameState == 4:
            GameOver()
        else:
            gameState = 0


def Boot():
    global gameState, score, userInput, selection, gameRun
    SpinnyThing(50)
    score = 0
    selection = 0
    userInput = False
    gameState += 1
    gameRun = False

def Reset():
    global gameState, score, selection, userInput, gameRun
    for i in range(1):
        FlashIcon(IconNames.SMALL_SQUARE, 500)
    score = 0
    selection = 0
    userInput = False
    gameState += 1
    gameRun = False

def Ready():
    global gameState, userInput, selection, gameRun
    while not gameRun:
        FlashSingle(2,2,250)
        if userInput and selection==2:
            gameRun = True
    gameState += 1

def GameOver():
    global gameState, pattern, userInput, selection
    basic.show_string("Game Over")
    gameState += 1
    selection = 0
    pattern = []
    userInput = False
    
def AddToPattern(n: number):
    global pattern
    for i in range(n):
        pattern.append(randint(0,1))        

def RunLevel():
    global gameState, score, pattern, userInput, selection
    basic.pause(5)
    DisplayScore()
    basic.pause(5)
    DisplayPattern(250)
    userInput = False
    for step in pattern:
        while not userInput:
            basic.pause(5)
        userInput = False
        if selection == step:
            pass
        else:
            gameState += 1
            DeathAnimation(150)
            basic.show_icon(IconNames.SAD)
            basic.pause(1000)
            DisplayScore()
            break
        userInput = False
    if gameState == 3:
        score += 1
        AddToPattern(1)
        basic.clear_screen()
        music.play_sound_effect(music.builtin_sound_effect(soundExpression.happy),
            SoundExpressionPlayMode.IN_BACKGROUND)
        basic.show_icon(IconNames.HAPPY)
        basic.pause(500)

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
    music.play(music.string_playable("C D E F G A B C5 C5 C5", 600),
        music.PlaybackMode.IN_BACKGROUND)
    basic.clear_screen()
    led.plot(2, 0)
    basic.pause(waitTime)
    led.plot(3, 0)
    basic.pause(waitTime)
    led.plot(4, 0)
    basic.pause(waitTime)
    led.plot(4, 1)
    basic.pause(waitTime)
    led.plot(4, 2)
    basic.pause(waitTime)
    led.plot(4, 3)
    basic.pause(waitTime)
    led.plot(4, 4)
    basic.pause(waitTime)
    led.plot(3, 4)
    basic.pause(waitTime)
    led.plot(2, 4)
    basic.pause(waitTime)
    led.plot(1, 4)
    basic.pause(waitTime)
    led.plot(0, 4)
    basic.pause(waitTime)
    led.plot(0, 3)
    basic.pause(waitTime)
    led.plot(0, 2)
    basic.pause(waitTime)
    led.plot(0, 1)
    basic.pause(waitTime)
    led.plot(0, 0)
    basic.pause(waitTime)
    led.plot(1, 0)
    basic.pause(waitTime)
    led.plot(1, 1)
    basic.pause(waitTime)
    basic.clear_screen()

def FlashIcon(icon: IconNames, waitTime: number):
    basic.clear_screen()
    basic.show_icon(icon)
    basic.clear_screen()
    basic.pause(waitTime)

def DeathAnimation(waitTime: number):
    basic.clear_screen()
    music.play_sound_effect(music.builtin_sound_effect(soundExpression.sad),
                SoundExpressionPlayMode.IN_BACKGROUND)
    basic.plot_leds("""
    . # . # .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    """)
    basic.pause(waitTime)
    basic.plot_leds("""
        # # # # #
        . # . # .
        . . . . .
        . . . . .
        . . . . .
        """)
    basic.pause(waitTime)
    basic.plot_leds("""
        # # # # #
        # # # # #
        . # . # .
        . . . . .
        . . . . .
        """)
    basic.pause(waitTime)
    basic.plot_leds("""
        # # # # #
        # # # # #
        # # # # #
        . # . # .
        . . . . .
        """)
    basic.pause(waitTime)
    basic.plot_leds("""
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        . # . # .
        """)
    basic.pause(waitTime)
    basic.plot_leds("""
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        """)
    basic.pause(waitTime)
    FlashAll(waitTime)


def DisplayScore():
    global score
    basic.show_number(score)
    basic.pause(2000)
    basic.clear_screen()

def DisplayPattern(waitTime: number):
    global pattern
    for step in pattern:
        music.play(music.tone_playable(349, music.beat(BeatFraction.HALF)),
                music.PlaybackMode.IN_BACKGROUND)
        if step == 0:
            FlashLeft(waitTime)
        else:
            FlashRight(waitTime)
    
