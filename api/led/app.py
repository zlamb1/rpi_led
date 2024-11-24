import led.parse		

class LEDApp:
	def __init__(self, led_driver):
		self.led_driver = led_driver

	def get_animation():
        return "blink"

	def request_animation(self, request):
		animation = led.parse.resolve_animation(request, self.led_driver.pixels)
		self.led_driver.resource_lock.acquire()
		self.led_driver.animation = animation
		# clear existing pixels to reset animation
		self.led_driver.clear()
		self.led_driver.resource_lock.release()
