import led.animation_type
import led.parse

scolor_animations = ["solid", "blink", "pulse", "sparkle_pulse", "grid_rain"]


class LEDApp:
    def __init__(self, driver):
        self.driver = driver

    @property
    def animation(self):
        return self.driver.animation

    @animation.setter
    def animation(self, animation):
        # Acquire mutex
        self.driver.resource_lock.acquire()
        # Set animation
        self.driver.set_animation(animation)
        # Clear existing pixels to reset animation
        self.driver.clear()
        # Release mutex
        self.driver.resource_lock.release()

    def get_animation_descriptor(self, animation=None):
        descriptor = {}
        animation = animation or self.animation

        if animation is None:
            descriptor["animation_name"] = "null"
            descriptor["speed"] = 0
            descriptor["is_playing"] = False
            return descriptor

        name = led.animation_type.from_instance(animation)
        descriptor["animation_name"] = name
        descriptor["speed"] = animation.speed
        descriptor["is_playing"] = not animation._paused

        if name in scolor_animations:
            descriptor["color"] = animation.color

        # Comet and Sparkle override _set_color which prevents us from being able to set the color property
        if name == "comet":
            descriptor["color"] = animation._computed_color
        if name == "sparkle":
            descriptor["color"] = animation._sparkle_color

        if name == "chase" or name == "rainbow_chase":
            descriptor["size"] = animation._size
            descriptor["spacing"] = animation._spacing
            descriptor["reverse"] = animation.reverse

        if name == "comet" or name == "rainbow_comet":
            descriptor["tail_length"] = animation._tail_length
            descriptor["reverse"] = animation.reverse
            descriptor["bounce"] = animation.bounce
            descriptor["ring"] = animation.ring

        if name == "pulse" or name == "sparkle_pulse":
            descriptor["period"] = animation._period
            descriptor["breath"] = animation.breath
            descriptor["min_intensity"] = animation.min_intensity
            descriptor["max_intensity"] = animation.max_intensity

        if name == "sparkle" or name == "rainbow_sparkle":
            descriptor["num_sparkles"] = animation._num_sparkles

        if name == "rainbow":
            descriptor["period"] = animation._period
            descriptor["step"] = animation._step

        if name == "rainbow_comet":
            descriptor["colorwheel_offset"] = animation._colorwheel_offset

        if name == "rainbow_sparkle":
            descriptor["period"] = animation._period
            descriptor["step"] = animation._step
            descriptor["background_brightness"] = animation._background_brightness

        if name == "grid_rain":
            descriptor["count"] = animation._count
            descriptor["length"] = animation._length
            descriptor["bg_color"] = animation._background

        return descriptor

    def get_default_descriptor(self, name):
        animation = led.parse.resolve_animation({"animation_name": name}, self.driver.pixels)
        return self.get_animation_descriptor(animation)

    def request_animation(self, request):
        animation = led.parse.resolve_animation(request.form, self.driver.pixels)
        self.animation = animation
        return self.get_animation_descriptor()
