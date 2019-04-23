# SensorValueLoggingToCSV
Z-Way Home Automation script

## Description
   This script only give you JS API to download CSV with all sensor data from 
   SensorValueLogging which you save in JSON.

## Installation
1. Place this file into /opt/z-way-server/automation/
2. Open /opt/z-way-server/automation/main.js and paste ```'executeFile("GetCSV.js");'``` before last brace
3. Restart z-way server or reboot device

## Note
   Don't forget to update your SensorValue Logging module

To download CSV file you should open next link:
   razberry_ip:port/GetCSV
