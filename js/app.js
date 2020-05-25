var reelFrameCurrent = null;
var isFirst = true;


String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        if (mq && mq.matches || (window.devicePixelRatio > 1)) {
            return true;
        } else {
            return false;
        }
    }
}

function showPicture(fileName) { //popup exterior
    $('.img-ctrl ').css("z-index", "8029"); //fixed popup

    var href = 'data/image.html?' + fileName + '&mode=' + getMode().capitalize() + '&model=' + getCurrentModel() + '&size=' + getCurrentDisplay().capitalize(); 

    $.fancybox({
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
        beforeShow: function () {
            $('#btn-rotate').css('display', 'none');
            if ($.ua.platform.name + $.ua.browser.name + $.ua.engine.name == "androidsafariwebkit") {
                $('#fancybox-loading, .fancybox-overlay').attr('style', function (i, s) {
                    return s + 'width: auto !important;height: auto !important;'
                });
            }
        },
        beforeClose: function () {
            $('#btn-rotate').css('display', '');
        },
        afterClose: function(){
            $('.img-ctrl ').css("z-index", "99999"); //fixed popup 
        }
    });
};


var getMode = function () {

    return ($('.screen-exterior').hasClass('screen-active')) ? 'exterior' : 'interior';


}

var getCurrentFrame = function () {
    return reelFrameCurrent;
}
var getCurrentModel = function () {
    return $('.menu-model ul li a.pure-button-active').attr('data-folder');
};

var getCurrentColor = function () {
    return $('.menu-color ul li a.pure-button-active').attr('data-folder');
}

var getCurrentBg = function () {
    return $('.menu-bg ul li a.pure-button-active').attr('data-folder');
}

var getCurrentDisplay = function () {
    return ((isRetinaDisplay()) ? "retina" : "normal");
}

var getCurrentPath = function () {
    return ('img/' + getCurrentModel() + '/' + getCurrentModel() + '_' + getCurrentColor() + '_' + getCurrentBg() + '/' + ((isRetinaDisplay()) ? "retina" : "normal") + '/##.jpg');
}


var counterEventPan = 0;

function loadReel(url) {


    // return false;

    if (typeof url === "undefined")
        url = getCurrentPath();



    var frameLoaded = 0;
    var frameTotal = 24
    var frameStart = 23;
    var frameSelect = (reelFrameCurrent == null) ? frameStart : reelFrameCurrent;



    var monitor = $('.screen-reel');
    var f = (frameSelect.toString().length === 1) ? '0' + frameSelect.toString() : frameSelect;
    var sourceImage = url.replace('##', f);


    if (isFirst == false) {
        monitor.empty();
        monitor.append('<img />');
        monitor.find('img').attr('src', sourceImage);
        monitor.find('img').attr('id', 'image');
        monitor.find('img').attr('class', 'reel reel-mode');

    }



    var $img = $('#image');
    if ($('.screen-exterior').hasClass('screen-active')) {

        var $pro = $().progressReel({
            width: 180,
            height: 15,
            backgroundColor: '#FFF'
        });
    }


    $img.reel({
        images: url,
        cw: true,
        frame: frameSelect,
        frames: frameTotal,
        speed: 0.4,
        delay: 999999,
        timeout: 2,
        velocity: 0,
        brake: 0.223,
        throwable: false,
        wheelable: true,
        steppable: false,
        revolution: 500,
        annotations: setHotspotReel(),
    }).bind('loaded', function (e) { 
        if (!isFirst) { 
            if (getCurrentModel() == "GEXP_RHD_REGULAR_RBA")  { 
                $('div[id^="hotspot_"]').css('visibility', 'hidden'); 
            } else {
                if ($('#text-hotspot').hasClass('img-button-hotspot-on')) {
                    showHotspot(); 
                } else {
                    hideHotspot(); 
                }    
            } 
        }
    }).bind('preloaded', function (e) {
        ++frameLoaded; 
        if ($('.screen-exterior').hasClass('screen-active')) {
            var progressValue = (((frameLoaded) / frameTotal) * 100).toFixed(0); 
            if ($pro != null)
                $pro.setValue(progressValue); 
        }

    }).bind("frameChange", function (e, d, frame) {
        reelFrameCurrent = frame;
        //imageZoomBindReelFrame();
    }).bind('pan', function (e) {



        //        if (counterEventPan++ >= 2) {
        //
        //
        //            if (isBrowser('msie')) {
        //
        //                if ((isVersion(9)) || (isVersion(10))) {
        //                    hideElementExteriorForIE(500);
        //                }
        //            } else {
        //
        //                if (!isPlatform("android") &&
        //                    (!isPlatform("ipad")) &&
        //                    (!isPlatform("iphone"))) {
        //                    hideElementExterior(500);
        //                }
        //
        //            }
        //        }
    }).bind('up', function (e) {



        //        counterEventPan = 0;
        //
        //        if (isBrowser('msie')) {
        //            showElementExteriorForIE(500);
        //        } else {
        //
        //            if (!isPlatform("android") &&
        //                (!isPlatform("ipad")) &&
        //                (!isPlatform("iphone"))) {
        //                showElementExterior(500);
        //            }
        //
        //        }

    }).bind('openingDone', function () {

        function onDone() {


            $('.freez').remove();
            setTimeout(function () {
                $('.navigation').stop().animate({
                    'bottom': -29,
                }, 200);
            }, 100)
            $hs = $('div[id^="hotspot_"]');

            $hs.css({
                'visibility': 'visible',
            });
            animateUp();
            $('.zoom-mode').css({
                'display': 'block'
            });



        }


        if (isFirst) {
            isFirst = false;

            $('.img-preload').remove();

            setTimeout(function () {

                var counter = 1;
                var i = setInterval(function () {
                    $('#image').reel('frame', $('#image').reel('frame') + 1);
                    counter++;
                    if (counter === 25) {
                        clearInterval(i);



                        if (($.ua.browser.name === "msie")) { //&& ($.ua.browser.version <= 9)
                            fadeBtnImageForIE();
                        } else {
                            fadeBtnImage();
                        }




                        onDone();

                    }
                }, 100);
            }, 1000);

        } else {
            $('.img-preload').fadeOut(500, function () {
                $(this).remove();
            });
        }









    });
}




function fadeBtnImage() {
    $('#menu, #cap').fadeIn(1000, function () {

        $('#text, #btn-rotate').fadeIn(1000, function () {
            //$('#btn-hotspot-on').click();
            $('#ctrl-cab-crew').removeClass('show-cap').addClass('hide-cap');
            $('#wallpaper').removeClass('show-wallpaper').addClass('hide-wallpaper');
            $('div[id^="hotspot_"]').css('visibility', 'visible');

            if (($.ua.platform.name === "android") || ($.ua.platform.name === "ipad")) {
                $('section#btn-rotate').remove();
                //$('section#menu').remove();
                //$('section#cap').remove();
                //$('section#text').remove();
            }

            //clearLoadReel();
        });

    });
}

function fadeBtnImageForIE() {


    var timeFade = 1000;

    var $menu = $('#menu');
    $menu.find('img#img-button-switch').css('display', 'none');
    $menu.css('display', 'block');
    //$menu.find('img#img-button-switch').fadeIn(timeFade);

    var $cap = $('#cap');
    $cap.find('div[id^="ctrl-cab-"]').removeClass('hide-cap');
    $cap.find('div[id^="ctrl-cab-"]').removeClass('active-cap');
    $cap.find('div[id^="ctrl-cab-"]').removeClass('show-cap');
    $cap.find('#ctrl-cab-extended').css('left', -120);
    $cap.find('#ctrl-cab-single').css('left', -120);
    $cap.find('div[id^="ctrl-cab-"]').css('display', 'none');
    $cap.css('display', 'block');
    //$cap.find('div[id^="ctrl-cab-"]').fadeIn(timeFade);

    var counter = 0;
    $('div[id^="ctrl-cab-"], img#img-button-switch').fadeIn(timeFade - 100, function () {

        if (counter++ >= 1)
            return false;

        //console.log(counter);
        var $btnRotate = $('#btn-rotate');
        $btnRotate.find('*').css('display', 'none');
        $btnRotate.css('display', 'block');
        $btnRotate.find('#ctrl-next').fadeIn(timeFade);
        $btnRotate.find('#ctrl-back').fadeIn(timeFade);

        var $text = $('#text');
        $text.find(' > *').css('display', 'none');
        $text.css('display', 'block');
        $text.find('#text-logo').fadeIn(timeFade);
        $text.find('#text-detail').fadeIn(timeFade);
        $text.find('#text-color').fadeIn(timeFade);
        $text.find('#text-grade').fadeIn(timeFade);
        $text.find('#text-hotspot').fadeIn(timeFade);
        $text.find('#wallpaper').removeClass('show-wallpaper').fadeIn(timeFade, function () {
            //$(this).addClass('show-wallpaper');
        });



        $('#ctrl-color').find('ul, li').css('display', 'none');
        $('#ctrl-color').css('display', 'block');
        $('#ctrl-color').find('ul, li').fadeIn(timeFade, function () {

            // RESET ELEMENT AFTER ANIMATION SHOW FINISHED
            $('#menu, #text, #ctrl-switch-exin, #text-grade, #cap, #text-color, #ctrl-color, #text-logo, #text-detail, #btn-rotate, #wallpaper, #text-hotspot, div[id^="ctrl-cab-"]').fadeIn(2000, function () {
                var resetPosition = setTimeout(function () {



                    var timeSlide = 800;
                    var $cabCrew = $('#ctrl-cab-crew');
                    $cabCrew.stop().animate({
                        left: -120
                    }, timeSlide, function () {
                        $(this).removeClass('show-cap').addClass('hide-cap');
                        $cap.find('div[id^="ctrl-cab-"]').addClass('hide-cap');
                        $cap.find('#ctrl-cab-crew').addClass('active-cap');
                    });


                    var $wallpaper = $('#wallpaper');
                    $wallpaper.stop().animate({
                        bottom: -33
                    }, timeSlide, function () {
                        $(this).removeClass('show-wallpaper').addClass('hide-wallpaper');
                    });
                    $('div[id^="hotspot_"]').css('visibility', 'visible');



                    //clearLoadReel();
                    clearTimeout(resetPosition);

                }, 500);
            });


        });

    });
}


$(window).load(function () {
    loadReel();
});

function animateStop() {
    clearInterval(animIntervalUp);
    clearInterval(animIntervalDown);
}

function animateDown() {
    animateStop();

    if (!setting_animate_hotspot) {
        return false;
    }

    var posTop = 828;
    var loopIndex = 23;
    animIntervalDown = setInterval(function () {
        if (loopIndex == 0) {
            clearInterval(animIntervalDown);
            animateUp();
            return false;
        }
        $hs.css({
            'background-position': '0  ' + (posTop -= 36) + 'px',
        });
        loopIndex--;
    }, 50);
}

function animateUp() {
    animateStop();
    if (!setting_animate_hotspot) {
        return false;
    }
    var posTop = 0;
    var loopIndex = 0;
    animIntervalUp = setInterval(function () {
        if (loopIndex == 23) {
            clearInterval(animIntervalUp);
            animateDown();
            return false;
        }
        $hs.css({
            'background-position': '0  ' + (posTop += 36) + 'px',
        });
        loopIndex++;
    }, 50);
}

function imageModeSelect(modeName) {
    //alert(modeName);
    var $reelDiv = $('.screen-reel');
    var $zoomDiv = $('.screen-zoom');
    if (modeName === 'zoom-mode') {
        $reelDiv.css({
            'z-index': 21,
            'opacity': 0,
        });
        $zoomDiv.css({
            'z-index': 20,
            'visibility': 'visible'
        });
    } else if (modeName === 'reel-mode') {
        $reelDiv.css({
            'z-index': 20,
            'opacity': 1,
        });
        $zoomDiv.css({
            'z-index': 10,
            'visibility': 'hidden'
        });
        if ($panzoom !== null) {}
    }
}

function imageZoomInit() {
    $panzoom = $("img.zoom").panzoom({
        disablePan: false,
        contain: 'invert',
        minScale: 1,
        maxScale: 2,
        rangeStep: 0.25,
        cursor: 'move',
        transition: false,
        $zoomIn: $('#btn-zoomin'),
        $zoomOut: $('#btn-zoomout'),
        onChange: function (e, a, d) {
            //console.log(d);
        },
        onEnd: function (e) {},
        onZoom: function (e, a, d) {
            e.preventDefault();
            if (d === 1) {
                imageModeSelect('reel-mode');
            } else {
                imageModeSelect('zoom-mode');
            }
        },
    }).on('mousewheel.focal', function (e) {
        e.preventDefault();
        //        var delta = e.delta || e.originalEvent.wheelDelta;
        //        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        //
        //        $panzoom.panzoom('zoom', zoomOut, {
        //            increment: 0.1,
        //            animate: false,
        //            focal: e
        //        });
    });
}

function imageZoomBindReelFrame() {
    var currentImg = $('img.reel').attr('src');

    function setSrcToBackground(img) {
        var canvas = document.createElement('canvas');
        img.style.backgroundImage = "url('" + currentImg + "')";
        img.style.backgroundRepeat = 'no-repeat';
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        img.src = canvas.toDataURL();
    }
    setSrcToBackground($('img.zoom')[0]);
}



/* START OF: CONTROL NAVIGATION */
$(function () {




    var liquidPanel;

    if (isMobile() === false) {
        $('#slider-ex-in').liquidSlider({
            continuous: false,
            firstPanelToLoad: liquidPanel,
            autoSlideControls: false,
            dynamicTabs: false,
            dynamicArrows: false,
            autoSliderDirection: false,
            keyboardNavigation: false,
            crossLinks: true,
            slideEaseFunction: 'linear',
            slideEaseDuration: 800, //timeSwitchExIn,
            preloader: false,
            swipe: false,
            mobileNavigation: false,
            callforwardFunction: function () {


                $('#ctrl-switch-exin, #text-grade, #text-color, #ctrl-color, #text-logo, #text-detail, #btn-rotate').fadeOut(500);
                $('#cap').fadeOut(500);
                $('#ctrl-cab-crew').fadeOut(500);
                $('#ctrl-cab-extended').fadeOut(500);
                $('#ctrl-cab-single').fadeOut(500);
            },
            callbackFunction: function () {





                if ($('.screen-interior').hasClass('screen-active')) {
                    showGradeLsOnly();
                    $('#text-grade').css('top', '129px')
                    $('#ctrl-switch-exin, #text-grade').fadeIn(500);




                } else {


                    $('#text-grade').removeClass('img-button-grade-ls-only');

                    $('#text-grade').css('top', '149px')
                    $('#ctrl-switch-exin, #text-grade,   #text-color, #ctrl-color, #text-logo, #text-detail, #btn-rotate').fadeIn(500);
                    $('#cap').fadeIn(500);
                    $('#ctrl-cab-crew').fadeIn(500);
                    $('#ctrl-cab-extended').fadeIn(500);
                    $('#ctrl-cab-single').fadeIn(500);


                    //if (!isPlatform('msie') && (!isVersion(8) && !isVersion(7))) {
                        if (krpanoObj != null) {
                            if (getGrade() === "ls") {
                                krpanoObj.call("lookat(0,13);");
                            } else {
                                krpanoObj.call("lookat(0,13);");
                            }
                        }
                    //}

                }
            }
        });
    }


    var reeling = false;
    var clickTime = false;

    function nextFrame() {
        $('#image').reel('frame', $('#image').reel('frame') - 1);
    }

    function previousFrame() {
        $('#image').reel('frame', $('#image').reel('frame') + 1);
    }

    function reelForward() {
        if (!clickTime) {
            clickTime = setInterval(function () {
                nextFrame()
                if (!reeling)
                    reeling = setInterval(reelForward, 100);
            }, 150);
        }
    }

    function reelBackward() {
        if (!clickTime) {
            clickTime = setInterval(function () {
                previousFrame();
                if (!reeling)
                    reeling = setInterval(reelBackward, 100);
            }, 150);
        }
    }

    function reelClear() {
        clearInterval(clickTime);
        clickTime = false;
        clearInterval(reeling);
        reeling = false;
    }
    // BUTTON NEXT 
    $('#ctrl-next').mousedown(function () {
        if (!_isZoomMode)
            reelForward();
    }).mouseout(function () {
        if (!_isZoomMode)
            reelClear();
    }).mouseup(function () {
        if (!_isZoomMode)
            reelClear();
    }).click(function () {
        nextFrame();
        var currentImg = $('img.reel').attr('src');
        $('img.zoom').attr('src', currentImg);
    });
    // BUTTON BACK
    $('#ctrl-back').mousedown(function () {
        if (!_isZoomMode)
            reelBackward();
    }).mouseout(function () {
        if (!_isZoomMode)
            reelClear();
    }).mouseup(function () {
        if (!_isZoomMode)
            reelClear();
    }).click(function () {
        previousFrame();
        var currentImg = $('img.reel').attr('src');
        $('img.zoom').attr('src', currentImg);
    });
    // BUTTON BAR 
    $('.navigation').mouseenter(function () {
        $(this).stop().animate({
            'bottom': 0,
        }, 200);
    }).mouseleave(function () {
        $(this).stop().animate({
            'bottom': -29,
        }, 200);
    });





    /******************/

    //var imagePreloadReelCallBack = function(){};
    function imagePreloadReel(oldPath, newPath) {

        var number = (reelFrameCurrent === null) ? 3 : reelFrameCurrent;
        var frameImage = (number).toString();
        frameImage = (frameImage.length === 1) ? '0' + frameImage.toString() : frameImage;

        var src = oldPath.replace('##', frameImage);

        var $preloadImage = $('<img />', {
            'class': 'img-preload',
            'style': 'z-index:9;position:absolute;left:0;top:0;width:100%;height:100%',
            'src': src
        });

        if ($('.screen-interior').hasClass('screen-active')) {
            $preloadImage.css({
                'display': 'none'
            });
        }



        $preloadImage.load(function () {
            $(this).prependTo('.container');
            loadReel(newPath);
        });


        return $preloadImage;
    }




    // MODEL
    $('.menu-model ul li a').click(function () {
        if ($(this).hasClass('pure-button-disabled'))
            return;
        var oldPath = getCurrentPath();
        $('.menu-model ul li a').removeClass('pure-button-active');
        $(this).addClass('pure-button-active');
        var folder = $(this).attr('data-folder');
        var newPath = getCurrentPath();
       
        imagePreloadReel(oldPath, newPath);
    });

    // COLOR
    $('.menu-color ul li a').click(function () {
        if ($(this).hasClass('pure-button-disabled'))
            return;
        var oldPath = getCurrentPath();
        $('.menu-color ul li a').removeClass('pure-button-active');
        $(this).addClass('pure-button-active');
        var folder = $(this).attr('data-folder');
        var newPath = getCurrentPath();
        imagePreloadReel(oldPath, newPath);
    });

    // BG
    $('.menu-bg ul li a').click(function () {
        if ($(this).hasClass('pure-button-disabled'))
            return;
        var oldPath = getCurrentPath();
        $('.menu-bg ul li a').removeClass('pure-button-active');


        var selectedIndex = $(this).attr('data-index');



        $(this).addClass('pure-button-active');
        var folder = $(this).attr('data-folder');
        var newPath = getCurrentPath();
        imagePreloadReel(oldPath, newPath);
    });






    // EVENT BUTTON WALLPAPER
    var timeSlideBg = 500;
    $('#btn-wallpaper').mouseenter(function () {
        var $wallpaper = $(this).parent();
        $wallpaper.stop();
        if ($.ua.browser.name === "msie") {
            $wallpaper.animate({
                bottom: 0
            }, timeSlideBg, function () {
                $wallpaper.removeClass('hide-wallpaper').addClass('show-wallpaper');
            });
        } else {
            $wallpaper.removeClass('hide-wallpaper').addClass('show-wallpaper');
        }

    }).mouseleave(function () {

        var $wallpaper = $(this).parent();
        $wallpaper.stop();
        if ($.ua.browser.name === "msie") {
            $wallpaper.animate({
                bottom: -33
            }, timeSlideBg, function () {
                $wallpaper.removeClass('hide-wallpaper').addClass('show-wallpaper');
            });
        } else {
            $wallpaper.removeClass('show-wallpaper').addClass('hide-wallpaper');
        }

    });
    // EVENT BUTTON CAP EXTENDED & SINGLE & CREW
    var timeSlide = 500;
    $('div[id^="ctrl-cab-"]').mouseenter(function () {


        if ($(this).hasClass('hide-cap')) {
            if ($.ua.browser.name === "msie") {
                var timeSlideIE = timeSlide;
                if(checkIE10()){ timeSlideIE = 50; }
                $(this).animate({
                    left: 0
                }, timeSlideIE, function () {
                    $(this).removeClass('hide-cap').addClass('show-cap');
                });
            } else {
                $(this).removeClass('hide-cap').addClass('show-cap');
            }
        }
    }).mouseleave(function () {

        $(this).stop();
        if ($.ua.browser.name === "msie") {
            var timeSlideIE = timeSlide;
            if(checkIE10()){ timeSlideIE = 50; }
            $(this).animate({
                left: -120
            }, timeSlideIE, function () {
                $(this).removeClass('show-cap').addClass('hide-cap');
            });
        } else {
            $(this).removeClass('show-cap').addClass('hide-cap');
        }
    });




    // EVENT BUTTON MENU SWITCH EXTERIOR & INTERIOR
    $('#btn-switch').click(function () {
        if ($('#ctrl-switch-exin').hasClass('switch-close')) {
            $('#ctrl-switch-exin').animate({
                right: '-=210px'
            }, 500, function () {

                var urlMenuImg = '';
                if ($('#img-button-switch').hasClass('select-ex')) {
                    urlMenuImg = 'css/images/btn_ex_open.png';
                } else {
                    urlMenuImg = 'css/images/btn_in_open.png';
                }

                $('#img-button-switch').attr('src', urlMenuImg);
                $('#ctrl-switch-exin').removeClass('switch-close').addClass('switch-open');
            });
        } else {
            $('#ctrl-switch-exin').animate({
                right: '+=210px'
            }, 500, function () {

                var urlMenuImg = '';
                if ($('#img-button-switch').hasClass('select-ex')) {
                    urlMenuImg = 'css/images/btn_ex_close.png';
                } else {
                    urlMenuImg = 'css/images/btn_in_close.png';
                }

                $('#img-button-switch').attr('src', urlMenuImg);
                $('#ctrl-switch-exin').removeClass('switch-open').addClass('switch-close');
            });
        }
    });

    // START OF: CHANGE COLOR 
    $('#ctrl-color ul li a').click(function () {
        $('#ctrl-color ul li a').removeClass('active-color');
        $(this).addClass('active-color');
        var $a = $('.menu-color ul li a[data-folder="' + $(this).attr('data-folder') + '"]');
        $a.trigger('click');
    });


    // START OF: CHNAGE WALLPAPER
    $('#btn-wallpaper').click(function () {
        var $bg = $(this).parent('#wallpaper');

        var _bg = '_';
        if ($bg.hasClass('bg-concrete')) {
            $('.menu-bg ul li a[data-index="1"]').trigger('click');
            $bg.removeClass('bg-concrete').addClass('bg-warehouse');
            _bg += 'B';
        } else {

            $('.menu-bg ul li a[data-index="0"]').trigger('click');
            $bg.removeClass('bg-warehouse').addClass('bg-concrete');
            _bg += 'A';
        }

        var sceneName = (getGrade() ? "RBA" : "RBA") + '_BG' + _bg;
        loadScene(sceneName);
        if ($('#text-hotspot').hasClass('img-button-hotspot-on')) {
            forceShowHotspotIN();
        } else {
            forceHideHotspotIN();
        }
    });


    // START OF: CHAGE CAP TYPE
    $('#ctrl-cab-extended, #ctrl-cab-single, #ctrl-cab-crew, #btn-grade-starndard, #btn-grade-ls').click(function (e) {

        if ($('.screen-interior').hasClass('screen-active')) {
            if (($(this).attr('id') == "btn-grade-starndard") || ($(this).attr('id') == "btn-grade-ls")) {
                return false;
            }
        }

        var selectedCab = $(this).attr('data-folder'); 
        if (typeof selectedCab != "undefined") {
            if (selectedCab == "crew") {
                $('.menu-model ul li a[data-index="0"]').trigger('click'); 
                 //custom
                $('#text-grade').removeClass('img-button-grade-ls-only').removeClass('img-button-grade-standard').addClass('img-button-grade-ls');
                $('#text-grade').attr('data-folder', 'ls'); 
            } else if (selectedCab == "extended") {
                $('.menu-model ul li a[data-index="2"]').trigger('click');
            } else if (selectedCab == "regular") {
                $('.menu-model ul li a[data-index="3"]').trigger('click');
            }
        } else {

            var bgName = $(this).parent('#wallpaper').hasClass('bg-concrete') ? 'B' : 'A'; 
            
            if (getGrade() == "ls") {
                $('.menu-model ul li a[data-index="0"]').trigger('click');
                loadScene('RBA_BG_B'); 
            } else if (getGrade() == "standard") {
                $('.menu-model ul li a[data-index="1"]').trigger('click');
                loadScene('RBA_BG_B');
            }
        }

        var counter = 0
        var $menuGrade = $('#ctrl-switch-exin, #text-grade');
        var $ctrlColor = $('#text-color, #ctrl-color');
        var $textHotspot = $('#text-hotspot');
        var $textGrade = $('#text-grade');

        $textHotspot.css('visibility', '');
        $textHotspot.fadeOut(500);
        $menuGrade.fadeOut(500);
        $ctrlColor.fadeOut(500, function () { 
            if (++counter === 1) { 
                if ((getCurrentModel() === "GEXP_RHD_CREW_RBD")) {

                    $('#text-detail')
                        .removeClass('text-detail-crew-ls')
                        .removeClass('text-detail-crew-sd')
                        .removeClass('text-detail-extend')
                        .removeClass('text-detail-regular')

                    $('#text-detail').addClass('text-detail-crew-ls') 
                    $('#text-color').removeClass('text-color-top');
                    $('#ctrl-color').removeClass('nav-color-top');
                    $textGrade.removeClass('text-grade-top');
                    $menuGrade.fadeIn(500);
 
                    if ($('.screen-exterior').hasClass('screen-active'))
                        $ctrlColor.fadeIn(500); 
                    
                } else if (getCurrentModel() === "GEXP_RHD_CREW_RBA") {

                    $('#text-detail')
                        .removeClass('text-detail-crew-ls')
                        .removeClass('text-detail-crew-sd')
                        .removeClass('text-detail-extend')
                        .removeClass('text-detail-regular')

                    $('#text-detail').addClass('text-detail-crew-sd');
                    $('#text-color').addClass('text-color-top');
                    $('#ctrl-color').addClass('nav-color-top');
                    $textGrade.addClass('text-grade-top'); 
                    $ctrlColor.fadeIn(500);
                    $textGrade.fadeIn(500);

                } else {

                    $('#text-detail')
                        .removeClass('text-detail-crew-ls')
                        .removeClass('text-detail-crew-sd')
                        .removeClass('text-detail-extend')
                        .removeClass('text-detail-regular')

                    if (getCurrentModel() == "GEXP_RHD_EXTENDED_RBD") {
                        $('#text-detail').addClass('text-detail-extend')
                    } else if (getCurrentModel() == "GEXP_RHD_REGULAR_RBA") {
                        $('#text-detail').addClass('text-detail-regular')
                    }
 
                    $('#text-color').addClass('text-color-top');
                    $('#ctrl-color').addClass('nav-color-top');

                    if ($('.screen-exterior').hasClass('screen-active'))
                        $ctrlColor.fadeIn(500);
                }


                if ((getCurrentModel() === "GEXP_RHD_CREW_RBA") || (getCurrentModel() === "GEXP_RHD_CREW_RBD") || (getCurrentModel() === "GEXP_RHD_EXTENDED_RBD")) {

                    $textHotspot.fadeIn(500);
                    (($textHotspot.hasClass('img-button-hotspot-on')) ? showHotspot() : hideHotspot()); 
                    
                } else { 
                    $textHotspot.hide(500);
                } 
            }
        });

    });


    var timeSwitchExIn = 2000;
    var timeLoading = timeSwitchExIn - 500;
    var timeFadeOut = timeLoading - 300;
    // START OF: SWITCH INTERIOR
    $('#btn-in').click(function () {
        //custom 
        if($('#text-hotspot').hasClass('img-button-hotspot-off')){ 
            hideHotspot();
            forceHideHotspotIN(); 
        }else if($('#text-hotspot').hasClass('img-button-hotspot-on')){
            showHotspot();
            forceShowHotspotIN();  
        } 

        if ($('.screen-interior').hasClass('screen-active'))
            return false;

        $('.screen-exterior').removeClass('screen-active');
        $('.screen-interior').addClass('screen-active');



        /*
        			if (isBrowser('msie') && isVersion(8)) {
						$('#btn-in, #btn-ex, #btn-switch').css('display','none');
					}
					*/


        //if (!isPlatform('msie') && (!isVersion(8) && !isVersion(7))) {
            if (krpanoObj != null) {
                if (getGrade() === "ls") {
                    krpanoObj.call("lookat(0,13);");
                } else {
                    krpanoObj.call("lookat(0,13);");
                }
            }
        //}

        $('#img-button-switch').removeClass('select-ex').addClass('select-in');
        $('#img-button-switch').attr('src', 'css/images/btn_in_close.png');
        $('#loading, #text-loading').fadeIn(timeLoading, function () {
            $(this).fadeOut(timeFadeOut, function () {


            });
        });




        if (isMobile() === true) {
            $('#ctrl-switch-exin, #text-grade, #cap, #text-color, #ctrl-color, #text-logo, #text-detail, #btn-rotate').fadeOut(500);
            $('.screen-exterior').animate({
                left: -960
            }, 1000, function () {

            });

            $('.screen-interior').animate({
                left: 0
            }, 1000, function () {
                $('#text-grade').css('top', '129px')
                $('#ctrl-switch-exin, #text-grade').fadeIn(500);
            });
        }

        //$.session.set('screen', 'interior');
    });

    // EVENT BUTTON SWITCH EXTERIOR
    $('#btn-ex').click(function () {
        //custom
        if($('#text-hotspot').hasClass('img-button-hotspot-off')){ 
            hideHotspot();
            forceHideHotspotIN(); 
        }else if($('#text-hotspot').hasClass('img-button-hotspot-on')){
            showHotspot();
            forceShowHotspotIN(); 
        } 

        if ($('.screen-exterior').hasClass('screen-active'))
            return false;

        $('.screen-exterior').addClass('screen-active');
        $('.screen-interior').removeClass('screen-active');



        $('#monitor, section#frame, #loading, #progressBar').css('visibility', 'visible');
        $('#img-button-switch').removeClass('select-in').addClass('select-ex');
        $('#img-button-switch').attr('src', 'css/images/btn_ex_close.png');
        $('#loading, #text-loading').fadeIn(timeLoading, function () {
            $(this).fadeOut(timeFadeOut, function () {});
        });

        var $screenExIn = $('.screen-exterior, .screen-interior');

        $('#ctrl-switch-exin, #text-grade, #cap, #text-color, #ctrl-color, #text-logo, #text-detail, #btn-rotate').fadeOut(500);

        if (isMobile() === true) {
            $('.screen-exterior').animate({
                left: 0
            }, 1000, function () {

            });

            $('.screen-interior').animate({
                left: 960
            }, 1000, function () {


                $('#text-grade').css('top', '149px')
                $('#ctrl-switch-exin, #text-grade, #cap, #text-color, #ctrl-color, #text-logo, #text-detail, #btn-rotate').fadeIn(500);
            });
        }

        //$.session.set('screen', 'exterior');
    });

});

function checkIE10() {
    var is = false; 
            if ((isBrowser("msie")) && 
                (isVersion(10)) && 
                (isPlatform("win"))) {
                is = true;    
            }
            
    return is;
}


// GRADE SELECTED //
function showGradeStandard(e) {

    if ($('.screen-interior').hasClass('screen-active'))
        return false;

    var $textGrade = $('#text-grade'); //$(e).parent('#text-grade'); //custom
    $textGrade.removeClass('img-button-grade-ls-only').removeClass('img-button-grade-ls').addClass('img-button-grade-standard');
    $textGrade.attr('data-folder', 'standard');
}

function showGradeLs(e) {

    if ($('.screen-interior').hasClass('screen-active'))
        return false;

    var $textGrade = $('#text-grade'); //$(e).parent('#text-grade'); //custom
    $textGrade.removeClass('img-button-grade-ls-only').removeClass('img-button-grade-standard').addClass('img-button-grade-ls');
    $textGrade.attr('data-folder', 'ls');
}

function showGradeLsOnly() {
    var $textGrade = $('#text-grade');
    //    $textGrade.removeClass('img-button-grade-standard');
    //    $textGrade.removeClass('img-button-grade-ls');
    $textGrade.addClass('img-button-grade-ls-only');
    $textGrade.attr('data-folder', 'ls');
}

(function ($) {

    var $progress;
    var $state;
    var $span;
    var $boxLoadWait;
    $.fn.progressReel = function (options) {

        var settings = $.extend({
            width: "90%",
            height: "15",
            backgroundColor: '#000',
        }, options);

        var marginLeft = -(settings.width / 2);
        var marginTop = -(settings.height / 2);

        $progress = $('<div/>', {
            'class': 'progress',
            style: '' + //'background-color:' + settings.backgroundColor +
                ';width:' + settings.width + 'px;margin-left:' + marginLeft + 'px;' +
                'height:' + settings.height + 'px;margin-top:' + marginTop + 'px;' +
                'opacity:0.5;-moz-opacity: 0.50;-khtml-opacity: 0.50;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha"(Opacity=50);filter: progid:DXImageTransform.Microsoft.Alpha(opacity=50);filter:alpha(opacity=50);'
        });

        $state = $('<div/>', {
            'class': 'state',
            style: 'width:0%;',
        }).appendTo($progress);

        $span = $('<span/>', {
            html: '1%'
        }).appendTo($state);

        $boxLoadWait = $('<div />', {
            'class': 'box-wait-load',
        }).prependTo('.container.screen');


        $('.container.screen').prepend($progress);

        return this;
    }

    $.fn.setValue = function (v) {
        $state.css({
            'width': v + '%'
        });
        $span.html(v + '%');

        if (parseInt(v) === 100) {
            var t = setTimeout(function () {
                clearTimeout(t);
                $progress.fadeOut(500);
                $boxLoadWait.fadeOut(500, function () {
                    $progress.remove();
                    $boxLoadWait.remove();
                });
            }, 500);

        }
    };

}(jQuery));









function hideElementExteriorForIE(time) {


    var $menu = $('#menu');
    $menu.find('img#img-button-switch').fadeOut(time);

    var $cap = $('#cap');

    $cap.find('div[id^="ctrl-cab-"]').removeClass('hide-cap');
    $cap.find('div[id^="ctrl-cab-"]').removeClass('show-cap');
    $cap.find('div[id^="ctrl-cab-"]').fadeOut(time);

    $('div[id^="hotspot_"]').css('visibility', 'hidden');
    $('#btn-rotate #ctrl-next, #btn-rotate #ctrl-back').fadeOut(time);
    $('#text-color, #text-hotspot, #text-grade, #ctrl-color').fadeOut(time);


    $('#wallpaper').removeClass('show-wallpaper').removeClass('hide-wallpaper');
    $('#wallpaper').css({
        'bottom': -33
    }).removeClass('hide-wallpaper').fadeOut(time);
}

function showElementExteriorForIE(time) {

    var $menu = $('#menu');
    $menu.find('img#img-button-switch').fadeIn(time);

    if ($('#text-hotspot').hasClass('img-button-hotspot-on')) {
        $('div[id^="hotspot_"]').css('visibility', 'visible');
    }

    $('#text-color, #ctrl-color').fadeIn(time);
    $('#wallpaper').css({
        'bottom': -33
    }).fadeIn(time, function () {
        $(this).addClass('hide-wallpaper').removeAttr('style');
    });

    var capType = getCapType();

    if (capType.attr('id') === "ctrl-cab-crew") {
        $('#text-grade').fadeIn(time);
    }

    var showHotspot = isHotspot();
    if (showHotspot) {
        $('#text-hotspot').fadeIn(time);
    }

    var $cap = $('#cap');
    $cap.find('div[id^="ctrl-cab-"]').fadeIn(time, function () {

        $cap.find('div[id^="ctrl-cab-"]').addClass('hide-cap');

    });

    $('#btn-rotate #ctrl-next, #btn-rotate #ctrl-back').fadeIn(time);
}

function hideElementExterior(time) {
    $('div[id^="hotspot_"]').css('visibility', 'hidden');
    $('#cap').fadeOut(time);
    $('#menu').fadeOut(time);
    $('#btn-rotate').fadeOut(time);
    $('#text-color, #text-hotspot, #text-grade, #ctrl-color').fadeOut(time);
    $('#wallpaper').css({
        'bottom': -33
    }).removeClass('hide-wallpaper').fadeOut(time);
}

function showElementExterior(time) {

    if ($('#text-hotspot').hasClass('img-button-hotspot-on')) {
        $('div[id^="hotspot_"]').css('visibility', 'visible');
    }
    $('#text-color, #ctrl-color').fadeIn(time);
    $('#wallpaper').css({
        'bottom': -33
    }).fadeIn(time, function () {
        $(this).addClass('hide-wallpaper').removeAttr('style');
    });

    var capType = getCapType();

    if (capType.attr('id') === "ctrl-cab-crew") {
        $('#text-grade').fadeIn(time);
    }

    var showHotspot = isHotspot();
    if (showHotspot) {
        $('#text-hotspot').fadeIn(time);
    }

    $('#cap').fadeIn(time);
    $('#menu').fadeIn(time);
    $('#btn-rotate').fadeIn(time);
}


function getCapType() {
    return $('#cap').find('.active-cap');
}


function getGrade() {
    return $('#text-grade').attr('data-folder');
}

function hideHotspot() {
    hideHotspotIN();
    var $textHotspot = $('#text-hotspot');
    $textHotspot.removeClass('img-button-hotspot-on').addClass('img-button-hotspot-off');
    $('div[id^="hotspot_"]').css('visibility', 'hidden');

}

function showHotspot() {
    showHotspotIN();
    var $textHotspot = $('#text-hotspot');
    $textHotspot.removeClass('img-button-hotspot-off').addClass('img-button-hotspot-on');
    $('div[id^="hotspot_"]').css('visibility', 'visible');

}

function isHotspot() {
    var status = false;
    var $textHotspot = $('#text-hotspot');
    if (((getCurrentModel() === "GEXP_RHD_REGULAR_RBA") || getCurrentModel() === "GEXP_RHD_EXTENDED_RBD") ||
        (getCurrentModel() === "GEXP_RHD_EXTENDED_RBD")) {
        status = true;
    }

    //console.log(getCapType().attr('data-folder'));
    //console.log(getGrade());
    //console.log(getCapType().attr('data-folder'));

    return status;
}


// HOTSPOT SHOW/HIDE //
function showHotspotIN(e) {

    var $textHotspot = $('#text-hotspot');
    if ($textHotspot.hasClass('img-button-hotspot-off')) {
        $textHotspot.removeClass('img-button-hotspot-off').addClass('img-button-hotspot-on');


        if (krpanoObj != null) {

            krpanoObj.call("switch(hotspot[s1].visible);switch(hotspot[s2].visible);switch(hotspot[s3].visible);switch(hotspot[s4].visible);switch(hotspot[s5].visible);switch(hotspot[s6].visible);switch(hotspot[s7].visible);switch(hotspot[s8].visible);");
        }
    }

}

function hideHotspotIN(e) {

    var $textHotspot = $('#text-hotspot');
    if ($textHotspot.hasClass('img-button-hotspot-on')) {
        $textHotspot.removeClass('img-button-hotspot-on').addClass('img-button-hotspot-off');

        if (krpanoObj != null) {

            krpanoObj.call("switch(hotspot[s1].visible);switch(hotspot[s2].visible);switch(hotspot[s3].visible);switch(hotspot[s4].visible);switch(hotspot[s5].visible);switch(hotspot[s6].visible);switch(hotspot[s7].visible);switch(hotspot[s8].visible);");
        }
    }

}








$(window).load(function () {

    loadPano();
    //    $([
    //        "images/hotspot/exterior/01_Roof_Rail.jpg",
    //        "images/hotspot/exterior/02_Side_View_Mirror.jpg",
    //        "images/hotspot/exterior/03_Projector_Head_Lamp.jpg",
    //        "images/hotspot/exterior/04_Side_Step_Crew.jpg",
    //        "images/hotspot/exterior/05_Rear_Combi_RHD.jpg",
    //        "images/hotspot/exterior/06_Rear_Bumper_EU.jpg",
    //        "images/hotspot/exterior/08_16_Inch_Alloy.jpg",
    //        "images/hotspot/exterior/09_17_Inch_Alloy.jpg",
    //        "images/hotspot/exterior/10_Side_Access_Panel.jpg",
    //        "images/hotspot/exterior/11_Side_Step_Extend.jpg"
    //    ]).preload();
});