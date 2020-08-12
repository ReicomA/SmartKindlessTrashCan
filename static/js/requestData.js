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
// xiro Data
function requestXiroData() {
    $.ajax({
        url: '/sensor/xiro',
        success: function(point) {
            // write html functions
            $('#xiro_value').text(point);
        },
        cache: false
    });
}

function requestFunction() {
    requestTempData();
    requestHumiData();
    requestXiroData();
    requestGasData();

    setTimeout(requestFunction, 500);

}

$(document).ready(function() {
    requestFunction();
});