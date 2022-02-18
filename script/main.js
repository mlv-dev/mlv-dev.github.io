let lang = "ru";

$(document).ready(function(){
    $(".prevent-unsaved").dirtyForms();

    validationLogic();
    datepickerLogic();
    enOnlyLogic();
    multiboxLogic();

    function validationLogic() {
        $(".input-validation-error").parent().css({
            "--bs-text-opacity": "1",
            "color" : "rgba(var(--bs-danger-rgb),var(--bs-text-opacity))"
        });
    }
    function datepickerLogic() {
        $("#contact-date").datepicker({
            maxViewMode: 2,
            language: "ru",
            autoclose: true
        });
    }
    function enOnlyLogic() {
        $('.en-only').on('keyup', enOnly);
        $('.en-only').tooltip({'trigger':'manual', 'title': 'Ни слова по русски!'});

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
    }
    function multiboxLogic() {
        // on load
        $(".multibox").each(( index, multibox ) => {
            const select = $(multibox).children('.d-none').children('select');
            const id = $(select).prop('id');
            $(`#${id} > option`).each((index, option) => {
                const value = $(option).val();
                const checked = $(option).attr('selected') ? 'checked' : '';
                if (value === '-1') {
                    $(option).removeAttr('selected');
                    return;
                }
                const sub_id = `${id}_${value}`;
                const sub_title = $(option).text();
                const radio =
                    `<div class="form-check form-check-inline">\n` +
                    `   <input class="form-check-input" ${checked} type="radio" value=${value} id="${sub_id}" />\n` +
                    `   <label class="form-check-label" for="${sub_id}">${sub_title}</label>\n` +
                    `</div>`;
                $(multibox).append(radio);
            });
        });

        // on submit
        $('form').on('submit', () => {
            $(".multibox").each(( index, multibox ) => {
                const checkedInput = $(multibox).find('.form-check-input[c=true]');
                const value = checkedInput.length ? checkedInput.val() : -1;
                const option = $(multibox).find(`option[value=${value}]`);
                $(option).attr('selected','selected');
                return true;
            });
        });

        // logic
        $('.multibox').on('click', '.form-check-input', function() {
            if ($(this).attr('c')) {
                $(this).removeAttr('c').prop('checked', false);
            } else {
                $(this).attr('c', true).prop('checked', true);
            }
            $(this).parent().siblings('.form-check').children('.form-check-input').removeAttr('c').prop('checked', false);
        });
    }
});

