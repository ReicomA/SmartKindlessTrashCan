import RPi.GPIO as GPIO
import time

class FilterMotor():
    def __init__(self, pin):
        GPIO.setup(pin, GPIO.OUTPUT)
        self.pin = pin
    
    def start_filtering(self):
        GPIO.output(self.pin, True)
    def stop_filtering(self):
        GPIO.output(self.pin, False)