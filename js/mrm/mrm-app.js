var animIntervalUp;
var animIntervalDown;
var $hs = mrm.$('.hotspot');
var isPan = false;
var reelFrame = 3;
var $panzoom = null;
var _isZoomMode = false;
var setting_show_hotspot = true;
var setting_animate_hotspot = true;
var setting_app_width = 1280;
var setting_app_height = 551;
var setting_diff_pos = 0;

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

function showPicture(fileName) {
    mrm.$.fancybox.open({
        href: 'img/hotspot/' + ((isRetinaDisplay()) ? fileName + "@2x.jpg" : fileName + ".jpg"),
        padding: 0,
        width: 892,
        maxWidth: 892,
        height: 341,
        maxHeight: 341,
        autoResize: false,
        openEffect: 'elastic',
        closeEffect: 'elastic'
    });
};

function setHotspot(frame, x, y, link) {
    hotspot = {
        link: {
            attr: {
                'class': 'image-box',
                'data-fancybox-group': 'gallery',
                'href': 'javascript:showPicture("' + link + '");',
                'data-image': link
            }
        },
        start: frame,
        end: frame,
        x: x,
        y: y
    };
    return hotspot;
}

function setHotspotReel() {
    var hotspot = {
        "hotspot_01_01": setHotspot(1, 622, 329 + setting_diff_pos, 'SplitDualPortGrille'),
        "hotspot_01_02": setHotspot(1, 773, 274 + setting_diff_pos, 'Headlamp'),
        "hotspot_02_01": setHotspot(2, 415, 332 + setting_diff_pos, 'SplitDualPortGrille'),
        "hotspot_02_02": setHotspot(2, 581, 273 + setting_diff_pos, 'Headlamp'),
        "hotspot_03_01": setHotspot(3, 250, 331 + setting_diff_pos, 'SplitDualPortGrille'),
        "hotspot_03_02": setHotspot(3, 393, 276 + setting_diff_pos, 'Headlamp'),
        "hotspot_04_01": setHotspot(4, 164, 325 + setting_diff_pos, 'SplitDualPortGrille'),
        "hotspot_04_02": setHotspot(4, 264, 273 + setting_diff_pos, 'Headlamp'),
        "hotspot_10_01": setHotspot(10, 676, 142 + setting_diff_pos, 'HiddenRearDoorHandle'),
        "hotspot_11_01": setHotspot(11, 545, 147 + setting_diff_pos, 'HiddenRearDoorHandle'),
        "hotspot_12_01": setHotspot(12, 433, 152 + setting_diff_pos, 'HiddenRearDoorHandle'),
        "hotspot_13_01": setHotspot(13, 357, 156 + setting_diff_pos, 'HiddenRearDoorHandle'),
        "hotspot_14_01": setHotspot(14, 1076, 322 + setting_diff_pos, 'SplitDualPortGrille'),
        "hotspot_14_02": setHotspot(14, 334, 157 + setting_diff_pos, 'HiddenRearDoorHandle'),
        "hotspot_15_01": setHotspot(15, 985, 322 + setting_diff_pos, 'SplitDualPortGrille'),
        "hotspot_15_02": setHotspot(15, 350, 163 + setting_diff_pos, 'HiddenRearDoorHandle'),
        "hotspot_16_01": setHotspot(16, 826, 331 + setting_diff_pos, 'SplitDualPortGrille'),
        "hotspot_16_02": setHotspot(16, 927, 274 + setting_diff_pos, 'Headlamp'),
    };
    return (setting_show_hotspot) ? hotspot : {};
}
mrm.$(window).load(function () {


    mrm.$('#image').reel({
        images: ((isRetinaDisplay()) ? 'img/exterior@2x/##.jpg' : 'img/exterior/##.jpg'),
        cw: true,
        frame: 1,
        frames: 16,
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
    }).bind("frameChange", function (e, d, frame) {
        imageZoomBindReelFrame();
    }).bind('pan', function (e) {
        e.preventDefault();
        imageZoomBindReelFrame();
    }).bind('down', function (e) {
        //  console.log('down');
    }).bind('up', function (e, d, frame) {
        // console.log('up', reelFrame);
        // imageZoomBindReelFrame();
        imageZoomBindReelFrame();
    }).bind('openingDone', function () {
        imageModeSelect('reel-mode');
        imageZoomInit();
        setTimeout(function () {
            var counter = 1;
            var i = setInterval(function () {
                mrm.$('#image').reel('frame', mrm.$('#image').reel('frame') - 1);
                counter++;
                if (counter === 15) {
                    clearInterval(i);
                    mrm.$('.freez').remove();
                    setTimeout(function () {
                        mrm.$('.navigation').stop().animate({
                            'bottom': -29,
                        }, 200);
                    }, 100)
                    $hs = mrm.$('div[id^="hotspot_"]');
                    if (!(navigator.userAgent.match(/Mobi/))) {
                        var hotspotStatic;
                        hotspotStatic = mrm.$('<img/>', {
                            'src': 'img/hotspot.png',
                        }).prependTo(mrm.$('#image-reel')).remove();
                        $hs.find('a').css({
                            //'border': '1px solid blue',
                        });
                        $hs.mouseenter(function () {
                            hotspotStatic = mrm.$('<img/>', {
                                'src': 'img/hotspot.png',
                            }).prependTo(mrm.$('#image-reel'));
                            hotspotStatic.css({
                                'position': 'absolute',
                                'z-index': '1',
                                'top': mrm.$(this).position().top,
                                'left': mrm.$(this).position().left,
                                'width': 36,
                                'height': 36,
                            });
                            mrm.$(this).css({
                                'background-size': '0'
                            });
                        });
                        $hs.find('a').mouseleave(function () {
                            mrm.$(this).parent().css({
                                'background-size': ''
                            });
                            hotspotStatic.remove();
                        });
                    }
                    $hs.css({
                        'visibility': 'visible',
                    });
                    animateUp();
                    imageZoomBindReelFrame();
                    mrm.$('.zoom-mode').css({
                        'display': 'block'
                    });
                }
            }, 100);
        }, 1000);
    });
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
    var $reelDiv = mrm.$('.screen-reel');
    var $zoomDiv = mrm.$('.screen-zoom');
    if (modeName === 'zoom-mode') {
        $reelDiv.css({
            'z-index': 10
        });
        $zoomDiv.css({
            'z-index': 20,
            'visibility': 'visible'
        });
    } else if (modeName === 'reel-mode') {
        $reelDiv.css({
            'z-index': 20
        });
        $zoomDiv.css({
            'z-index': 10,
            'visibility': 'hidden'
        });
        if ($panzoom !== null) {}
    }
}

function imageZoomInit() {
    $panzoom = mrm.$("img.zoom").panzoom({
        disablePan: false,
        contain: 'invert',
        minScale: 1,
        maxScale: 2,
        rangeStep: 0.25,
        cursor: 'move',
        transition: false,
        $zoomIn: mrm.$('#btn-zoomin'),
        $zoomOut: mrm.$('#btn-zoomout'),
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
    var currentImg = mrm.$('img.reel').attr('src');

    function setSrcToBackground(img) {
        var canvas = document.createElement('canvas');
        img.style.backgroundImage = "url('" + currentImg + "')";
        img.style.backgroundRepeat = 'no-repeat';
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        img.src = canvas.toDataURL();
    }
    setSrcToBackground(mrm.$('img.zoom')[0]);
}


/* START OF: CONTROL NAVIGATION */
mrm.$(function () {

    mrm.$('.screen').css({
        'visibility': 'visible',
        'width': setting_app_width,
        'height': setting_app_height,
        'margin-left': -(setting_app_width / 2),
        'margin-top': -(setting_app_height / 2)
    });

    var reeling = false;
    var clickTime = false;

    function nextFrame() {
        mrm.$('#image').reel('frame', mrm.$('#image').reel('frame') - 1);
    }

    function previousFrame() {
        mrm.$('#image').reel('frame', mrm.$('#image').reel('frame') + 1);
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
    mrm.$('#btn-back').mousedown(function () {
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
        var currentImg = mrm.$('img.reel').attr('src');
        mrm.$('img.zoom').attr('src', currentImg);
    });
    // BUTTON BACK
    mrm.$('#btn-next').mousedown(function () {
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
        var currentImg = mrm.$('img.reel').attr('src');
        mrm.$('img.zoom').attr('src', currentImg);
    });
    // BUTTON BAR 
    mrm.$('.navigation').mouseenter(function () {
        mrm.$(this).stop().animate({
            'bottom': 0,
        }, 200);
    }).mouseleave(function () {
        mrm.$(this).stop().animate({
            'bottom': -29,
        }, 200);
    });
});
/* END OF: CONTROL NAVIGATION */