/*** SensorValueLoggingToCSV Z-Way Home Automation ***************************

 Version: 1.0.1
 (c) Z-Wave.Me, 2019

 -----------------------------------------------------------------------------
 Author: Alexander Belov <baa@z-wave.me> 
 Description:
    This script only give you JS API to download CSV with all sensor data from 
    SensorValueLogging which you save in JSON.
    
    Installation:
        1. Place this file into /opt/z-way-server/automation/
        2. Open /opt/z-way-server/automation/main.js and paste 
           'executeFile("GetCSV.js");' before last brace
        3. Restart z-way server or reboot device
        
    To download CSV file you should open next link:
       razberry_ip:port/GetCSV

******************************************************************************/

ws.revokeExternalAccess("GetCSV");
ws.allowExternalAccess("GetCSV", controller.auth.ROLE.ANONYMOUS);

global["GetCSV"] = function(url, request) {
        var list = loadObject("__storageContent");
        var csv = "id,name,room,timestamp,value\n";
        
        list.forEach(function(file) {
            if (file.match(/SensorValueLogging/)) {
                var sensorData = loadObject(file);
                var id = sensorData.deviceId;
                csv += sensorData.sensorData.map(function(row) {
                    return id + "," + row.deviceName + "," + row.location + "," + row.time + "," + row.value;
                }).join('\n');
                csv += "\n";
            }
        });
        
        return {
                status: 200,
                headers: {
                        "Content-Type": "text/csv",
                        "Content-Disposition": "attachment; filename=" + "sensor.csv",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": "Authorization",
                        "Connection": "keep-alive"
                },
                body: csv
        };
};
