// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

function info() {
    alert('Device Name: '     + device.name     + '\n' +
        'Device Cordova: '  + device.cordova + '\n' +
        'Device Platform: ' + device.platform + '\n' +
        'Device UUID: '     + device.uuid     + '\n' +
        'Device Model: '    + device.model     + '\n' +
        'Device Version: '  + device.version  + '\n');
}
