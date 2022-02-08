let lang = "ru";

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

    function enOnly() {
        let old = this.value
        this.value = old.replace(/[^a-zA-Z0-9 -]/ig,'');
        let tooltip = bootstrap.Tooltip.getInstance(this)
        if (this.value !== old) {
            tooltip.show()
            setTimeout(() => {
                tooltip.hide()
            }, 1000);
        }
        // else {
        //     tooltip.hide()
        // }
    }
    $('.en-only, input').on('keyup', enOnly);

    $('.en-only, input').tooltip({'trigger':'manual', 'title': 'Ни слова по русски!'});
});
