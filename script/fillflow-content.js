$(document).ready(function () {
    function langAct(event) {
        let value = $('#Country').val();
        const delay = 500;

        if (value === 'Россия') {
            $('.pay-block').show(delay);
            $('.swift-block').hide(delay);
        } else {
            $('.pay-block').hide(delay);
            $('.swift-block').show(delay);
        }
        if (value === 'Выберите страну . . .') {
            $('.pay-block').hide();
            $('.swift-block').hide();
        }
    }

    langAct();
    $('#Country').on('change', langAct);
});