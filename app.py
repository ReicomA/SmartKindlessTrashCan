import json
from flask import Flask, render_template
from random import random
from flask import Flask, render_template, make_response

from api.driver.sensor.sensor import *
from api.driver.sensor.sensor_label import *
from api.receive_thread import *

"""
    values: host, ip
"""
app = Flask(__name__)
HOST = "0.0.0.0"
PORT = 8080
ARDUINO_PORT = '/dev/ttyUSB0'

sensor_thread = ReceiveThread(ARDUINO_PORT, (1,))
sensor_thread.start_receive()

@app.route('/')
def home():
    return render_template("index.html")

"""
    Sensor Receiver
    1. 온도
    2. 습도
    3. 메탄(가스)
    4. 기울기
"""
@app.route('/sensor/<sensor>')
def receive_data_from_sensor(sensor):

    all_data = sensor_thread.data
    
    if sensor == "temp": # 온도 체크

        #온도 값 불러오기
        #temp = random() * 100
        temp = all_data[NAME_TEMP]
        

        # 적정 수치가 맞는지 계산.....
        # TODO 수식 써야됨
        
        isWarning = True

        data = (temp, isWarning)
        response = make_response(json.dumps(data))
        response.content_type = 'application/json'
        return response

    elif sensor == "humi": # 습도 체크
        humi = random() * 10

        # 적정 수치가 맞는 지 계산
        # TODO 수식 써야됨..
        
        isWarning = True

        data = (humi, isWarning)

        response = make_response(json.dumps(data))
        response.content_type = 'application/json'
        return response

    elif sensor == "gas": # 가스 체크

        gas = random() * 10
        isWarning = True

        data = (gas, isWarning)
        response = make_response(json.dumps(data))
        response.content_type = 'application/json'
        return response
        
    elif sensor == "xiro": # 자이로스코프 체크

        data = random() * 10
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
    
    
