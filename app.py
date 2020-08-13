import json
from flask import Flask, render_template
from random import *
from flask import Flask, render_template, make_response

from api.driver.sensor.sensor import *
from api.driver.sensor.sensor_label import *
from api.receive_thread import *
from api.driver.motor.cover_motor import *
from api.driver.motor.filter_motor import *

import time

# WarningClass
class WarningFlag:
    def __init__(self):
        self.temp = False
        self.humi = False
        self.gas = False
        self.water = False
        self.sonic = False

        self.isCoverMotorUsing = False
        self.isFilterMotorUsing = False
    
    # 필터 작동 여부
    def check_filter_must_be_working(self):
        now_woking = (self.temp or self.humi or self.gas)
        
        # 작동 시작
        if now_woking is True:
            if self.isFilterMotorUsing is False:
                print("Filter On")
                self.isFilterMotorUsing = now_woking
                # TODO 필터 작성 시작
                return "Filter On"

        # 작동 중지
        if now_woking is False:
            if self.isFilterMotorUsing is True:
                print("Filter Off")
                self.isFilterMotorUsing = now_woking
                # TODO 필터 작동 중지
                return "Filter Off"

        self.isFilterMotorUsing = now_woking


    def check_cover_must_be_open(self):
        now_woking = self.water

        if now_woking is True:
            if self.isCoverMotorUsing is False:
                print("Cover On")
                # TODO 뚜껑 여는 코드 작성
                self.isCoverMotorUsing  = now_woking
                return "Cover On"
        
        if now_woking is False:
            if self.isCoverMotorUsing is True:
                print("Cover Off")
                # TODO 뚜껑 닫는 코드 작성
                self.isCoverMotorUsing  = now_woking
                return "Cover Off"

        self.isCoverMotorUsing = now_woking
        
"""
    values: host, ip
"""
app = Flask(__name__)
HOST = "0.0.0.0"
PORT = 8080
ARDUINO_PORT = '/dev/ttyUSB0'

cover_motor = CoverMotor(26)
filter_motor = FilterMotor(17)

sensor_thread = ReceiveThread(ARDUINO_PORT, (1,))
sensor_thread.start_receive()

warning_flag = WarningFlag()

@app.route('/')
def home():
    return render_template("index.html")

"""
    Sensor Receiver
    1. 온도
    2. 습도
    3. 메탄(가스)
    4. 수위
    5. 초음파
"""
@app.route('/sensor/<sensor>')
def receive_data_from_sensor(sensor):

    all_data = None

    while all_data == None:
        sensor_thread.mutex.acquire()
        all_data = sensor_thread.data
        sensor_thread.mutex.release()
        time.sleep(0.01)
    
    print(all_data)
    
    if sensor == "temp": # 온도 체크
        temp = 0
        #온도 값 불러오기
        #temp = random() * 100
        try:
            temp = all_data[NAME_TEMP]
        except Exception:
            temp = 25

        # 한계치 확인        
        if temp >= WARN_TEMP:
            warning_flag.temp = True
        else:
            warning_flag.temp = False

        # 작동 여부 확인        
        filter_on = warning_flag.check_filter_must_be_working()
        cover_on = warning_flag.check_cover_must_be_open()

        # Javascript에 결과를 보내기 위한 준비
        if filter_on == None:
            filter_on = "null"
        if cover_on == None:
            cover_on = "null"

        if cover_on == "Cover On":
            cover_motor.left()
        elif cover_on == "Cover Off":
            cover_motor.right()

        data = (temp, filter_on, cover_on)

        response = make_response(json.dumps(data))
        response.content_type = 'application/json'
        return response

    elif sensor == "humi": # 습도 체크
        
        humi = 0
        try:
            humi = all_data[NAME_HUMI]
        except Exception:
            humi = 50

        # 한계치 확인
        if humi >= WARN_HUMI:
            warning_flag.humi = True
        else:
            warning_flag.humi = False
        
        filter_on = warning_flag.check_filter_must_be_working()
        cover_on = warning_flag.check_cover_must_be_open()
        
        if filter_on == None:
            filter_on = "null"
        if cover_on == None:
            cover_on = "null"

        if cover_on == "Cover On":
            cover_motor.left()
        elif cover_on == "Cover Off":
            cover_motor.right()

        if filter_on == "Filter On":
            filter_motor.start_filtering()
        elif filter_on == "Filter Off":
            filter_motor.stop_filtering()

        data = (humi, filter_on, cover_on)

        response = make_response(json.dumps(data))
        response.content_type = 'application/json'
        return response

    elif sensor == "gas": # 가스 체크

        gas = 0
        try:
            gas = all_data[NAME_GAS]
        except Exception:
            gas = 450
        
        # 한계치 확인
        if gas >= WARN_GAS:
            warning_flag.gas = True
        else:
            warning_flag.gas = False

        filter_on = warning_flag.check_filter_must_be_working()
        cover_on = warning_flag.check_cover_must_be_open()

        if filter_on == None:
            filter_on = "null"
        if cover_on == None:
            cover_on = "null"

        if cover_on == "Cover On":
            cover_motor.left()
        elif cover_on == "Cover Off":
            cover_motor.right()
            
        if filter_on == "Filter On":
            filter_motor.start_filtering()
        elif filter_on == "Filter Off":
            filter_motor.stop_filtering()


        data = (gas, filter_on, cover_on)
        response = make_response(json.dumps(data))
        response.content_type = 'application/json'
        return response
        
    elif sensor == "water": # 수위센서

        water = 0
        try:
            water = all_data[NAME_WATER]
        except Exception:
            water = 5
        
        if water >= WARN_WATER:
            warning_flag.water = True
        else:
            warning_flag.water = False

        filter_on = warning_flag.check_filter_must_be_working()
        cover_on = warning_flag.check_cover_must_be_open()

        if filter_on == None:
            filter_on = "null"
        if cover_on == None:
            cover_on = "null"

        if cover_on == "Cover On":
            cover_motor.left()
        elif cover_on == "Cover Off":
            cover_motor.right()
            
        if filter_on == "Filter On":
            filter_motor.start_filtering()
        elif filter_on == "Filter Off":
            filter_motor.stop_filtering()

        data = (water, filter_on, cover_on)

        response = make_response(json.dumps(data))
        response.content_type = "application/json"
        return response

    elif sensor == "sonic":

        sonic = 0
        try:
            sonic = all_data[NAME_SONIC]
        except Exception:
            sonic = 15

        if sonic < WARN_SONIC:
            warning_flag.sonic = True
        else:
            warning_flag.sonic = False

        filter_on = warning_flag.check_filter_must_be_working()
        cover_on = warning_flag.check_cover_must_be_open()

        if filter_on == None:
            filter_on = "null"
        if cover_on == None:
            cover_on = "null"

        if cover_on == "Cover On":
            cover_motor.left()
        elif cover_on == "Cover Off":
            cover_motor.right()
            
        if filter_on == "Filter On":
            filter_motor.start_filtering()
        elif filter_on == "Filter Off":
            filter_motor.stop_filtering()

        data = (sonic, filter_on, cover_on)
        
        response = make_response(json.dumps(data))
        response.content_type = "application/json"

        return response
    else:
        return "ERR"


    

@app.route('/request/machine/<machine>')
def request_to_machine():
    pass


if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
    
    
