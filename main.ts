/** 
Button Inputs
0 - A
1 - B
2 - Both

 */
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    userInput = true
    selection = 0
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    userInput = true
    selection = 1
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    userInput = true
    selection = 2
})
//  Variables
let userInput = false
let selection = 0
let gameState = 0
let pattern : number[] = []
let score = 0
let gameRun = false
RunState()
/** 
Game States
0 - Booting
1 - Reset
2 - Ready
3 - Play
4 - Game Over

 */
function RunState() {
    
    while (true) {
        if (gameState == 0) {
            Boot()
        } else if (gameState == 1) {
            Reset()
        } else if (gameState == 2) {
            Ready()
            AddToPattern(3)
            score += 1
        } else if (gameState == 3) {
            RunLevel()
        } else if (gameState == 4) {
            GameOver()
        } else {
            gameState = 0
        }
        
    }
}

function Boot() {
    
    SpinnyThing(50)
    score = 0
    selection = 0
    userInput = false
    gameState += 1
    gameRun = false
}

function Reset() {
    
    for (let i = 0; i < 1; i++) {
        FlashIcon(IconNames.SmallSquare, 500)
    }
    score = 0
    selection = 0
    userInput = false
    gameState += 1
    gameRun = false
}

function Ready() {
    
    while (!gameRun) {
        FlashSingle(2, 2, 250)
        if (userInput && selection == 2) {
            gameRun = true
        }
        
    }
    gameState += 1
}

function GameOver() {
    
    basic.showString("Game Over")
    gameState += 1
    selection = 0
    pattern = []
    userInput = false
}

function AddToPattern(n: number) {
    
    for (let i = 0; i < n; i++) {
        pattern.push(randint(0, 1))
    }
}

function RunLevel() {
    
    basic.pause(5)
    DisplayScore()
    basic.pause(5)
    DisplayPattern(250)
    userInput = false
    for (let step of pattern) {
        while (!userInput) {
            basic.pause(5)
        }
        userInput = false
        if (selection == step) {
            
        } else {
            gameState += 1
            DeathAnimation(150)
            basic.showIcon(IconNames.Sad)
            basic.pause(1000)
            DisplayScore()
            break
        }
        
        userInput = false
    }
    if (gameState == 3) {
        score += 1
        AddToPattern(1)
        basic.clearScreen()
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.happy), SoundExpressionPlayMode.InBackground)
        basic.showIcon(IconNames.Happy)
        basic.pause(500)
    }
    
}

/** 
LED Controls
- Single flashing
- left/right flashing
- all flashing

 */
function ToggleRight() {
    led.toggle(4, 0)
    led.toggle(4, 1)
    led.toggle(4, 2)
    led.toggle(4, 3)
    led.toggle(4, 4)
}

function ToggleLeft() {
    led.toggle(0, 0)
    led.toggle(0, 1)
    led.toggle(0, 2)
    led.toggle(0, 3)
    led.toggle(0, 4)
}

function FlashRight(waitTime: number) {
    basic.clearScreen()
    ToggleRight()
    basic.pause(waitTime)
    ToggleRight()
    basic.pause(waitTime)
}

function FlashLeft(waitTime: number) {
    basic.clearScreen()
    ToggleLeft()
    basic.pause(waitTime)
    ToggleLeft()
    basic.pause(waitTime)
}

function FlashAll(waitTime: number) {
    basic.clearScreen()
    led.toggleAll()
    basic.pause(waitTime)
    led.toggleAll()
    basic.pause(waitTime)
}

function FlashSingle(x: number, y: number, waitTime: number) {
    basic.clearScreen()
    led.toggle(x, y)
    basic.pause(waitTime)
    led.toggle(x, y)
    basic.pause(waitTime)
}

function SpinnyThing(waitTime: number) {
    music.play(music.stringPlayable("C D E F G A B C5 C5 C5", 600), music.PlaybackMode.InBackground)
    basic.clearScreen()
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
    basic.clearScreen()
}

function FlashIcon(icon: number, waitTime: number) {
    basic.clearScreen()
    basic.showIcon(icon)
    basic.clearScreen()
    basic.pause(waitTime)
}

function DeathAnimation(waitTime: number) {
    basic.clearScreen()
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.InBackground)
    basic.plotLeds(`
    . # . # .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
    basic.pause(waitTime)
    basic.plotLeds(`
        # # # # #
        . # . # .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(waitTime)
    basic.plotLeds(`
        # # # # #
        # # # # #
        . # . # .
        . . . . .
        . . . . .
        `)
    basic.pause(waitTime)
    basic.plotLeds(`
        # # # # #
        # # # # #
        # # # # #
        . # . # .
        . . . . .
        `)
    basic.pause(waitTime)
    basic.plotLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        . # . # .
        `)
    basic.pause(waitTime)
    basic.plotLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(waitTime)
    FlashAll(waitTime)
}

function DisplayScore() {
    
    basic.showNumber(score)
    basic.pause(2000)
    basic.clearScreen()
}

function DisplayPattern(waitTime: number) {
    
    for (let step of pattern) {
        music.play(music.tonePlayable(349, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        if (step == 0) {
            FlashLeft(waitTime)
        } else {
            FlashRight(waitTime)
        }
        
    }
}

