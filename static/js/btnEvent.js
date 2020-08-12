// 환풍기 클릭 이베느
$('#ventilator_btn').click(function() {

    // 꺼져있는 경우
    if($('#ventilator_btn').hasClass('btn-danger')) {
        
        // TODO AJAX를 이용해 flask로 환풍기 요청 데이터 보냄

        $('#ventilator_btn').removeClass('btn-danger', {duration: 2000});
        $('#ventilator_btn').addClass('btn-success', {duration: 2000});

        $('#ventilator_btn').html('작동중');
    }
    // 켜져있는 경우
    else if($('#ventilator_btn').hasClass('btn-success')) {

        // TODO AJAX를 이용해 flask로 환풍기 작동 해제 데이터 보냄

        $('#ventilator_btn').removeClass('btn-success', {duration: 2000});
        $('#ventilator_btn').addClass('btn-danger', {duration: 2000});
        
        $('#ventilator_btn').html('작동 중지');
    }
});

// 밑뚜껑 클릭 이벤트
$('#covered_btn').click(function() {
        
    if($('#covered_btn').hasClass('btn-danger')) {
            
    // TODO AJAX를 이용해 flask로 밑뚜겅 오픈 요청 데이터 보냄
        $('#covered_btn').removeClass('btn-danger');
        $('#covered_btn').addClass('btn-success');
        $('#covered_btn').html('작동중');
    }
    else if($('#covered_btn').hasClass('btn-success')) {
        // TODO AJAX를 이용해 flask로 밑뚜겅 클로즈 요청 데이터 보냄
        $('#covered_btn').removeClass('btn-success');
        $('#covered_btn').addClass('btn-danger');
        $('#covered_btn').html('작동 중지');
        
    }
});