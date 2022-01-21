$(document).ready(function(){
    $('.fillflow-navbar li a').each(function() {
        if ($(this).attr('href') === location.pathname.split("/").pop()){
            $(this).addClass('current-page');
            let color = $(this).css('background-color').slice(0, -1) + ', 0.5)';
            $(this).css("box-shadow", "0 0 0 0.25rem " + color);
        }
        $(this).on('focus', () => {
            $(this).css('z-index', 1);
        });
        $(this).on('blur', () => {
            $(this).css('z-index', 2);
        });
    });
    $('.dropdown-toggle').on('click', (event) => {
        debugger;
        $(event.currentTarget).dropdown('toggle');
    }).on('blur', (event) => {
        $(event.currentTarget).dropdown('toggle');
    });
});
