(function() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "../../aib_bollettino/assets/img/data.txt", true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            var dataText = rawFile.responseText;
            document.getElementById("bollettino-title-giorno").innerHTML = dataText;
            $('#ffwi-image').attr('src', "http://geoportale.lamma.rete.toscana.it/cgi-bin/wms_rischio_prev?map=wms_"+dataText.substring(0,4)+"/ris_prev_incendio_wms_"+dataText+".map&service=WMS&version=1.1.0&request=GetMap&layers=Comuni_Rfff_Run0_"+dataText+",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");
            $('#umidita-image').attr('src', "http://geoportale.lamma.rete.toscana.it/cgi-bin/wms_datimeteo?map=wms_"+dataText.substring(0,4)+"/datimeteo_wms_"+dataText+".map&service=WMS&version=1.1.0&request=GetMap&layers=Umid_maxur_sp_"+dataText+",Comuni&styles=default&bbox=548174.875,4670721.0,787174.875,4933721.0&width=465&height=512&srs=EPSG:32632&format=image/png");
        }
    }

    rawFile.send();
})()