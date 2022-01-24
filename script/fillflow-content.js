$(document).ready(function(){
    $('#Country').on('change', (event) => {
        let value = $(event.currentTarget).val();
        if (value === 'Россия') {
            $('.pay-block').show(500);
        } else {
            $('.pay-block').hide(500);
        }
    });
});

