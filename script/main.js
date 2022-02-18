$(document).ready(function(){
    $(".prevent-unsaved").dirtyForms();

    langPayblocks();
    $('#Country').on('change', langPayblocks);

    langCheck();
    validationLogic();
    datepickerLogic();
    enOnlyLogic();
    multiboxLogic();
    carFillflow();
    fileLogic();

    function langCheck() {
        let browserLang = navigator.language.split('-')[0]
        const searchParams = new URLSearchParams(window.location.search);
        let urlLang = searchParams.get('lang');
        let cookieLang = $.cookie('current-lang');

        let lang='';

        if (searchParams.has('lang')) {
            lang = urlLang;
            $.cookie('current-lang', lang);
        } else if (!!cookieLang) {
            lang = cookieLang;
        } else {
            lang = browserLang;
            $.cookie('current-lang', lang);
        }
        // activate
        $(`.lang-buttons a[lang-info='${lang}']`).addClass('active-btn');
    }
    function validationLogic() {
        $(".input-validation-error").parent().css({
            "--bs-text-opacity": "1",
            "color" : "rgba(var(--bs-danger-rgb),var(--bs-text-opacity))"
        });
    }
    function datepickerLogic() {
        $(".datepicker").datepicker({
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
                const checked = $(option).attr('selected') ? 'checked с=true' : '';
                const toggleTarget = $(select).attr('toggleTarget');
                const toggleMessage = toggleTarget ? 'toggleTarget=' + toggleTarget : '';
                $('#' + toggleTarget).hide();
                if (value === '-1' || value === 'Выберите') {
                    $(option).removeAttr('selected');
                    return;
                }
                const sub_id = `${id}_${value}`;
                const sub_title = $(option).text();
                const radio =
                    `<div class="form-check form-check-inline">\n` +
                    `   <input class="form-check-input" ${toggleMessage} ${checked} type="radio" value=${value} id="${sub_id}" />\n` +
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
        const togglingDelay = 1000;
        $('.multibox').on('click', '.form-check-input', function() {
            const wasEnabled = $(this).attr('c');
            const targetId = $(this).attr('toggleTarget');
            if (targetId) {
                const target = $(`#${targetId}`);
                const value = $(this).attr('value');
                if (value === '1' && !wasEnabled) {
                    $(target).show(togglingDelay);
                } else {
                    $(target).hide(togglingDelay);
                }
            }

            if (wasEnabled) {
                $(this).removeAttr('c').prop('checked', false);
            } else {
                $(this).attr('c', true).prop('checked', true);
            }
            $(this).parent().siblings('.form-check').children('.form-check-input').removeAttr('c').prop('checked', false);
        });
    }
    function carFillflow() {
        const max_level = 4;
        const fadeout_delay = 200;

        let current_state = {}

        // Rewrite script

        let iOk = 0;
        // Setup
        for(let i = 1; i <= max_level; i++) {
            const elem = `.form-select[num='${i}']`;
            const preselectedValue = $(elem).attr('value');

            if (preselectedValue) {
                // get obj list
                let obj = vehicle_types;
                for (let i2 = 1; i2 < i; i2++) {
                    obj = obj[current_state[i2]];
                }
                const preselected_msg = preselectedValue ? '' : 'selected';

                $(elem).append(`<option ${preselected_msg} value="null"></option>`);
                if (obj) {
                    for (let key of Object.keys(obj)) {
                        const isSelected = (key === preselectedValue) ? 'selected' : '';
                        if (isSelected) {
                            current_state[i] = key;
                        }
                        $(elem).append(`<option ${isSelected} value="${key}">${key}</option>`);
                    }
                }
                const elemN = `.form-select[num=${i+1}]`;
                if (i !== max_level && !$(elemN).attr('value')) {

                    processChange(i, preselectedValue);
                }
                iOk += 1;
            } else if (i > iOk + 1) {
                $(elem).parent().hide();
            } else if (i === 1) {
                $("select[num='1']").append('<option selected value="null"></option>')
                for (let key of Object.keys(vehicle_types)) {
                    $("select[num='1']").append('<option value="' + key + '">' + key + '</option>')
                }
            }
            // MUST BE SETTED ALL FIELDS
        }
        // on change:
        $(".vehicle-form div select").on("change", (event) => {
            const num = Number(event.currentTarget.getAttribute('num'));
            const value = event.currentTarget.value;
            processChange(num, value);
        });
        function processChange(num, value) {
            const level = num;
            current_state[level] = value;

            if (level !== max_level) {
                const next_elem = `.form-select[num=${level + 1}]`;
                for (let i = level + 1; i <= max_level; i++) {
                    const elem = `.form-select[num=${i}]`;
                    $(elem).empty();
                    if (i !== level + 1 || (i === level + 1 && value === 'null')) {
                        $(elem).parent().hide(fadeout_delay);
                        $(elem).attr('value', 'null');
                    }
                }
                if (value !== 'null') {
                    let obj = vehicle_types;
                    for (let i = 1; i <= level; i++) {
                        obj = obj[current_state[i]];
                    }
                    $(next_elem).parent().show(fadeout_delay);
                    $(next_elem).append('<option selected value="null"></option>')
                    for (let key of Object.keys(obj)) {
                        $(next_elem).append('<option value="' + key + '">' + key + '</option>')
                    }
                }
            }
        }
    }
    function langPayblocks(event) {
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
    function fileLogic() {
        $('.photo-upload').fileinput({showCaption: false, dropZoneEnabled: false});

        $('.photo-upload').on('change', (e) => {
            const file = e.target.files[0];

            if (!file) {
                return;
            }

            new Compressor(file, {
                quality: 0,
                width: 640,
                height: 480,

                // The compression process is asynchronous,
                // which means you have to access the `result` in the `success` hook function.
                success(result) {
                    const formData = new FormData();

                    // The third parameter is required for server
                    formData.append('input-id', result, result.name);
                },
                error(err) {
                    console.log(err.message);
                },
            });
        });
    }
});


const vehicle_types = {
    "RACE": {
        "BIKE": {
            "BIKE": {
                "RALLY2" : {},
                "G-MOTO": {},
                "RALLYGP": {},
            },
        },
        "QUAD": {
            "QUAD": {
                "X": {}
            },
        },
        "CAR": {
            "T1": {
                "T1.1": {},
                "T1.2": {},
                "T1.3": {},
            },
            "T2": {
                "X": {}
            },
            "T3": {
                "X": {}
            },
            "T4": {
                "X": {}
            },
            "OPEN": {
                "T1.O": {},
                "T2.O": {},
                "T3.O": {},
                "T4.O": {}
            }
        },
        "TRUCK": {
            "TRUCK": {
                "T5": {},
                "T5.O": {}
            }
        }
    },
    "SERVICE": {
        "CAR": {
            "T6-3.5": {
                "4x4": {},
                "VAN": {},
                "CAMPER": {},
                "SMALL TRUCK": {},
                "SMALL BUS": {},
            }
        },
        "TRUCK": {
            "T7+3.5": {
                "TRUCK": {},
                "BUS": {},
                "CAMPER": {}
            }
        },
        "TRAILER": {
            "T6-3.5": {
                "TRAILER": {},
            },
            "T7+3.5": {
                "TRAILER": {}
            }
        }
    }
}

