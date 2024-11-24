import time, os
import soundcard as soundcard

if __name__ == '__main__':
    time.sleep(1)

    mics = soundcard.all_microphones(include_loopback = True)
    default_mic = None

    speakers = soundcard.all_speakers()

    for mic in mics:
        print(mic)