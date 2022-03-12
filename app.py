#TODO
#Entsprechende Routes Aufrufen, wenn Schalter betätigt werden
#Irgendwie die Sache mit SCSS hinkriegen

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")
    return "Hello"
