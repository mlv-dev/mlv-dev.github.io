$(document).ready(function(){
    $('.dropdown-toggle').on('click', (event) => {
        const group = $(event.currentTarget).parent().parent().children().eq(1);
        $(group).toggle();
    });

    // TODO: add waterflow here
    const path = location.pathname.split("/").pop();
    const el = $(`.side-navbar a[href='${path}']`).parent().parent().parent();
    $(el).show();

    $('.side-navbar a').each(function() {
        if ($(this).attr('href') === location.pathname.split("/").pop()){
            $(this).addClass('current-page');
            let color = $(this).css('background-color').slice(0, -1) + ', 0.5)';
            // $(this).parent().css("box-shadow", "0 0 0 0.25rem " + color);
            $(this).parent().css("box-shadow", "0 0 12px 0.4rem " + color);
        }
    });
});