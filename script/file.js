$(document).ready(function() {
    // initialize with defaults
    // $("#input-id").fileinput({
    //     // maxFileSize: 1, //kb
    //     // allowedFileTypes: ["image"],
    //     showUpload: false,
    //     showCaption: false,
    //     // msgPlaceholder: "aaaa",
    // });
    $("#input-id").fileinput({showCaption: false, dropZoneEnabled: false});

    $('#input-id').on('change', (e) => {
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
});

