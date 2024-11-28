from adafruit_led_animation.animation import Animation
from adafruit_led_animation.color import BLACK


class Sweep(Animation):
    def __init__(self, pixel_object, speed, color, name=None):
        self._size = 0
        self._direction = 0
        super().__init__(pixel_object, speed, color, name=name)

    def draw(self):
        num_pixels = len(self.pixel_object)
        for i in range(num_pixels):
            self.pixel_object[i] = BLACK if i > self._size else self.color

        self._size += 1
        if self._size >= num_pixels:
            self._size = 0
