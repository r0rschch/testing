var krpanoObj;

function krpanoReady(krpano) {
    krpanoObj = krpano;
    //console.log('KrpanoObj:: ' + krpanoObj);
}

function loadPano() {
    var html5Mode = "only";  
    if(isIE9() || isIE8()){  html5Mode = "auto"; } //never
     
    var viewer = createPanoViewer({
        swf: "js/krpano_1_18_2.swf",
        id: "krpanoSWFObject",
        target: "pano",
        onready: krpanoReady,
        html5: html5Mode,
        onpreviewcomplete: function () {

        }
    });

    viewer.addVariable("xml", "krpano.xml");
    //viewer.addVariable("license", "krpano.license")
    viewer.passQueryParameters();
    viewer.addParam("wmode", "opaque");
    viewer.addVariable();
    viewer.embed();
    //removepano("pano");


    if ($('.screen-interior').hasClass('screen-active')) {
        $('.freez').remove();
    }

}

function loadScene(sceneName) {
    //    var grade;
    //    if (getGrade() === "standard") {
    //        grade = "sd";
    //        $('#text-hotspot').css('visibility', 'hidden');
    //    } else {
    //        grade = "ls";
    //        $('#text-hotspot').css('visibility', 'visible');
    //        showHotspotIN();
    //    }
    //    var sceneName = grade + "_" + getWallpaper();
    //console.log('KRPANO: ' + sceneName);

    //if (!isPlatform('msie') && (!isVersion(8) && !isVersion(7)))
    //{ 
    krpanoObj.call("loadscene(" + sceneName + ")");
    //}
}

function showFancyBox(url) { //popup interior 
    $('.img-ctrl ').css("z-index", "8029"); //fixed popup 
   
    if (isPlatform("win")) {
        widthFancyBox = 683;
    } else if (isPlatform("mac")) {
        widthFancyBox = 685;
    } else {
        widthFancyBox = 685;
    }
    url = url.replace("|", "&"); 

    var href = 'data/image.html?' + url + '&mode=' + getMode().capitalize() + '&model=' + getCurrentModel() + '&size=' + getCurrentDisplay().capitalize(); 

    $.fancybox.open({
        href: href,
        padding: 0,
        type: 'iframe',
        width: 700,
        maxHeight: 467,
        minHeight: 467,
        height: 467,
        autoResize: false,
        openEffect: 'elastic',
        closeEffect: 'elastic',
        afterClose: function(){
            $('.img-ctrl ').css("z-index", "99999"); //fixed popup 
        }
    });
}


// HOTSPOT SHOW/HIDE //
function showHotspotIN(e) {

    var $textHotspot = $('#text-hotspot');
    if ($textHotspot.hasClass('img-button-hotspot-off')) {
        $textHotspot.removeClass('img-button-hotspot-off').addClass('img-button-hotspot-on');


        if (krpanoObj != null) {

            krpanoObj.call("switch(hotspot[s1].visible);switch(hotspot[s2].visible);switch(hotspot[s3].visible);switch(hotspot[s4].visible);switch(hotspot[s5].visible);switch(hotspot[s6].visible);switch(hotspot[s7].visible);switch(hotspot[s8].visible);switch(hotspot[s9].visible);switch(hotspot[s10].visible);switch(hotspot[s11].visible);switch(hotspot[s12].visible);");
        }
    }

}

function hideHotspotIN(e) {

    var $textHotspot = $('#text-hotspot');
    if ($textHotspot.hasClass('img-button-hotspot-on')) {
        $textHotspot.removeClass('img-button-hotspot-on').addClass('img-button-hotspot-off');

        if (krpanoObj != null) {

            krpanoObj.call("switch(hotspot[s1].visible);switch(hotspot[s2].visible);switch(hotspot[s3].visible);switch(hotspot[s4].visible);switch(hotspot[s5].visible);switch(hotspot[s6].visible);switch(hotspot[s7].visible);switch(hotspot[s8].visible);switch(hotspot[s9].visible);switch(hotspot[s10].visible);switch(hotspot[s11].visible);switch(hotspot[s12].visible);");
        }
    }

}

function forceShowHotspotIN() {
    if (krpanoObj != null) {
  krpanoObj.call("set(hotspot[s1].visible, true);set(hotspot[s2].visible, true);set(hotspot[s3].visible, true);set(hotspot[s4].visible, true);set(hotspot[s5].visible, true);set(hotspot[s6].visible, true);set(hotspot[s7].visible, true);set(hotspot[s8].visible, true);set(hotspot[s9].visible, true);set(hotspot[s10].visible, true);set(hotspot[s11].visible, true);set(hotspot[s12].visible, true);");
    }
}

function forceHideHotspotIN() {
    if (krpanoObj != null) {
  krpanoObj.call("set(hotspot[s1].visible, false);set(hotspot[s2].visible, false);set(hotspot[s3].visible, false);set(hotspot[s4].visible, false);set(hotspot[s5].visible, false);set(hotspot[s6].visible, false);set(hotspot[s7].visible, false);set(hotspot[s8].visible, false);set(hotspot[s9].visible, false);set(hotspot[s10].visible, false);set(hotspot[s11].visible, false);set(hotspot[s12].visible, false);");
    }
}