import adafruit_led_animation.color as Color
from adafruit_led_animation.animation.blink import Blink
from adafruit_led_animation.animation.solid import Solid
from adafruit_led_animation.animation.chase import Chase
from adafruit_led_animation.animation.comet import Comet
from adafruit_led_animation.animation.pulse import Pulse
from adafruit_led_animation.animation.rainbow import Rainbow
from adafruit_led_animation.animation.sparkle import Sparkle
from adafruit_led_animation.animation.rainbowchase import RainbowChase
from adafruit_led_animation.animation.rainbowcomet import RainbowComet
from adafruit_led_animation.animation.rainbowsparkle import RainbowSparkle
from adafruit_led_animation.animation.sparklepulse import SparklePulse

def parse_bool(b):
	try:
		return bool(b)
	except Exception:
		return False

def parse_int(i):
	try:
		return int(i)
	except Exception:
		return None

def parse_float(f):
	try:
		return float(f)
	except Exception:
		return None
		
def parse_color(color):
	# convert hex color to rgb tuplef
	if type(color) == str:
		hex_str = color.replace('#', '').lower()
		if len(hex_str) == 6:
			rgb = [0, 0, 0]
			for i in range(0, 6, 2):
				rgb[int(i / 2)] = int(hex_str[i:i + 2], 16)
			return tuple(rgb)
	return None

def clamp(value, _min, _max):
	return min(max(value, _min), _max)

def resolve_animation(request, pixels):
	form = request.form
	# parse fields
	name = form['animation_name'].lower() if 'animation_name' in form else 'solid'
	speed = parse_float(form['speed']) if 'speed' in form else 0.1
	background_brightness = parse_float(form['background_brightness']) if 'background_brightness' in form else 0.2
	min_intensity = clamp(parse_float(form['min_intensity']), 0, 1) if 'min_intensity' in form else 0
	max_intensity = clamp(parse_float(form['max_intensity']), 0, 1) if 'max_intensity' in form else 1
	color = parse_color(form['color']) if 'color' in form else (255, 255, 255)
	bg_color = parse_color(form['bg_color']) if 'bg_color' in form else (0, 0, 0)
	tail_length = parse_int(form[tail_length]) if 'tail_length' in form else None
	size = parse_int(form['size']) if 'size' in form else 2
	spacing = parse_int(form['spacing']) if 'spacing' in form else 3
	period = parse_int(form['period']) if 'period' in form else 5
	step = parse_int(form['step']) if 'step' in form else None
	num_sparkles = parse_int(form['num_sparkles']) if 'num_sparkles' in form else None
	colorwheel_offset = parse_int(form['colorwheel_offset']) if 'colorwheel_offset' in form else None
	reverse = parse_bool(form['reverse']) if 'reverse' in form else False
	bounce = parse_bool(form['bounce']) if 'bounce' in form else False
	ring = parse_bool(form['ring']) if 'ring' in form else False
		
	if name == 'blink':
		return Blink(pixels, speed, color)
	if name == 'solid':
		return Solid(pixels, color)
	if name == 'chase':
		return Chase(pixels, speed, color, size = size, spacing = spacing, reverse = reverse)
	if name == 'comet':
		if tail_length is None:
			tail_length = 0
		return Comet(pixels, speed, color, background_color=bg_color,
			tail_length=tail_length, reverse=reverse, bounce=bounce, ring=ring)
	if name == 'pulse':
		return Pulse(pixels, speed, color, period=period)
	if name == 'rainbow':
		if step is None:
			step = 1
		return Rainbow(pixels, speed, period=period, step=step)
	if name == 'sparkle':
		if num_sparkles is None:
			num_sparkles = 1
		return Sparkle(pixels, speed, color, num_sparkles=num_sparkles)
	if name == 'rainbow_chase':
		if step is None:
			step = 8
		return RainbowChase(pixels, speed, size=size, spacing=spacing, 
			reverse=reverse, step=step)
	if name == 'rainbow_comet':
		if tail_length is None:
			tail_length = 10
		if step is None:
			step = 0
		return RainbowComet(pixels, speed, tail_length=tail_length, 
			reverse=reverse, bounce=bounce, colorwheel_offset=colorwheel_offset, 
			step=step, ring=ring)
	if name == 'rainbow_sparkle':
		if step is None:
			step = 1
		return RainbowSparkle(pixels, speed, period=period, 
			num_sparkles=num_sparkles, step=step, 
			background_brightness=background_brightness)
	if name == 'sparkle_pulse':
		return SparklePulse(pixels, speed, color, period=period, 
			max_intensity=max_intensity, min_intensity=min_intensity)
	
	# return default animation
	return Solid(pixels, Color.WHITE)