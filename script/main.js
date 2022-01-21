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
    // -----------

    let lang = "ru";

    const vehicle_types = {
        participant: {
            race: {
                bike: {
                    bike: {
                        rally2 : {},
                        g_moto: {},
                    },
                },
                quad: {
                    quad: {
                        x: {}
                    },
                },
                car: {
                    t1: {
                        t1_1: {},
                        t1_2: {},
                        t1_3: {},
                    },
                    t2: {
                        x: {}
                    },
                    t3: {
                        x: {}
                    },
                    t4: {
                        x: {}
                    },
                    open: {
                        t1_0: {},
                        t2_0: {},
                        t3_0: {},
                        t4_0: {}
                    }
                },
                truck: {
                    truck: {
                        t5: {},
                        t5_0: {}
                    }
                }
            },
            service: {
                car: {
                    t6_3_5: {
                        _4x4: {},
                        van: {},
                        camper: {},
                        small_truck: {},
                        small_bus: {},
                    }
                },
                truck: {
                    t7_3_5: {
                        truck: {},
                        bus: {},
                        camper: {}
                    }
                },
                trailer: {
                    t6_3_5: {
                        trailer: {},
                    },
                    t7_3_5: {
                        trailer: {}
                    }
                }
            }
        },
        press: {
            race: {
                car: {
                    t6_3_5: {
                        _4x4: {},
                        van: {},
                        camper: {},
                        small_truck: {},
                        small_bus: {},
                    }
                }
            },
            service: {
                car: {
                    t6_3_5: {
                        _4x4: {},
                        van: {},
                        camper: {},
                        small_truck: {},
                        small_bus: {},
                    }
                }
            }
        },
        tourists: {
            service: {
                car: {
                    t6_3_5: {
                        _4x4: {},
                        van: {},
                        camper: {},
                        small_truck: {},
                        small_bus: {},
                    }
                }
            }
        }
    }
    const translations = {
        ru: {
            participant: "учатники",
            press: "пресса",
            tourists: "туристы",
            _4x4: "4x4",
            t6_3_5: "T6-3.5",
            t7_3_5: "T7-3.5",
            // and so on...
        },
    }
    function keyToText(key) {
        const obj = translations[lang];
        return key in obj ? translations[lang][key] : key;
    }
    const max_level = 5;
    let current_state = {}
    // on create: (only first type)
    $("#type1").append('<option selected disabled value="none"></option>')
    for (let key of Object.keys(vehicle_types)) {
        const key_text = keyToText(key);
        $("#type1").append('<option value="' + key + '">' + key_text + '</option>')
    }
    for(let i = 2; i <= max_level; i++) {
        const elem = "#type" + i;
        $(elem).parent().hide();
    }
    // on change:
    $(".vehicle-form > div > select").on("change", (event) => {
        const level = Number(event.currentTarget.id.substring(4));
        const this_key = event.currentTarget.value;
        current_state[level] = this_key;
        // next elem
        if (level !== max_level) {
            let obj = vehicle_types;
            for (let i = 1; i <= level; i++) {
                obj = obj[current_state[i]];
            }
            const next_elem = "#type" + (level + 1);
            for (let i = level + 1; i <= max_level; i++) {
                const elem = "#type" + i;
                $(elem).empty();
                $(elem).parent().hide();
            }
            $(next_elem).parent().show();
            $(next_elem).append('<option selected disabled value="none"></option>')
            for (let key of Object.keys(obj)) {
                const key_text = keyToText(key);
                $(next_elem).append('<option value="' + key + '">' + key_text + '</option>')
            }
        }
    })

});
