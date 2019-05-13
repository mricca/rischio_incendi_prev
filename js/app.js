/* jshint undef:false, newcap: false, unused:false */

(function(API) {
    API.textAlign = function(txt, options, x, y) {
        options = options || {};
        // Use the options align property to specify desired text alignment
        // Param x will be ignored if desired text alignment is 'center'.
        // Usage of options can easily extend the function to apply different text
        // styles and sizes

        // Get current font size
        var fontSize = this.internal.getFontSize();

        // Get page width
        var pageWidth = this.internal.pageSize.width;

        // Get the actual text's width
        // You multiply the unit width of your string by your font size and divide
        // by the internal scale factor. The division is necessary
        // for the case where you use units other than 'pt' in the constructor
        // of jsPDF.
        var txtWidth = this.getStringUnitWidth(txt) * fontSize / this.internal.scaleFactor;

        if (options.align === "center") {

            // Calculate text's x coordinate
            x = (pageWidth - txtWidth) / 2;
            // x = x;

        } else if (options.align === "centerAtX") { // center on X value

            x = x - (txtWidth / 2);

        } else if (options.align === "right") {

            x = x - txtWidth;
        }

        // Draw text at x,y
        this.text(txt, x, y);
    };
    /*
        API.textWidth = function(txt) {
            var fontSize = this.internal.getFontSize();
            return this.getStringUnitWidth(txt)*fontSize / this.internal.scaleFactor;
        };
    */

    API.getLineHeight = function(txt) {
        return this.internal.getLineHeight();
    };

})(jsPDF.API);

(function() {
    "use strict";

    // $('#zt500-image').attr('src', "assets/img/sinottiche/zt500.z3.3.png?timeId=" + new Date().getTime());
    // $('#zt500-image-lightbox').attr('href', "assets/img/sinottiche/zt500.z3.3.png?timeId=" + new Date().getTime());

    $('#zt850-image').attr('src', "assets/img/sinottiche/zt850.z3.3.png?timeId=" + new Date().getTime());
    $('#zt850-image-lightbox').attr('href', "assets/img/sinottiche/zt850.z3.3.png?timeId=" + new Date().getTime());

    $('#t2max-image').attr('src', "assets/img/sinottiche/t2max.z2.1.png?timeId=" + new Date().getTime());
    $('#t2max-image-lightbox').attr('href', "assets/img/sinottiche/t2max.z2.1.png?timeId=" + new Date().getTime());

    $('#wind10-image').attr('src', "assets/img/sinottiche/wind10.z2.5.png?timeId=" + new Date().getTime());
    $('#wind10-image-lightbox').attr('href', "assets/img/sinottiche/wind10.z2.5.png?timeId=" + new Date().getTime());

    $('#rh2mz3_11-image').attr('src', "assets/img/vento_umidita/rh2mz3_11.png?timeId=" + new Date().getTime());
    $('#rh2mz3_11-image-lightbox').attr('href', "assets/img/vento_umidita/rh2mz3_11.png?timeId=" + new Date().getTime());

    $('#rh2mz3_14-image').attr('src', "assets/img/vento_umidita/rh2mz3_14.png?timeId=" + new Date().getTime());
    $('#rh2mz3_14-image-lightbox').attr('href', "assets/img/vento_umidita/rh2mz3_14.png?timeId=" + new Date().getTime());

    $('#rh2mz3_17-image').attr('src', "assets/img/vento_umidita/rh2mz3_17.png?timeId=" + new Date().getTime());
    $('#rh2mz3_17-image-lightbox').attr('href', "assets/img/vento_umidita/rh2mz3_17.png?timeId=" + new Date().getTime());

    $('#rh2mz3_20-image').attr('src', "assets/img/vento_umidita/rh2mz3_20.png?timeId=" + new Date().getTime());
    $('#rh2mz3_20-image-lightbox').attr('href', "assets/img/vento_umidita/rh2mz3_20.png?timeId=" + new Date().getTime());

    waitingDialog.show("In caricamento...", {
        dialogSize: 'sm',
        progressType: 'info'
    });

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "../../aib_bollettino/assets/img/sinottiche/OKFILE.all_ecm_3km?timeId=" + new Date().getTime(), true);

    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === XMLHttpRequest.DONE && rawFile.status === 200) {

            moment().locale('it');
            moment.updateLocale('it', {
                months: [
                    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio",
                    "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
                ],
                weekdays: 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
            });

            var dataText = rawFile.responseText;

            var regExp1 = new RegExp("<p>", "gi");
            var regExp2 = new RegExp("</p>", "gi");
            var results1 = [];
            var results2 = [];

            while (regExp1.exec(dataText)) {
                results1.push(regExp1.lastIndex);
            }

            while (regExp2.exec(dataText)) {
                results2.push(regExp2.lastIndex);
            }
            var sinotticaText = dataText.substring(results1[1], results2[1] - 4);
            document.getElementById("sinottica-text").innerHTML = sinotticaText;
            var anno = dataText.substring(0, 4);
            var mese = dataText.substring(4, 6);
            var giorno = dataText.substring(6, 8);
            var formatData = anno + "-" + mese + "-" + giorno;
            var a = moment(formatData);
            var formatDataYesterday = a.clone().subtract(1, 'day').format('YYYY-MM-DD');

            //$('#iframe_html').attr('src', "http://www.lamma.rete.toscana.it/previ/ita/sinottica.html");

            //document.getElementById("fwi-title").innerHTML += moment(formatDataYesterday).format('dddd, Do MMMM YYYY');
            document.getElementById("fwi-title").innerHTML += moment(formatData).format('dddd, Do MMMM YYYY');
            document.getElementById("rddd-title").innerHTML += moment(formatData).format('dddd, Do MMMM YYYY');
            document.getElementById("scenario-rischio-title").innerHTML += moment(formatData).format('dddd, Do MMMM YYYY');

            document.getElementById("umidita-title").innerHTML += moment(formatDataYesterday).format('dddd, Do MMMM YYYY');
            document.getElementById("bollettino-title-giorno").innerHTML = moment(formatData).format('dddd, Do MMMM YYYY');

            // $('#ffwi-image-lightbox').attr('href', "http://geoportale.lamma.rete.toscana.it/cgi-bin/wms_rischio_prev?map=wms_" + anno + "/ris_prev_incendio_wms_" + formatDataYesterday + ".map&service=WMS&version=1.1.0&request=GetMap&layers=Comuni_Rfwi_Run1_" + formatDataYesterday + ",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");
            // $('#ffwi-image').attr('src', "http://geoportale.lamma.rete.toscana.it/cgi-bin/wms_rischio_prev?map=wms_" + anno + "/ris_prev_incendio_wms_" + formatDataYesterday + ".map&service=WMS&version=1.1.0&request=GetMap&layers=Comuni_Rfwi_Run1_" + formatDataYesterday + ",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");

            $('#scenario-rischio-image-lightbox').attr('href', "https://geoportale.lamma.rete.toscana.it/cgi-bin/wms_rischio_prev?map=wms_" + anno + "/ris_prev_incendio_wms_" + formatData + ".map&service=WMS&version=1.1.0&request=GetMap&layers=Comuni_Rfwi_Run0_4classi_" + formatData + ",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");
            $('#scenario-rischio-image').attr('src', "https://geoportale.lamma.rete.toscana.it/cgi-bin/wms_rischio_prev?map=wms_" + anno + "/ris_prev_incendio_wms_" + formatData + ".map&service=WMS&version=1.1.0&request=GetMap&layers=Comuni_Rfwi_Run0_4classi_" + formatData + ",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");

            $('#rddd-image-lightbox').attr('href', "https://geoportale.lamma.rete.toscana.it/cgi-bin/wms_rischio_prev?map=wms_" + anno + "/ris_prev_incendio_wms_" + formatData + ".map&service=WMS&version=1.1.0&request=GetMap&layers=Comuni_Rddd_Run0_" + formatData + ",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");
            $('#rddd-image').attr('src', "https://geoportale.lamma.rete.toscana.it/cgi-bin/wms_rischio_prev?map=wms_" + anno + "/ris_prev_incendio_wms_" + formatData + ".map&service=WMS&version=1.1.0&request=GetMap&layers=Comuni_Rddd_Run0_" + formatData + ",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");

            $('#ffwi-image-lightbox').attr('href', "https://geoportale.lamma.rete.toscana.it/cgi-bin/wms_rischio_prev?map=wms_" + anno + "/ris_prev_incendio_wms_" + formatData + ".map&service=WMS&version=1.1.0&request=GetMap&layers=Comuni_Rfwi_Run0_" + formatData + ",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");
            $('#ffwi-image').attr('src', "https://geoportale.lamma.rete.toscana.it/cgi-bin/wms_rischio_prev?map=wms_" + anno + "/ris_prev_incendio_wms_" + formatData + ".map&service=WMS&version=1.1.0&request=GetMap&layers=Comuni_Rfwi_Run0_" + formatData + ",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");

            $('#umidita-image-lightbox').attr('href', "https://geoportale.lamma.rete.toscana.it/cgi-bin/wms_datimeteo?map=wms_" + anno + "/datimeteo_wms_" + formatDataYesterday + ".map&service=WMS&version=1.1.0&request=GetMap&layers=Umid_maxur_sp_" + formatDataYesterday + ",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");
            $('#umidita-image').attr('src', "https://geoportale.lamma.rete.toscana.it/cgi-bin/wms_datimeteo?map=wms_" + anno + "/datimeteo_wms_" + formatDataYesterday + ".map&service=WMS&version=1.1.0&request=GetMap&layers=Umid_maxur_sp_" + formatDataYesterday + ",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");

            /*
            Refs:
            http://mrrio.github.io/jsPDF/
            https://github.com/MrRio/jsPDF
            https://mrrio.github.io/jsPDF/doc/symbols/jsPDF.html
            */

            var agency_name = 'Consorzio LaMMA';
            var agency_site_url = 'www.lamma.rete.toscana.it';
            var footer = agency_name + ' - ' + agency_site_url;

            var page_size = 'a4';
            var page_width = 210; // mm
            var page_margin = 0; // mm
            var content_width = page_width - (page_margin * 2); // available width for the content

            // drawing coord
            var _y;
            var _x;
            // var color_array;
            var _string;
            var lineHeight;
            var y_correction;

            var vspace = 10; // standard vertical space between elements

            // some variables
            var can_display_preview = true;
            var preview_container = $('#pdf_preview');
            var download_button = $('#flyer_download_btn');

            $(".dropdown-menu li a").click(function() {
                var btn = $(this).parents(".dropdown").find('.btn');
                btn.html($(this).text() + ' <span class="caret"></span>');
                btn.val($(this).data('value'));
            });

            // utilities
            var hex2rgb = function(hex_string) {
                if (/^#/.test(hex_string)) {
                    hex_string = hex_string.substr(1);
                }
                if (hex_string.length === 3) {
                    hex_string = hex_string.replace(/\w/, function(match) {
                        return String(match) + String(match);
                    });
                }

                return {
                    red: parseInt(hex_string.substr(0, 2), 16),
                    green: parseInt(hex_string.substr(2, 2), 16),
                    blue: parseInt(hex_string.substr(4, 2), 16)
                };
            };

            var px2mm = function(pixel) {
                // px to inches
                var inches = pixel / 72;
                return inches * 25.4;
            };

            var mm2px = function(millimeters) {
                // mm to inches
                var inches = millimeters / 25.4;
                return inches * 72;
            };

            // function to calculate and check img sizes
            var imgSizes = function(img_w, img_h, img_mm_w) {
                /*img_w and img_h represent the original image size, in pixel
                img_mm_w is the desidered rendered image size, in millimeters*/

                if (img_mm_w > content_width) { // this should be never used...
                    img_mm_w = content_width;
                }

                if (mm2px(img_mm_w) > img_w) {
                    throw 'The `img_mm_w` parameter is too big';
                }

                var img_mm_h = Math.round((px2mm(img_h) * img_mm_w) / px2mm(img_w));

                return {
                    w: img_mm_w,
                    h: img_mm_h,
                    centered_x: (page_width - img_mm_w) / 2
                };
            };

            try {

                // image reading
                // More info at https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
                // for more examples about file api
                // take a look at https://scotch.io/tutorials/use-the-html5-file-api-to-work-with-files-locally-in-the-browser

                // var zt500_img = $('#zt500-image').attr('src');
                // var zt500_legend_img = "assets/img/sinottiche/zt500_legend.png";
                var rddd_img = $('#rddd-image').attr('src');
                var rddd_legend_img = $('#legend-rddd').attr('src');
                // var zt850_img = $('#zt850-image').attr('src');
                // var zt850_legend_img = "assets/img/sinottiche/zt850_legend.png";
                var liz3_14_img = $('#liz314-image').attr('src');
                // var liz3_14_legend_img = "assets/img/sinottiche/zt850_legend.png";
                var t2max_img = $('#t2max-image').attr('src');
                var t2max_legend_img = "assets/img/sinottiche/t2max_legend.png";
                var wind10_img = $('#wind10-image').attr('src');
                var wind10_legend_img = "assets/img/sinottiche/wind10_legend.png";
                var rh2mz3_11_img = $('#rh2mz3_11-image').attr('src');
                var rh2mz3_14_img = $('#rh2mz3_14-image').attr('src');
                var rh2mz3_17_img = $('#rh2mz3_17-image').attr('src');
                var rh2mz3_20_img = $('#rh2mz3_20-image').attr('src');
                var rh2mz3_img_legend = "assets/img/vento_umidita/rh2mz3_legend.png";
                var ffwi_img = $('#ffwi-image').attr('src');
                var ffwi_legend_img = $('#legend-ffwi').attr('src');
                var umidita_img = $('#umidita-image').attr('src');
                var umidita_legend_img = $('#legend-umidita').attr('src');

                // var zt500 = null;
                // var zt500_legend = null;
                // var zt850 = null;
                // var zt850_legend = null;
                var liz3_14 = null;
                // var liz3_14_legend = null;
                var t2max = null;
                var t2max_legend = null;
                var wind10 = null;
                var wind10_legend = null;
                var rh2mz3_11 = null;
                var rh2mz3_14 = null;
                var rh2mz3_17 = null;
                var rh2mz3_20 = null;
                var rh2mz3_legend = null;
                var ffwi = null;
                var ffwi_legend = null;
                var umidita = null;
                var umidita_legend = null;
                var rddd = null;
                var rddd_legend = null;

                var count = 0;
                var decount = function() {
                    count--;
                    if (count === 0) {
                        download_button.prop('disabled', false);
                        waitingDialog.hide();
                    }
                };

                function convertImgToDataURL(url, callback, outputFormat, id) {
                    var img = new Image();
                    count++;
                    img.crossOrigin = 'Anonymous';
                    img.onload = function() {
                        var id = this.id;
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext('2d');
                        var dataURL;
                        var img;
                        img = this;
                        canvas.width = this.width;
                        if (id === "zt500_img" || id === "zt850_img") {
                            canvas.height = this.height - 200;
                            ctx.drawImage(this, 0, 80, this.width, this.height, 0, 0, this.width, this.height);
                        } else if (id === "rh2mz3_11_img" || id === "rh2mz3_14_img" || id === "rh2mz3_17_img" || id === "rh2mz3_20_img") {
                            canvas.height = this.height - 122;
                            ctx.drawImage(this, 0, 48, this.width, this.height, 0, 0, this.width, this.height);
                        } else if (id === "t2max_img" || id === "wind10_img") {
                            canvas.height = this.height - 122;
                            ctx.drawImage(this, 0, 38, this.width, this.height, 0, 0, this.width, this.height);
                        } else {
                            canvas.height = this.height;
                            ctx.drawImage(this, 0, 0);
                        }
                        dataURL = canvas.toDataURL(outputFormat);
                        decount();
                        callback(dataURL, img);
                        canvas = null;
                    };
                    img.src = url;
                    img.id = id;
                }

                // convertImgToDataURL(zt500_img, function(base64Img, img) {
                //     zt500 = {
                //         type: 'PNG'
                //     };
                //     zt500.src = base64Img;
                //     zt500.w = img.width;
                //     zt500.h = img.height - 200;
                // }, undefined, "zt500_img");

                // convertImgToDataURL(zt500_legend_img, function(base64Img, img) {
                //     zt500_legend = {
                //         type: 'PNG'
                //     };
                //     zt500_legend.src = base64Img;
                //     zt500_legend.w = img.width;
                //     zt500_legend.h = img.height;
                // }, undefined, "zt500_img_legend");

                // convertImgToDataURL(zt850_img, function(base64Img, img) {
                //     zt850 = {
                //         type: 'PNG'
                //     };
                //     zt850.src = base64Img;
                //     zt850.w = img.width;
                //     zt850.h = img.height - 200;
                // }, undefined, "zt850_img");
                //
                // convertImgToDataURL(zt850_legend_img, function(base64Img, img) {
                //     zt850_legend = {
                //         type: 'PNG'
                //     };
                //     zt850_legend.src = base64Img;
                //     zt850_legend.w = img.width;
                //     zt850_legend.h = img.height;
                // }, undefined, "zt850_img_legend");

                convertImgToDataURL(liz3_14_img, function(base64Img, img) {
                    liz3_14 = {
                        type: 'PNG'
                    };
                    liz3_14.src = base64Img;
                    liz3_14.w = img.width;
                    liz3_14.h = img.height - 200;
                }, undefined, "liz3_14_img");

                convertImgToDataURL(t2max_img, function(base64Img, img) {
                    t2max = {
                        type: 'PNG'
                    };
                    t2max.src = base64Img;
                    t2max.w = img.width;
                    t2max.h = img.height - 122;
                }, undefined, "t2max_img");

                convertImgToDataURL(t2max_legend_img, function(base64Img, img) {
                    t2max_legend = {
                        type: 'PNG'
                    };
                    t2max_legend.src = base64Img;
                    t2max_legend.w = img.width;
                    t2max_legend.h = img.height;
                }, undefined, "t2max_img_legend");

                convertImgToDataURL(wind10_img, function(base64Img, img) {
                    wind10 = {
                        type: 'PNG'
                    };
                    wind10.src = base64Img;
                    wind10.w = img.width;
                    wind10.h = img.height - 122;
                }, undefined, "wind10_img");

                convertImgToDataURL(wind10_legend_img, function(base64Img, img) {
                    wind10_legend = {
                        type: 'PNG'
                    };
                    wind10_legend.src = base64Img;
                    wind10_legend.w = img.width;
                    wind10_legend.h = img.height;
                }, undefined, "wind10_img_legend");

                convertImgToDataURL(rh2mz3_11_img, function(base64Img, img) {
                    rh2mz3_11 = {
                        type: 'PNG'
                    };
                    rh2mz3_11.src = base64Img;
                    rh2mz3_11.w = img.width;
                    rh2mz3_11.h = img.height - 122;
                }, undefined, "rh2mz3_11_img");

                convertImgToDataURL(rh2mz3_14_img, function(base64Img, img) {
                    rh2mz3_14 = {
                        type: 'PNG'
                    };
                    rh2mz3_14.src = base64Img;
                    rh2mz3_14.w = img.width;
                    rh2mz3_14.h = img.height - 122;
                }, undefined, "rh2mz3_14_img");

                convertImgToDataURL(rh2mz3_17_img, function(base64Img, img) {
                    rh2mz3_17 = {
                        type: 'PNG'
                    };
                    rh2mz3_17.src = base64Img;
                    rh2mz3_17.w = img.width;
                    rh2mz3_17.h = img.height - 122;
                }, undefined, "rh2mz3_17_img");

                convertImgToDataURL(rh2mz3_20_img, function(base64Img, img) {
                    rh2mz3_20 = {
                        type: 'PNG'
                    };
                    rh2mz3_20.src = base64Img;
                    rh2mz3_20.w = img.width;
                    rh2mz3_20.h = img.height - 122;
                }, undefined, "rh2mz3_20_img");

                convertImgToDataURL(rh2mz3_img_legend, function(base64Img, img) {
                    rh2mz3_legend = {
                        type: 'PNG'
                    };
                    rh2mz3_legend.src = base64Img;
                    rh2mz3_legend.w = img.width;
                    rh2mz3_legend.h = img.height;
                }, undefined, "rh2mz3_img_legend");

                convertImgToDataURL(ffwi_img, function(base64Img, img) {
                    ffwi = {
                        type: 'PNG'
                    };
                    ffwi.src = base64Img;
                    ffwi.w = img.width;
                    ffwi.h = img.height;
                }, undefined, "ffwi_img");

                convertImgToDataURL(ffwi_legend_img, function(base64Img, img) {
                    ffwi_legend = {
                        type: 'PNG'
                    };
                    ffwi_legend.src = base64Img;
                    ffwi_legend.w = img.width;
                    ffwi_legend.h = img.height;
                }, undefined, "ffwi_legend_img");

                convertImgToDataURL(umidita_img, function(base64Img, img) {
                    umidita = {
                        type: 'PNG'
                    };
                    umidita.src = base64Img;
                    umidita.w = img.width;
                    umidita.h = img.height;
                }, undefined, "umidita_img");

                convertImgToDataURL(umidita_legend_img, function(base64Img, img) {
                    umidita_legend = {
                        type: 'PNG'
                    };
                    umidita_legend.src = base64Img;
                    umidita_legend.w = img.width;
                    umidita_legend.h = img.height;
                }, undefined, "umidita_legend_img");

                convertImgToDataURL(rddd_img, function(base64Img, img) {
                    rddd = {
                        type: 'PNG'
                    };
                    rddd.src = base64Img;
                    rddd.w = img.width;
                    rddd.h = img.height;
                }, undefined, "rddd_img");

                convertImgToDataURL(rddd_legend_img, function(base64Img, img) {
                    rddd_legend = {
                        type: 'PNG'
                    };
                    rddd_legend.src = base64Img;
                    rddd_legend.w = img.width;
                    rddd_legend.h = img.height;
                }, undefined, "rddd_legend_img");

                //!pdf builder
                var createPDF = function(update_preview) {
                    _y = page_margin; // vertical starting point

                    // form data
                    var bollettino_title = $('#bollettino-title')[0].innerText;
                    var bollettino_title_giorno = $('#bollettino-title-giorno')[0].innerHTML;
                    var bollettino_rischio = $('#bollettino-rischio').val();
                    var cosa_abbiamo_avuto_lbl = $('#cosa-abbiamo-avuto-label')[0].innerHTML;
                    var cosa_ci_aspettiamo_lbl = $('#cosa-ci-aspettiamo-label')[0].innerHTML;
                    var num_progressivo = $('#num-progressivo').val();
                    var sinottica_text = $('#sinottica-text')[0].innerHTML;
                    var flyer_title_size = 10;
                    var bollettino_abbiamo_avuto = $('#bollettino-abbiamo-avuto').val();
                    var bollettino_ci_aspettiamo = $('#bollettino-ci-aspettiamo').val();
                    var rischio_text = $('#rischio-text')[0].innerText;
                    var situazione_meteo_text = $('#situazione-meteo-text')[0].innerHTML;
                    var rh2mz3_ore_12 = $('#rh2mz3-11-ora-text')[0].innerHTML;
                    var rh2mz3_ore_15 = $('#rh2mz3-14-ora-text')[0].innerHTML;
                    var rh2mz3_ore_18 = $('#rh2mz3-17-ora-text')[0].innerHTML;
                    var rh2mz3_ore_21 = $('#rh2mz3-20-ora-text')[0].innerHTML;

                    var pdf = new jsPDF('p', 'mm', page_size, true);
                    var text_baseline;
                    // some colors:
                    var light_grey = 237;
                    var grey = 128;
                    var black = 0;
                    var white = 255;

                    // Optional - set properties of the document
                    pdf.setProperties({
                        title: bollettino_title,
                        subject: footer,
                        author: 'Consorzio LaMMA',
                        creator: 'Consorzio LaMMA'
                    });

                    // !logo
                    var aib_logo_size = imgSizes(aib_logo.w, aib_logo.h, 60);
                    pdf.addImage(aib_logo.src, 'PNG', 0, 0, 15, 15);

                    var lamma_logo_size = imgSizes(lamma_logo.w, lamma_logo.h, 60);
                    pdf.addImage(lamma_logo.src, 'PNG', 180, 0, 30, 13);

                    // fonts initializing
                    pdf.setFont("helvetica");
                    pdf.setFontType("bold");

                    // !main title
                    pdf.setTextColor(51, 122, 183);
                    pdf.setFontSize(12);

                    lineHeight = px2mm(pdf.getLineHeight(bollettino_title));

                    _y += (aib_logo_size.h + vspace + lineHeight);

                    pdf.textAlign(bollettino_title, {
                        align: "center"
                    }, 0, _y - 35);

                    pdf.setFontSize(flyer_title_size);

                    pdf.setTextColor(255, 0, 0);

                    pdf.textAlign(bollettino_title_giorno, {
                        align: "center"
                    }, 0, _y - 30);

                    pdf.setTextColor(51, 122, 183);

                    pdf.setFontSize(8);

                    pdf.textAlign(num_progressivo, {
                        align: "left"
                    }, 150, _y - 30);

                    pdf.textAlign(rischio_text, {
                        align: "center"
                    }, 0, 17);

                    function setRectProp(bollettino_rischio) {
                        switch (bollettino_rischio) {
                            case "BASSO":
                                return {
                                    color: hex2rgb("#3CBC3D"),
                                    x: 99,
                                    w: 12
                                }
                                break;
                            case "MODERATO":
                                return {
                                    color: hex2rgb("#FFE600"),
                                    x: 96,
                                    w: 18
                                }
                                break;
                            case "ALTO":
                                return {
                                    color: hex2rgb("#FF7D00"),
                                    x: 100,
                                    w: 10
                                }
                                break;
                            case "MOLTO ALTO":
                                return {
                                    color: hex2rgb("#C80000"),
                                    x: 95,
                                    w: 21
                                }
                                break;
                            case "ESTREMO":
                                return {
                                    color: hex2rgb("#B5199D"),
                                    x: 97,
                                    w: 16
                                }
                                break;
                            default:

                        }

                    }

                    var rectProp = setRectProp(bollettino_rischio);

                    pdf.setFillColor(rectProp.color.red, rectProp.color.green, rectProp.color.blue);
                    pdf.roundedRect(rectProp.x, 18, rectProp.w, 4, 1, 1, 'F');
                    pdf.setTextColor(255, 255, 255);
                    pdf.textAlign(bollettino_rischio, {
                        align: "center"
                    }, 0, 21);
                    pdf.setTextColor(51, 122, 183);

                    pdf.textAlign("Indice FWI previsto per oggi", {
                        align: "left"
                    }, 10, 27);

                    pdf.textAlign("(comportamento del fuoco - pericolosità potenziale)", {
                        align: "left"
                    }, 10, 31);

                    pdf.textAlign("Umidità relativa massima registrata nella notte", {
                        align: "right"
                    }, 194, 27);

                    // !user image
                    if (liz3_14_img) {
                        var img_sizes_ffwi = imgSizes(ffwi.w, ffwi.h, 100);
                        pdf.addImage(ffwi.src, ffwi.type, 10, 32, img_sizes_ffwi.w / 1.5, img_sizes_ffwi.h / 1.5, undefined, 'FAST');

                        var img_sizes_ffwi_legend = imgSizes(ffwi_legend.w, ffwi_legend.h, 50);
                        pdf.addImage(ffwi_legend.src, ffwi_legend.type, 60, 32, img_sizes_ffwi_legend.w / 2.0, img_sizes_ffwi_legend.h / 2.0, undefined, 'FAST');

                        var img_sizes_umidita = imgSizes(umidita.w, umidita.h, 100);
                        pdf.addImage(umidita.src, umidita.type, 131, 32, img_sizes_umidita.w / 1.5, img_sizes_umidita.h / 1.5, undefined, 'FAST');

                        var img_sizes_umidita_legend = imgSizes(umidita_legend.w, umidita_legend.h, 40);
                        pdf.addImage(umidita_legend.src, umidita_legend.type, 182, 32, img_sizes_umidita_legend.w / 2.5, img_sizes_umidita_legend.h / 2.5, undefined, 'FAST');

                        var img_sizes_rddd = imgSizes(rddd.w, rddd.h, 100);
                        pdf.addImage(rddd.src, rddd.type, 5, 194, img_sizes_rddd.w / 1.5, img_sizes_rddd.h / 1.5, undefined, 'FAST');

                        var img_sizes_rddd_legend = imgSizes(rddd_legend.w, rddd_legend.h, 25);
                        pdf.addImage(rddd_legend.src, rddd_legend.type, 60, 194, img_sizes_rddd_legend.w / 2.0, img_sizes_rddd_legend.h / 2.0, undefined, 'FAST');

                        // var img_sizes_zt500 = imgSizes(zt500.w, zt500.h, content_width);
                        // pdf.addImage(zt500.src, zt500.type, 5, 195, img_sizes_zt500.w / 2.2, img_sizes_zt500.h / 2.2, undefined, 'FAST');
                        // _y += img_sizes_zt500.h;

                        // var img_sizes_zt500_legend = imgSizes(zt500_legend.w, zt500_legend.h, content_width);
                        // pdf.addImage(zt500_legend.src, zt500_legend.type, 15, 257, img_sizes_zt500_legend.w / 2.8, img_sizes_zt500_legend.h / 2.8, undefined, 'FAST');
                        // _y += img_sizes_zt500_legend.h;

                        var img_sizes_liz3_14 = imgSizes(liz3_14.w, liz3_14.h, content_width);
                        pdf.addImage(liz3_14.src, liz3_14.type, 109, 195, img_sizes_liz3_14.w / 2.2, img_sizes_liz3_14.h / 2.2, undefined, 'FAST');
                        // _y += img_sizes_liz3_14.h;



                        // var img_sizes_zt850 = imgSizes(zt850.w, zt850.h, content_width);
                        // pdf.addImage(zt850.src, zt850.type, 109, 195, img_sizes_zt850.w / 2.2, img_sizes_zt850.h / 2.2, undefined, 'FAST');
                        // _y += img_sizes_zt850.h;
                        //
                        // var img_sizes_zt850_legend = imgSizes(zt850_legend.w, zt850_legend.h, content_width);
                        // pdf.addImage(zt850_legend.src, zt850_legend.type, 117, 257, img_sizes_zt850_legend.w / 2.8, img_sizes_zt850_legend.h / 2.8, undefined, 'FAST');
                        // _y += img_sizes_zt850_legend.h;
                    } else {
                        // if we haven't an image, a grey box with a text is added
                        var box_height = 80;

                        pdf.setFillColor(light_grey);
                        pdf.roundedRect(page_margin, _y, content_width, box_height, 5, 5, 'F');
                        pdf.setFontSize(60);
                        pdf.setTextColor(white);
                        _string = 'IMMAGINE';
                        lineHeight = px2mm(pdf.getLineHeight(_string));

                        // y_correction: value to be added to y coord of the grey box to have text vertically centered
                        // it is empirically calculated adding 1/3 of text line height to half box height
                        y_correction = box_height / 2 + lineHeight / 3;

                        pdf.textAlign(_string, {
                            align: "center"
                        }, 0, _y + y_correction);

                        _y += box_height;
                    }


                    pdf.textAlign(cosa_abbiamo_avuto_lbl, {
                        align: "left"
                    }, 3, 109);

                    pdf.textAlign(cosa_ci_aspettiamo_lbl, {
                        align: "right"
                    }, 152, 109);

                    if (sinottica_text) {
                        pdf.setFontSize(8);
                        pdf.setFont("helvetica");
                        pdf.setFontType("italic");
                        pdf.setTextColor(black);
                        _y = 261;
                        var lineWidth = 200;
                        // var lineWidth = content_width - (circle_radius * 2) - (page_margin * 2);
                        _y += page_margin;

                        var line_height = 4; // mm

                        var description_lines = pdf.splitTextToSize(sinottica_text, lineWidth);
                        //pdf.text(page_margin, _y, description_lines); // doesn't allows to change line spacing

                        for (var i = 0; i < description_lines.length; i++) {
                            if (window.CP.shouldStopExecution(1)) {
                                break;
                            }
                            pdf.text(description_lines[i], 3, _y);
                            _y += line_height;
                        }
                        window.CP.exitedLoop(1);
                    }

                    if (bollettino_abbiamo_avuto) {
                        pdf.setFontSize(7);
                        pdf.setFont("helvetica");
                        pdf.setFontType("italic");
                        pdf.setTextColor(grey);
                        _y = 112;
                        var lineWidth = 90;
                        // var lineWidth = content_width - (circle_radius * 2) - (page_margin * 2);
                        _y += page_margin;

                        var line_height = 4; // mm

                        var description_lines = pdf.splitTextToSize(bollettino_abbiamo_avuto, lineWidth);
                        //pdf.text(page_margin, _y, description_lines); // doesn't allows to change line spacing

                        for (var i = 0; i < description_lines.length; i++) {
                            if (window.CP.shouldStopExecution(1)) {
                                break;
                            }
                            pdf.text(description_lines[i], 3, _y);
                            _y += line_height;
                        }
                        window.CP.exitedLoop(1);
                    }

                    if (bollettino_ci_aspettiamo) {
                        pdf.setFontSize(7);
                        pdf.setFont("helvetica");
                        pdf.setFontType("italic");
                        pdf.setTextColor(grey);
                        _y = 112;
                        var lineWidth = 90;
                        // var lineWidth = content_width - (circle_radius * 2) - (page_margin * 2);
                        _y += page_margin;

                        var line_height = 4; // mm

                        var description_lines = pdf.splitTextToSize(bollettino_ci_aspettiamo, lineWidth);
                        //pdf.text(page_margin, _y, description_lines); // doesn't allows to change line spacing

                        for (var i = 0; i < description_lines.length; i++) {
                            if (window.CP.shouldStopExecution(1)) {
                                break;
                            }
                            // var regExp = /\*([^*]+)\*/;
                            // var matches = regExp.exec(description_lines[i]);

                            // if (matches) {
                            // 	var splitString = description_lines[i].split("*");
                            // 	var startIndex = description_lines[i].indexOf("*");
                            // 	var lastIndex = description_lines[i].lastIndexOf("*");
                            // 	var prova = description_lines[i];
                            // 	var stringArray = [];

                            // 	var stringArrayIndices = [];
                            // 	var vero = true;
                            // 	description_lines[i].split('').forEach(function (c, b) {
                            // 		if (c === "*") {
                            // 			vero = !vero;
                            // 			stringArrayIndices.push({"stringa": b, "inizio": vero});
                            // 		}
                            // 	});

                            // 	stringArrayIndices.forEach(function (a,b,c) {
                            // 		if (b === 0) {
                            // 			stringArray.push(c[b].inizio ? prova.substr(0, c[b].stringa) : prova.substr(0, c[b].stringa).replace(/\*/gi, ""));
                            // 		} else {
                            // 			stringArray.push(c[b].inizio ? prova.substr(c[b-1].stringa, c[b].stringa-c[b-1].stringa) : prova.substr(c[b-1].stringa, c[b].stringa-c[b-1].stringa).replace(/\*/gi, ""));
                            // 		}

                            // 	})
                            // 	var spaziatura = 118;
                            // 	var stringLength;
                            // 	stringArray.forEach(function(a,b,c) {
                            // 		if (b !== 0) {
                            // 			var notStar = c[b-1].replace(/\*/gi, "");
                            // 			var noSpace = notStar.replace(/\s/gi, "");
                            // 			stringLength = noSpace.length;
                            // 			spaziatura += stringLength*1.7;
                            // 		}
                            // 		if (a.startsWith("*")){
                            // 			pdf.setFontSize(8);
                            // 			pdf.setFont("helvetica");
                            // 			pdf.setFontType("bold");
                            // 			pdf.setTextColor(0, 0, 0);
                            // 			pdf.text(a.replace(/\*/gi, ""), spaziatura, _y);
                            // 		} else {
                            // 			pdf.setFontSize(8);
                            // 			pdf.setFont("helvetica");
                            // 			pdf.setFontType("bold");
                            // 			pdf.setTextColor(grey);
                            // 			pdf.text(a, spaziatura, _y);
                            // 		}
                            // 	})
                            // 	_y += line_height;
                            // } else {
                            // 	pdf.setFontSize(8);
                            // 	pdf.setFont("helvetica");
                            // 	pdf.setFontType("bold");
                            // 	pdf.setTextColor(grey);
                            // 	pdf.text(description_lines[i], 118, _y);
                            // 	_y += line_height;
                            // }

                            pdf.text(description_lines[i], 120, _y);
                            _y += line_height;
                        }
                        window.CP.exitedLoop(1);
                    }

                    pdf.setFont("helvetica");
                    pdf.setFontType("bold");
                    pdf.setTextColor(51, 122, 183);
                    pdf.setFontSize(8);

                    // pdf.textAlign(situazione_meteo_text, {
                    //     align: "center"
                    // }, 0, 192);

                    pdf.textAlign("Indice DC previsto per oggi", {
                        align: "left"
                    }, 3, 192);

                    pdf.textAlign("DESCRIZIONE:", {
                        align: "left"
                    }, 3, 266);

                    // !price
                    // first: creating a circle that overlaps the bottom side of the image
                    var circle_radius = 30;
                    // color_array = hex2rgb(flyer_price_color);
                    // pdf.setFillColor(color_array.red, color_array.green, color_array.blue);
                    //
                    // // _x and _y refer to center of the circle
                    // _x = content_width - circle_radius; // circle ends at `page_margin` millimeters from the image right side
                    //
                    // pdf.circle(_x, _y, circle_radius, 'F'); // circle overlaps image for 1/2 of its height
                    //
                    // pdf.setFontSize(60);
                    // pdf.setFont("times");
                    // pdf.setFontType("bold");
                    //
                    // _string = flyer_price_currency + parseInt(flyer_price); // decimals are removed
                    //
                    // lineHeight = px2mm(pdf.getLineHeight(_string));
                    // y_correction = lineHeight / 3;
                    //
                    // pdf.setTextColor(white);
                    // pdf.textAlign(_string, {
                    //     align: "centerAtX"
                    // }, _x, _y + y_correction);

                    pdf.addPage();

                    // fonts initializing
                    pdf.setFont("helvetica");
                    pdf.setFontType("bold");

                    // !main title
                    pdf.addImage(aib_logo.src, 'PNG', 0, 0, 15, 15);
                    pdf.addImage(lamma_logo.src, 'PNG', 180, 0, 30, 13);

                    pdf.setTextColor(51, 122, 183);
                    pdf.setFontSize(12);
                    pdf.textAlign(bollettino_title, {
                        align: "center"
                    }, 0, 5);


                    pdf.setFontSize(flyer_title_size);
                    pdf.setTextColor(255, 0, 0);
                    pdf.textAlign(bollettino_title_giorno, {
                        align: "center"
                    }, 0, 10);
                    pdf.setTextColor(51, 122, 183);
                    pdf.setFontSize(8);
                    pdf.textAlign(situazione_meteo_text, {
                        align: "center"
                    }, 0, 16);

                    // pdf.textAlign("SITUAZIONE SINOTTICA", {
                    // 	align: "left"
                    // }, 0, 21);

                    _y += vspace;

                    if (liz3_14_img) {
                        // var img_sizes_zt500 = imgSizes(zt500.w, zt500.h, content_width);
                        // pdf.addImage(zt500.src, zt500.type, 5, 22, img_sizes_zt500.w / 2.5, img_sizes_zt500.h / 2.5, undefined, 'FAST');
                        // _y += img_sizes_zt500.h;

                        // var img_sizes_zt500_legend = imgSizes(zt500_legend.w, zt500_legend.h, content_width);
                        // pdf.addImage(zt500_legend.src, zt500_legend.type, 9, 78, img_sizes_zt500_legend.w / 2.8, img_sizes_zt500_legend.h / 2.8, undefined, 'FAST');
                        // _y += img_sizes_zt500_legend.h;

                        // var img_sizes_zt850 = imgSizes(zt850.w, zt850.h, content_width);
                        // pdf.addImage(zt850.src, zt850.type, 121, 22, img_sizes_zt850.w / 2.5, img_sizes_zt850.h / 2.5, undefined, 'FAST');
                        // _y += img_sizes_zt850.h;

                        // var img_sizes_zt850_legend = imgSizes(zt850_legend.w, zt850_legend.h, content_width);
                        // pdf.addImage(zt850_legend.src, zt850_legend.type, 125, 78, img_sizes_zt850_legend.w / 2.8, img_sizes_zt850_legend.h / 2.8, undefined, 'FAST');
                        // _y += img_sizes_zt850_legend.h;

                        var img_sizes_t2max = imgSizes(t2max.w, t2max.h, content_width);
                        pdf.addImage(t2max.src, t2max.type, 5, 26, img_sizes_t2max.w / 2.2, img_sizes_t2max.h / 2.2, undefined, 'FAST');
                        _y += img_sizes_t2max.h;

                        var img_sizes_t2max_legend = imgSizes(t2max_legend.w, t2max_legend.h, content_width);
                        pdf.addImage(t2max_legend.src, t2max_legend.type, 14, 98, img_sizes_t2max_legend.w / 2.7, img_sizes_t2max_legend.h / 2.7, undefined, 'FAST');
                        _y += img_sizes_t2max_legend.h;

                        var img_sizes_wind10 = imgSizes(wind10.w, wind10.h, content_width);
                        pdf.addImage(wind10.src, wind10.type, 111, 26, img_sizes_wind10.w / 2.2, img_sizes_wind10.h / 2.2, undefined, 'FAST');
                        _y += img_sizes_wind10.h;

                        var img_sizes_wind10_legend = imgSizes(wind10_legend.w, wind10_legend.h, content_width);
                        pdf.addImage(wind10_legend.src, wind10_legend.type, 120, 97, img_sizes_wind10_legend.w / 2.7, img_sizes_wind10_legend.h / 2.7, undefined, 'FAST');
                        _y += img_sizes_wind10_legend.h;

                        // pdf.textAlign("VARIABILI METEOROLOGICHE", {
                        // 	align: "left"
                        // }, 0, 147);

                        pdf.textAlign(rh2mz3_ore_12, {
                            align: "left"
                        }, 45, 110);

                        pdf.textAlign(rh2mz3_ore_15, {
                            align: "left"
                        }, 150, 110);

                        var img_sizes_rh2mz3_11 = imgSizes(rh2mz3_11.w, rh2mz3_11.h, content_width);
                        pdf.addImage(rh2mz3_11.src, rh2mz3_11.type, 0, 112, img_sizes_rh2mz3_11.w / 2.0, img_sizes_rh2mz3_11.h / 2.0, undefined, 'FAST');
                        _y += img_sizes_rh2mz3_11.h;

                        var img_sizes_rh2mz3_14 = imgSizes(rh2mz3_14.w, rh2mz3_14.h, content_width);
                        pdf.addImage(rh2mz3_14.src, rh2mz3_14.type, 106, 112, img_sizes_rh2mz3_14.w / 2.0, img_sizes_rh2mz3_14.h / 2.0, undefined, 'FAST');
                        _y += img_sizes_rh2mz3_14.h;

                        pdf.textAlign(rh2mz3_ore_18, {
                            align: "left"
                        }, 45, 204);

                        pdf.textAlign(rh2mz3_ore_21, {
                            align: "left"
                        }, 150, 204);

                        var img_sizes_rh2mz3_legend = imgSizes(rh2mz3_legend.w, rh2mz3_legend.h, 70);
                        pdf.addImage(rh2mz3_legend.src, rh2mz3_legend.type, 90, 192, img_sizes_rh2mz3_legend.w / 2.2, img_sizes_rh2mz3_legend.h / 2.2, undefined, 'FAST');
                        _y += img_sizes_rh2mz3_legend.h;

                        var img_sizes_rh2mz3_17 = imgSizes(rh2mz3_17.w, rh2mz3_17.h, content_width);
                        pdf.addImage(rh2mz3_17.src, rh2mz3_17.type, 0, 206, img_sizes_rh2mz3_17.w / 2.0, img_sizes_rh2mz3_17.h / 2.0, undefined, 'FAST');
                        _y += img_sizes_rh2mz3_17.h;

                        var img_sizes_rh2mz3_20 = imgSizes(rh2mz3_20.w, rh2mz3_20.h, content_width);
                        pdf.addImage(rh2mz3_20.src, rh2mz3_20.type, 106, 206, img_sizes_rh2mz3_20.w / 2.0, img_sizes_rh2mz3_20.h / 2.0, undefined, 'FAST');
                        _y += img_sizes_rh2mz3_20.h;
                    }

                    // !footer
                    // _y = 287;
                    // pdf.setFontSize(9);
                    // pdf.setFontType("normal");
                    // pdf.setTextColor(black);
                    // pdf.textAlign(footer, {
                    //     align: "center"
                    // }, 0, _y);

                    // ****************************
                    // output
                    if (update_preview) {
                        preview_container.attr('src', pdf.output('datauristring'));
                    } else {
                        pdf.save(bollettino_title + " " + formatData + '.pdf');
                        download_button.prop('disabled', false);
                        waitingDialog.hide();
                    }

                }; // end createPDF

                // !buttons
                // update_preview_button.click(function() {
                //     createPDF(true);
                // });

                $('#flyer_download_btn').on("click", function() {
                    download_button.prop('disabled', true);
                    waitingDialog.show("Creazione PDF in corso...", {
                        dialogSize: 'sm',
                        progressType: 'warning'
                    });
                    setTimeout(function() {
                        createPDF(false);
                    }, 1000);
                });
                // createPDF(true);
            } catch (e) {
                console.log(e);
            }
        }
    }

    rawFile.send();
})()

//# sourceURL=pen.js
