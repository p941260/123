input.onGesture(Gesture.TiltRight, function () {
    music.setVolume(music.volume() + 20)
    basic.showLeds(`
        # # . . .
        # . . # .
        # . # # #
        # . . # .
        # # . . .
        `)
})
function Bad () {
    basic.showIcon(IconNames.Sad)
    basic.pause(1000)
    basic.showString("Bad Choice")
}
input.onGesture(Gesture.TiltLeft, function () {
    music.setVolume(music.volume() - 20)
    basic.showLeds(`
        # # . . .
        # . . . .
        # . # # #
        # . . . .
        # # . . .
        `)
})
function Temp () {
    basic.showNumber(temperature)
    if (temperature >= 28) {
        music.startMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once)
        basic.showString("Very Hot")
        basic.showString("Sleeveless Shirt")
    } else if (temperature >= 17) {
        basic.showString("Hot")
        basic.showString("T-Shirt")
    } else if (temperature >= 12) {
        basic.showString("Cool")
        basic.showString("MTM")
    } else if (temperature >= 5) {
        basic.showString("Cold")
        basic.showString("Coat")
    } else {
        music.startMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once)
        basic.showString("Very Cold")
        basic.showString("Padding")
    }
    basic.showIcon(IconNames.Happy)
}
input.onButtonPressed(Button.A, function () {
    Temp()
})
function Object_Classification () {
    huskylens.initI2c()
    huskylens.initMode(protocolAlgorithm.OBJECTCLASSIFICATION)
    while (Num == 0) {
        huskylens.request()
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            if (temperature >= 28) {
                Good()
            } else {
                Bad()
            }
        } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            if (28 > temperature && temperature >= 17) {
                Good()
            } else {
                Bad()
            }
        } else if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            if (17 > temperature && temperature >= 12) {
                Good()
            } else {
                Bad()
            }
        } else if (huskylens.isAppear(4, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            if (12 > temperature && temperature >= 5) {
                Good()
            } else {
                Bad()
            }
        } else if (huskylens.isAppear(5, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            if (5 > temperature) {
                Good()
            } else {
                Bad()
            }
        } else if (huskylens.isAppear(0, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            basic.showIcon(IconNames.SmallDiamond)
            basic.showIcon(IconNames.Diamond)
            basic.showIcon(IconNames.Target)
        }
    }
    basic.showString("Bye")
}
input.onGesture(Gesture.FreeFall, function () {
    for (let index = 0; index < 4; index++) {
        music.playMelody("C5 - C5 - C5 - C5 - ", 130)
    }
    basic.showString("Hello!")
})
input.onGesture(Gesture.LogoDown, function () {
    music.setVolume(127)
    music.startMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Forever)
    basic.showString("enjoy~")
})
input.onGesture(Gesture.ScreenDown, function () {
    Num = 1
})
function Light () {
    basic.showNumber(input.lightLevel())
    if (input.lightLevel() > 200) {
        basic.showLeds(`
            . # # # .
            . # # # .
            # # # # #
            . . . . .
            . # . # .
            `)
        basic.showString("SunCream!")
    } else if (input.lightLevel() > 100) {
        basic.showIcon(IconNames.Happy)
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.soaring), SoundExpressionPlayMode.UntilDone)
    } else if (input.lightLevel() >= 0) {
        basic.showLeds(`
            . . # # .
            . . . # #
            # . # # #
            # # # # #
            . # # # .
            `)
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.twinkle), SoundExpressionPlayMode.UntilDone)
    }
    basic.showIcon(IconNames.Happy)
}
input.onButtonPressed(Button.AB, function () {
    Num = 0
    Object_Classification()
})
input.onButtonPressed(Button.B, function () {
    Light()
})
input.onGesture(Gesture.LogoUp, function () {
    music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
    basic.showString("Hello!")
})
function Good () {
    basic.showIcon(IconNames.Happy)
    basic.pause(1000)
    basic.showString("Good Choice")
}
let Num = 0
let temperature = 0
basic.showIcon(IconNames.Happy)
basic.showString("Hello!")
basic.forever(function () {
    temperature = input.temperature()
})
