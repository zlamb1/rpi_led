import neopixel, board, threading, time, led.animation_type

from adafruit_led_animation.animation.rainbow import Rainbow

def def_anim(pixels):
	return Rainbow(pixels, speed=0.1, period=2)

class LEDDriver:
	def __init__(self, num_pixels, get_def_anim=def_anim):
		self.pixels = neopixel.NeoPixel(
			board.D18, num_pixels, auto_write = False, 
			brightness=0.1, pixel_order = neopixel.RGB)
		self.animation = None
		self.animation_name = None
		self.set_animation(get_def_anim(self.pixels))
		self.lastFrame = 0
		self.resource_lock = threading.Lock()
		# init render loop
		self.thread = threading.Thread(target = self.led_loop)
		self.thread.start()

	def set_animation(self, animation):
		self.animation = animation
		self.animation_name = led.animation_type.from_instance(animation)

	def led_loop(self):
		while True:
			self.update()
	
	def clear(self):
		self.pixels.fill((0,0,0))
		self.pixels.show()
	
	def update(self):
		delta = time.perf_counter() - self.lastFrame
		if (1/60) < delta:
			self.resource_lock.acquire()
			self.animation.animate()
			self.pixels.show()
			self.resource_lock.release()
			self.lastFrame = time.perf_counter()
