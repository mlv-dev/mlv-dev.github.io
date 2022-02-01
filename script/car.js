// TODO: how to isolate declarations?

$(document).ready(function(){
    const max_level = 5;
    const fadeout_delay = 200;

    let current_state = {}
    // on create: (only first type)
    $("select[num='1']").append('<option selected disabled value="none"></option>')
    for (let key of Object.keys(vehicle_types)) {
        const key_text = keyToText(key);
        $("select[num='1']").append('<option value="' + key + '">' + key_text + '</option>')
    }
    for(let i = 2; i <= max_level; i++) {
        const elem = `.form-select[num=${i}]`;
        $(elem).parent().hide();
    }
    // on change:
    $(".vehicle-form > div > select").on("change", (event) => {
        const level = Number(event.currentTarget.getAttribute('num'));
        const this_key = event.currentTarget.value;
        current_state[level] = this_key;
        // next elem
        if (level !== max_level) {
            let obj = vehicle_types;
            for (let i = 1; i <= level; i++) {
                obj = obj[current_state[i]];
            }
            const next_elem = `.form-select[num=${level + 1}]`;
            for (let i = level + 1; i <= max_level; i++) {
                const elem = `.form-select[num=${i}]`;
                $(elem).empty();
                if (i !== level + 1) {
                    $(elem).parent().hide(fadeout_delay);
                }
            }
            $(next_elem).parent().show(fadeout_delay);
            $(next_elem).append('<option selected disabled value="none"></option>')
            for (let key of Object.keys(obj)) {
                const key_text = keyToText(key);
                $(next_elem).append('<option value="' + key + '">' + key_text + '</option>')
            }
        }
    })
});

function keyToText(key) {
    const obj = translations[lang];
    return key in obj ? translations[lang][key] : key;
}

const vehicle_types = {
    race: {
        bike: {
            bike: {
                rally2 : {},
                g_moto: {},
                rallygp: {},
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
}
const translations = {
    ru: {
        participant: 'Участники',
        // press: 'пресса',
        // tourists: 'туристы',
        _4x4: '4x4',
        t6_3_5: 'T6-3.5',
        t7_3_5: 'T7-3.5',
        race: 'Гонщики',
        service: 'Обсуживание',
        bike: 'Байк',
        quad: 'Квадроцикл',
        car: 'Машина',
        truck: 'Грузовик',
        trailer: 'Трейлер',
        open: 'Открыто',
        van: 'Фургон',
        camper: 'Кемпер',
        small_truck: 'Небольшой грузовик',
        small_bus: 'Небольшой автобус',
        bus: 'Автобус',
        // and so on...
    },
}