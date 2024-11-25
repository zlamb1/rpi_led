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

    def get_animation_descriptor(self):
        descriptor = {}
        animation = self.driver.animation

        if animation is None:
            descriptor["animation_name"] = "null"
            descriptor["speed"] = 0
            return descriptor

        name = self.driver.animation_name
        descriptor["animation_name"] = name
        descriptor["speed"] = animation.speed

        if name == "solid" or name == "blink" or name == "comet" or name == "pulse" or name == "sparkle" or name == "sparkle_pulse":
            descriptor["color"] = animation.color

        if name == "chase" or name == "rainbow_chase":
            descriptor["size"] = animation._size
            descriptor["spacing"] = animation._spacing
            descriptor["reverse"] = animation.reverse

        if name == "comet" or name == "rainbow_comet":
            descriptor["tail_length"] = animation._tail_length
            descriptor["reverse"] = animation.reverse
            descriptor["bounce"] = animation.bounce
            descriptor["ring"] = animation.ring

        if name == "pulse":
            descriptor["period"] = animation._period
            descriptor["breath"] = animation.breath
            descriptor["min_intensity"] = animation.min_intensity
            descriptor["max_intensity"] = animation.max_intensity

        if name == "rainbow":
            descriptor["period"] = animation._period
            descriptor["step"] = animation._step

        if name == "rainbow_comet":
            descriptor["colorwheel_offset"] = animation._colorwheel_offset

        return descriptor

    def request_animation(self, request):
        animation = led.parse.resolve_animation(request, self.driver.pixels)
        self.set_animation(animation)
        return self.get_animation_descriptor()
