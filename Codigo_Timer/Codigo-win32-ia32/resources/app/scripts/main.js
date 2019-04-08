$(document).ready(function () {
    var flag, finalHour, finalMin, finalSec, timerValue
    flag = finalHour = finalMin = finalSec = timerValue = 0

    $.ajax({
        url: "extract.txt",
        dataType: "text",
        success: function (data) {
            timerValue = Number(data)
            finalHour = Math.floor(timerValue / 3600)
            finalMin = Math.floor((timerValue - (3600 * finalHour)) / 60)
            finalSec = Math.floor(timerValue - (3600 * finalHour) - (60 * finalMin))
        },
        failure: function (err) {
            console.log(err)
        }
    })

    var timeRemaining = setInterval(function () {
        timerValue = finalHour * 3600 + finalMin * 60 + finalSec
        if (timerValue == 10)
            $("#timer").css({ 'color': 'red', 'animation': 'blink 1s linear infinite' })
        $("#timer").html(doubleDigit(finalHour) + ":" + doubleDigit(finalMin) + ":" + doubleDigit(finalSec))
        /*if (finalSec == 0 && finalMin != 0) {
            finalMin = finalMin - 1
            finalSec = 59
        }
        else if (finalMin == 0 && finalHour != 0) {
            finalMin = 59
            finalHour = finalHour - 1
        }*/
        if (timerValue <= 0) {
            clearInterval(timeRemaining)
            flag = 1
            window.close()
        }
        finalSec = finalSec - 1
	if (finalSec < 0){
		finalMin = finalMin - 1
		finalSec = 59
	}
	if (finalMin < 0){
		finalHour = finalHour - 1
		finalMin = 59
	}

    }, 1000);

    function doubleDigit(num) {
        return (num < 10 ? '0' : '') + num
    }

    window.onbeforeunload = (event) => {
        if (flag == 0)
            event.returnValue = false
    }
})