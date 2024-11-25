import led.parse

class LEDApp:
    def __init__(self, driver):
        self.driver = driver
        self.animation = None
        self.animation_name = None

    def set_animation(self, animation):
        # Set class metadata
        self.animation = animation
        self.animation_name = led.animation_type.from_instance(animation)
        # Acquire mutex
        self.driver.resource_lock.acquire()
        # Set animation
        self.driver.set_animation(animation)
        # Set animation name
        self.animation_name = led.animation_type.from_instance(animation)
        # Clear existing pixels to reset animation
        self.driver.clear()
        # Release mutex
        self.driver.resource_lock.release()

    def get_animation(self):
        return self.driver.animation_name

    def request_animation(self, request):
        animation = led.parse.resolve_animation(request, self.driver.pixels)
        self.set_animation(animation)