from flask import Flask, request

from led.light_driver import LightDriver
from led.app import LEDApp

pixels = LightDriver(num_pixels = 300)
led_app = LEDApp(pixels)

app = Flask(__name__)

@app.route("/api/animation", methods=['POST'])
def animation():
    led_app.request_animation(request)
    return { "status": 200 }

@app.after_request
def setup_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Requested-With"
    return response
