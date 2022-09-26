input.onButtonPressed(Button.A, function () {
    basic.showNumber(input.temperature())
    if (temperature >= 30) {
        for (let index = 0; index < 2; index++) {
            basic.showString("Very Hot")
        }
        basic.showString("T-Shirt")
        music.startMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once)
    } else if (temperature >= 20) {
        for (let index = 0; index < 2; index++) {
            basic.showString("Hot")
        }
        basic.showString("MTM")
    } else if (temperature >= 10) {
        for (let index = 0; index < 2; index++) {
            basic.showString("Cool")
        }
        basic.showString("Coat")
    } else if (temperature >= 0) {
        for (let index = 0; index < 2; index++) {
            basic.showString("Cold")
        }
        basic.showString("Pad")
    } else {
        for (let index = 0; index < 2; index++) {
            basic.showString("Very Cold")
        }
        music.startMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once)
    }
    basic.pause(1000)
    basic.clearScreen()
})
input.onGesture(Gesture.FreeFall, function () {
    for (let index = 0; index < 4; index++) {
        music.playMelody("C5 - C5 - C5 - C5 - ", 130)
    }
})
function Object_Recognition () {
    huskylens.initI2c()
    huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        basic.showLeds(`
            . . # # #
            . . . . .
            . # # . .
            . # # . #
            . # # # .
            `)
        basic.pause(100)
        basic.clearScreen()
    } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        basic.showLeds(`
            . . . . .
            # # # # .
            . . . # .
            . # # . .
            . . . . .
            `)
        basic.pause(100)
        basic.clearScreen()
    }
}
input.onButtonPressed(Button.AB, function () {
    Object_Recognition()
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(input.lightLevel())
    if (input.lightLevel() > 200) {
        basic.showLeds(`
            . # # # .
            . # # # .
            # # # # #
            . . . . .
            . . . . .
            `)
        basic.showString("SunCream!")
    } else if (input.lightLevel() > 100) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (input.lightLevel() >= 0) {
        basic.showLeds(`
            . # # # .
            . . # # #
            . . . # #
            . . # # #
            . # # # .
            `)
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.UntilDone)
    }
    basic.pause(1000)
    basic.clearScreen()
})
let temperature = 0
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    temperature = input.temperature()
})
