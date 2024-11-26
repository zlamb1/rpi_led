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
    descriptor = led_app.get_default_descriptor(name)
    # the default descriptor is not playing
    descriptor["is_playing"] = False
    return descriptor

@app.route("/api/animation/resume", methods=['POST'])
def play_animation():
    animation = led_app.animation
    if animation is None:
        return {"status": 404}
    animation.resume()
    return led_app.get_animation_descriptor()

@app.route("/api/animation/pause", methods=['POST'])
def pause_animation():
    animation = led_app.animation
    if animation is None:
        return {"status": 404}
    animation.freeze()
    return led_app.get_animation_descriptor()

@app.route("/api/animation", methods=['POST'])
def post_animation():
    return led_app.request_animation(request)
