$(document).ready(function(){
    $(".prevent-unsaved").dirtyForms();

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
