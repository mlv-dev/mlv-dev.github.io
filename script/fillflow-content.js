

$(document).ready(function(){
    function langAct(event) {
        let value = $('#Country').val();
        if (value === 'Россия') {
            $('.pay-block').show(500);
        } else {
            $('.pay-block').hide(500);
        }
    }
    $('#Country').on('change', langAct);
});

