$(document).ready(function(){
    $('.dropdown-toggle').on('click', (event) => {
        const group = $(event.currentTarget).parent().parent().children().eq(1);
        $(group).toggle();
    });

    // TODO: add waterflow here
    const path = location.pathname.split("/").pop();
    const el = $(`.side-navbar a[href='${path}']`).parent().parent().parent();
    $(el).show();
});