from flask import Flask, request
from flask_cors import CORS

from led.driver import LEDDriver
from led.app import LEDApp

pixels = LEDDriver(num_pixels = 200)
led_app = LEDApp(pixels)

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return "<h1>Hello!</h1>"

@app.route("/api/animation", methods=['GET'])
def get_animation():
    return led_app.get_animation_descriptor()

@app.route("/api/animation/descriptor/<name>", methods=['GET'])
def get_default_descriptor(name):
    return led_app.get_default_descriptor(name)

@app.route("/api/animation", methods=['POST'])
def post_animation():
    return led_app.request_animation(request)
