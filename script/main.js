$(document).ready(function(){
    // We don't need it because page reload
    // $(".lang-btn").on("click", e => {
    //     const elem = e.currentTarget;
    //     $(".lang-btn").removeClass("active-btn");
    //     $(elem).addClass("active-btn");
    // });

// Reg:
    $("#contact-date").datepicker({
        maxViewMode: 2,
        language: "ru",
        autoclose: true
    });
    $(".input-validation-error").parent().css({
        "--bs-text-opacity": "1",
        "color" : "rgba(var(--bs-danger-rgb),var(--bs-text-opacity))"
    });
});

$("form").dirtyForms();