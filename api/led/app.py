import led.parse		
import led.animation_type

class LEDApp:
    def __init__(self, led_driver):
        self.led_driver = led_driver
        self.animation = None
        self.animation_name = None

    def set_animation(self, animation):
        # Set class metadata
        self.animation = animation
        self.animation_name = led.animation_type.from_instance(animation)
        # Acquire mutex
        self.led_driver.resource_lock.acquire()
        # Set animation
        self.led_driver.animation = animation
        # Set animation name
        self.animation_name = led.animation_type.from_instance(animation)
        # Clear existing pixels to reset animation
        self.led_driver.clear()
        # Release mutex
        self.led_driver.resource_lock.release()

    def get_animation(self):
        return self.animation_name

	def request_animation(self, request):
        animation = led.parse.resolve_animation(request, self.led_driver.pixels)
        self.set_animation(animation)