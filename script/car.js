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
    return key;
}

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
                "T.3": {},
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
                "T6 -3.5": {
                    "4x4": {},
                    "VAN": {},
                    "CAMPER": {},
                    "SMALL TRUCK": {},
                    "SMALL BUS": {},
                }
            },
            "TRUCK": {
                "T7 +3.5": {
                    "TRUCK": {},
                    "BUS": {},
                    "CAMPER": {}
                }
            },
            "TRAILER": {
                "T6 -3.5": {
                    "TRAILER": {},
                },
                "T7 +3.5": {
                    "TRAILER": {}
                }
            }
        }
}