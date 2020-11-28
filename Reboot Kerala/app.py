
"""Web Application in Python using Flask mini web-dev suite"""
"""Importing required Libraries"""

import numpy as np
import serial
from flask import Flask, request, jsonify, render_template
import pickle

"""Application is defined"""
app = Flask(__name__)

"""The inputs from Arduino is feed directly into python using a python module called 'serial'.
The port dev/ttyACM0 is activated and inputs has started flowing."""

#ser = serial.Serial('/dev/ttyACM0', 9600)
#ser.flushInput()

for i in range(20):

    """Since we have multiple inputs in series, we take a _for_loop_ with number of amount of serial variables coming as 
    input. This is because while we can take serial data there is a chance in the port where the variables will take junk
    data, which is unneccesary. So in order to eliminate that we will convert input datas into sole _utf-8_ encoding. It 
    will makes sure that junk values are omitted."""

    #ser_bytes = ser.readline()
    #serial_data = int(ser_bytes.decode("utf-8"))
    #"""print(serial_data)"""

    """ -- omitted --
    if i%3 ==0:
        sound = "Sound Level: {} dB".format(serial_data)
        if int(sound) > 60:
            warning1 = sound + 'Warning!.. Exceeds Sound Limit'
        #print(sound)"""

    """Since there is only two values, we will take reminder of division of two inorder to split the data"""
    #if i % 2 == 0:
    #    water = serial_data

    #if i % 2 == 1:
    #    vibration = serial_data

    """warning_1 = "Warning! Water Level Increasing"
    if int(vibration) > 30:
        warning_2 = "Warning! Vibration Level Increasing"""
"""Application root is defined & index page is loaded"""
@app.route('/')
def home():
    """if water > 909:
        warn = "Warning! Water Level Increases"

    if vibration > 2:
        warn = "Warning! Vibration Level Increases"

    if water <= 905 and vibration <= 2:
        warn = "Normal Level"""

    return render_template('index2.html')# , water_text='{}'.format(water), vibration_text='{}'.format(vibration), warn_text='{}'.format(warn))


""" -- omitted --
@app.route('/home/update')
def home():
    return render_template('index2.html', water_text='{}'.format(water_update), vibration_text='{}'.format(vib_update))
    #, vibration_warn='{}'.format(warning1), water_warn='{}'.format(warning2))"""


"""Start Debugging"""
if __name__ == "__main__":
    app.run(debug=True)
