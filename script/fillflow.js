// let path = window.location.pathname;
// let page = path.split("/").pop();
// console.log( page );

$('.fillflow-navbar li a').each(function() {
    if ($(this).attr('href') === location.pathname.split("/").pop()){
        $(this).addClass('current-page');
        let color = $(this).css('background-color').slice(0, -1) + ', 0.5)';
        $(this).css("box-shadow", "0 0 0 0.25rem " + color)
        // $(this).focus();
        // $(this).on('blur', () => {
        //     $(this).focus();
        // })
    }
});

