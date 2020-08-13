import RPI.GPIO as GPIO
import time

class CoverMotor:
    def __init__(self, pin):
        self.motor = None

        #GPIO Set
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(pin, GPIO.OUT)

        self.motor = GPIO.PWM(pin, 50)
        self.motor.start(0)

    def left(self):
        self.motor.ChangeDutyCycle(2)
    
    def right(self):
        self.motor.ChangeDutyCycle(9)


if __name__== "__main__":
    p = CoverMotor(19)
    p.left()
    time.sleep(1)
    p.right()