from motor import Motor
from RPI.GPIO as GPIO

class CoverMotor(Motor):
    def __init__(self, pin):
        self.motor = None

        #GPIO Set
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(pin, GPIO.OUT)

        self.motor = GPIO.PWM(pin, 50)
        self.motor.start(0)

    def left(self):
        self.motor.ChangeDutyCircle(2)
    
    def right(self):
        self.motor.ChangeDutyCircle(9)