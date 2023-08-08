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
let level = 0
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
    
    for (let i = 0; i < 3; i++) {
        FlashSingle(0, 0, 250)
    }
    score = 0
    selection = 0
    level = 0
    userInput = false
    gameState += 1
}

function Reset() {
    
    for (let i = 0; i < 3; i++) {
        FlashSingle(1, 1, 250)
    }
    score = 0
    selection = 0
    level = 0
    userInput = false
    gameState += 1
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
}

function AddToPattern(n: number) {
    
    for (let i = 0; i < n; i++) {
        pattern.push(randint(0, 1))
    }
}

function RunLevel() {
    
    basic.pause(5)
    DisplayPattern(250)
    gameState += 1
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
    
}

function DeathAnimation(waitTime: number) {
    
}

function DisplayScore() {
    
}

function DisplayPattern(waitTime: number) {
    
    for (let step of pattern) {
        if (step == 0) {
            FlashLeft(waitTime)
        } else {
            FlashRight(waitTime)
        }
        
    }
}

