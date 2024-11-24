import neopixel, board, threading, time

from adafruit_led_animation.animation.rainbow import Rainbow

class LightDriver:
	def __init__(self, num_pixels):
		self.pixels = neopixel.NeoPixel(
			board.D18, num_pixels, auto_write = False, 
			brightness=0.1, pixel_order = neopixel.RGB)
		self.animation = Rainbow(self.pixels, speed=0.1, period=2)
		self.lastFrame = 0
		self.resource_lock = threading.Lock()
		# init render loop
		self.thread = threading.Thread(target = self.led_loop)
		self.thread.start()
		
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
