from .driver.sensor.sensor import *
from .driver.sensor.sensor_label import *
import threading

class ReceiveThread():

    def __init__(self, port, args):

        self.sensor = SensorReceiver(port)
        self.thread_args = args # Thread 실행용
        self.data = None
        self.thread_engine = threading.Thread(target=self.thread_method, args=args)
    

    def thread_method(self, i):
        while True:
            self.data = self.sensor.receive_data()

    def start_receive(self):
        self.thread_engine.start()

"""
if __name__ == "__main__":
    t = ReceiveThread('COM3',(1,))
    t.start_receive()
    while True:
        pass
"""
