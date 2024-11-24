from flask import Flask, request
from flask-cors import CORS

from led.light_driver import LightDriver
from led.app import LEDApp

pixels = LightDriver(num_pixels = 300)
led_app = LEDApp(pixels)

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return "<h1>Hello!</h1>"

@app.route("/api/animation", methods=['POST'])
def animation():
    led_app.request_animation(request)
    return { "status": 200 }
