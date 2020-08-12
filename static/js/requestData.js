// Receive Functions

// temp Data
function requestTempData() {
    $.ajax({
        url: '/sensor/temp',
        success: function(point) {
            
            $('#temp_value').text(point);
        },
        cache: false
    });
}

// humi Data
function requestHumiData() {
    $.ajax({
        url: '/sensor/humi',
        success: function(point) {
            // write html functions
            $('#humi_value').text(point);
        },
        cache: false
    });
}
// gas Data
function requestGasData() {
    $.ajax({
        url: '/sensor/gas',
        success: function(point) {
            // write html functions
            $('#gas_value').text(point);
        },
        cache: false
    });
}
// water Data
function requestWaterData() {
    $.ajax({
        url: '/sensor/water',
        success: function(point) {
            // write html functions
            $('#water_value').text(point);
        },
        cache: false
    });
}
function requestSonicData() {
    $.ajax({
        url: '/sensor/sonic',
        success: function(point) {
            $('#sonic_value').text(point)
        },
        cache: false
    });
}

function requestFunction() {

    debugger;
    requestTempData();
    requestHumiData();
    requestWaterData();
    requestGasData();
    requestSonicData();

    setTimeout(requestFunction, 500);

}

$(document).ready(function() {
    requestFunction();
});