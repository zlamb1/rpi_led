from strenum import StrEnum

class AnimationType(StrEnum):
	BLINK = 'blink',
	SOLID = 'solid',
	CHASE = 'chase',
	COMET = 'comet',
	PULSE = 'pulse',
	RAINBOW = 'rainbow',
	SPARKLE = 'sparkle',
	RAINBOW_CHASE = 'rainbow_chase',
	RAINBOW_COMET = 'rainbow_comet',
	RAINBOW_SPARKLE = 'rainbow_sparkle',
	SPARKLE_PULSE = 'sparkle_pulse',
	MUSIC = 'music'

def from_class_name(class_name):
	parsed_class_name = ''
	# RainbowComet => rainbow_comet
	for i in range(len(class_name)):
		if i != 0 and class_name[i].isupper():
			parsed_class_name += '_'
		parsed_class_name += class_name[i].lower()
	
	return AnimationType(parsed_class_name)

def from_class(c):
	return from_class_name(c.__name__)

def from_instance(i):
	class_name = type(i).__name__
	return from_class_name(class_name)

