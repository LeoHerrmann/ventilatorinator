# TODO
# Irgendwie die Sache mit SCSS hinkriegen
# Animation: Beschleunigen / Verzögern der Blades anstatt sie direkt auf die Zielgeschwindigkeit zu setzen


from flask import Flask, render_template

app = Flask(__name__)


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
    elif fan_state == "OFF":
        fan_state = "ON"

    return "New state: " + fan_state
    

@app.route("/set_speed/<speed>")
def set_speed(speed):
    global fan_speed
    
    fan_speed = speed
    return "New speed: " + fan_speed
