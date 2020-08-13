from abc import *
from serial import Serial

from . import sensor_label
#import sensor_label
class SensorReceiver():
    """
        온도-습도-가스-수위-기울기
    """
    def __init__(self, dev_root):
        self.dev_root = dev_root
        self.raw_receiver = Serial(dev_root, 9600)

    def raw_receive(self):
        return self.raw_receiver.readline().decode('utf-8')
    
    # final receive
    def receive_data(self):
        raw_data = self.raw_receive()
        raw_data = raw_data.split('-')

        # 마지막 개행문자 짜르기
        final_data = raw_data[len(raw_data)-1]
        new_data = ""
        for i in range(0, len(final_data) - 2):
            new_data += final_data[i]
        
        del raw_data[len(raw_data) - 1]
        raw_data.append(new_data)

        # 데이터 구조를 Set으로 변경
        result_data = {}
        result_data[sensor_label.NAME_TEMP] = float(raw_data[0])
        result_data[sensor_label.NAME_HUMI] = float(raw_data[1])
        result_data[sensor_label.NAME_GAS] = float(raw_data[2])
        result_data[sensor_label.NAME_WATER] = float(raw_data[3])
        result_data[sensor_label.NAME_SONIC] = float(raw_data[4])
        print(result_data)

        return result_data

if __name__ == "__main__":
    s = SensorReceiver('COM3')
    while True:
        data = s.receive_data()
        print(data)

    