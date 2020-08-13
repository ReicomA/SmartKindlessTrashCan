// Receive Functions
/*
    index[0] = value
    index[1] = filter
    index[2] = cover
*/
// temp Data
function requestTempData() {
    $.ajax({
        url: '/sensor/temp',
        success: function(point) {
            
            $('#temp_value').text(point[0]);
            
            
            // Filter Check
            if(point[1] == "Filter On") {
                document.getElementById("filter_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/filter_on.png";

                $('#ventilator_btn').removeClass('btn-danger', {duration: 2000});
                $('#ventilator_btn').addClass('btn-success', {duration: 2000});
                $('#ventilator_btn').html('작동중');

            } else if(point[1] == "Filter Off") {

                
                document.getElementById("filter_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/filter_off.png";

                
                $('#ventilator_btn').removeClass('btn-success', {duration: 2000});
                $('#ventilator_btn').addClass('btn-danger', {duration: 2000});
        
                $('#ventilator_btn').html('작동 중지');

            }

            // Motor Check

            if(point[2] == "Cover On") {
                document.getElementById("cover_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/cover_off.png";
                $('#covered_btn').removeClass('btn-success');
                $('#covered_btn').addClass('btn-danger');
                $('#covered_btn').html('작동 중지');   

                
            } else if(point[2] == "Cover Off") {
                document.getElementById("cover_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/cover_on.png";
                $('#covered_btn').removeClass('btn-danger');
                $('#covered_btn').addClass('btn-success');
                $('#covered_btn').html('작동중');  
            }
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

                        // Filter Check
            if(point[1] == "Filter On") {
                document.getElementById("filter_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/filter_on.png";

                $('#ventilator_btn').removeClass('btn-danger', {duration: 2000});
                $('#ventilator_btn').addClass('btn-success', {duration: 2000});
                $('#ventilator_btn').html('작동중');

            } else if(point[1] == "Filter Off") {

                
                document.getElementById("filter_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/filter_off.png";

                
                $('#ventilator_btn').removeClass('btn-success', {duration: 2000});
                $('#ventilator_btn').addClass('btn-danger', {duration: 2000});
        
                $('#ventilator_btn').html('작동 중지');

            }

            // Motor Check

            if(point[2] == "Cover On") {
                document.getElementById("cover_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/cover_on.png";
                $('#covered_btn').removeClass('btn-danger');
                $('#covered_btn').addClass('btn-success');
                $('#covered_btn').html('작동중');
                
            } else if(point[2] == "Cover Off") {
                document.getElementById("cover_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/cover_off.png";
                $('#covered_btn').removeClass('btn-success');
                $('#covered_btn').addClass('btn-danger');
                $('#covered_btn').html('작동 중지');   
            }
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
            $('#gas_value').text(point[0]);

                        // Filter Check
            if(point[1] == "Filter On") {
                document.getElementById("filter_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/filter_on.png";

                $('#ventilator_btn').removeClass('btn-danger', {duration: 2000});
                $('#ventilator_btn').addClass('btn-success', {duration: 2000});
                $('#ventilator_btn').html('작동중');

            } else if(point[1] == "Filter Off") {

                
                document.getElementById("filter_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/filter_off.png";

                
                $('#ventilator_btn').removeClass('btn-success', {duration: 2000});
                $('#ventilator_btn').addClass('btn-danger', {duration: 2000});
        
                $('#ventilator_btn').html('작동 중지');

            }

            // Motor Check

            if(point[2] == "Cover On") {
                document.getElementById("cover_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/cover_on.png";
                $('#covered_btn').removeClass('btn-danger');
                $('#covered_btn').addClass('btn-success');
                $('#covered_btn').html('작동중');
                
            } else if(point[2] == "Cover Off") {
                document.getElementById("cover_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/cover_off.png";
                $('#covered_btn').removeClass('btn-success');
                $('#covered_btn').addClass('btn-danger');
                $('#covered_btn').html('작동 중지');   
            }
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

                        // Filter Check
            if(point[1] == "Filter On") {
                document.getElementById("filter_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/filter_on.png";

                $('#ventilator_btn').removeClass('btn-danger', {duration: 2000});
                $('#ventilator_btn').addClass('btn-success', {duration: 2000});
                $('#ventilator_btn').html('작동중');

            } else if(point[1] == "Filter Off") {

                
                document.getElementById("filter_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/filter_off.png";

                
                $('#ventilator_btn').removeClass('btn-success', {duration: 2000});
                $('#ventilator_btn').addClass('btn-danger', {duration: 2000});
        
                $('#ventilator_btn').html('작동 중지');

            }

            // Motor Check

            if(point[2] == "Cover On") {
                document.getElementById("cover_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/cover_on.png";
                $('#covered_btn').removeClass('btn-danger');
                $('#covered_btn').addClass('btn-success');
                $('#covered_btn').html('작동중');
                
            } else if(point[2] == "Cover Off") {
                document.getElementById("cover_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/cover_off.png";
                $('#covered_btn').removeClass('btn-success');
                $('#covered_btn').addClass('btn-danger');
                $('#covered_btn').html('작동 중지');   
            }
        },
        cache: false
    });
}
function requestSonicData() {
    $.ajax({
        url: '/sensor/sonic',
        success: function(point) {
            $('#sonic_value').text(point)

            var value = parseFloat(point[0]);
            let MAX_RANGE = 40;
            
            if(value < 40/4) {
                document.getElementById("trash_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/trash_1.png";
            } else if(value >= 40/4 && value < (40/4)*2) {
                document.getElementById("trash_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/trash_2.png";
            } else if(value >= (40/4)*2 && value <  (40/4)*3) {
                document.getElementById("trash_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/trash_3.png";
            } else {
                document.getElementById("trash_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/trash_4.png";s
            }
            

                        // Filter Check
            if(point[1] == "Filter On") {
                document.getElementById("filter_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/filter_on.png";

                $('#ventilator_btn').removeClass('btn-danger', {duration: 2000});
                $('#ventilator_btn').addClass('btn-success', {duration: 2000});
                $('#ventilator_btn').html('작동중');

            } else if(point[1] == "Filter Off") {

                
                document.getElementById("filter_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/filter_off.png";

                
                $('#ventilator_btn').removeClass('btn-success', {duration: 2000});
                $('#ventilator_btn').addClass('btn-danger', {duration: 2000});
        
                $('#ventilator_btn').html('작동 중지');

            }

            // Motor Check

            if(point[2] == "Cover On") {
                document.getElementById("cover_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/cover_on.png";
                $('#covered_btn').removeClass('btn-danger');
                $('#covered_btn').addClass('btn-success');
                $('#covered_btn').html('작동중');
                
            } else if(point[2] == "Cover Off") {
                document.getElementById("cover_img").src = "https://hjh-iot-hackathon.s3.ap-northeast-2.amazonaws.com/cover_off.png";
                $('#covered_btn').removeClass('btn-success');
                $('#covered_btn').addClass('btn-danger');
                $('#covered_btn').html('작동 중지');   
            }
        },
        cache: false
    });
}

function requestFunction() {

    requestTempData();
    requestHumiData();
    requestWaterData();
    requestGasData();
    requestSonicData();

    setTimeout(requestFunction, 2000);

}

$(document).ready(function() {
    requestFunction();
});