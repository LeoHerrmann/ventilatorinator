# TODO
# Irgendwie die Sache mit SCSS hinkriegen
# Animation: Beschleunigen / Verzögern der Blades anstatt sie direkt auf die Zielgeschwindigkeit zu setzen
# Raspberry Pi GPIO-Pins ansteuern

from flask import Flask, render_template
import RPi.GPIO

app = Flask(__name__)

fan_pin = 17
GPIO.setmode(BCM)
GPIO.setup(fan_pin, GPIO.OUT)
#fan_pwm = GPIO.PWM(fan_pin, 0.5) #Frequenz muss eventuell angepasst werden

fan_state = "OFF"
fan_speed = 50


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get_state")
def get_state():
    return fan_state


@app.route("/get_speed")
def get_speed():
    return str(fan_speed)


@app.route("/toggle")
def toggle():
    global fan_state

    if fan_state == "ON":
        fan_state = "OFF"
        GPIO.output(fan_pin, GPIO.LOW)
		# fan_pwm.start(fan_speed) #Wenn wir das benutzen wollen, muss die Zeile darüber auskommentiert werden
    elif fan_state == "OFF":
        fan_state = "ON"
        GPIO.output(fan_pin, GPIO.HIGH)
		# fan_pwm.stop() #Wenn wir das benutzen wollen, muss die Zeile darüber auskommentiert werden

    return "New state: " + fan_state
    

@app.route("/set_speed/<speed>")
def set_speed(speed):
    global fan_speed
    
    fan_speed = speed
    return "New speed: " + fan_speed
