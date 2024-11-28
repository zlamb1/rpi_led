from adafruit_led_animation.animation import Animation
from adafruit_led_animation.color import BLACK


class Sweep(Animation):
    def __init__(self, pixel_object, speed, color, name=None):
        self._size = 0
        super().__init__(pixel_object, speed, color, name=name)

    on_cycle_complete_supported = True

    def draw(self):
        num_pixels = len(self.pixel_object)
        wrapped = self._size >= num_pixels

        self.pixel_object[self._size % num_pixels] = BLACK if wrapped else self.color

        self._size += 1
        if self._size >= num_pixels * 2:
            self.cycle_complete = True
            self.reset()

    def reset(self):
        self._size = 0
