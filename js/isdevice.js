function isMobile() {
    var status = false;
    if (($.ua.platform.name === "android") || ($.ua.platform.name === "ipad") || ($.ua.platform.name === "iphone")) {
        status = true;
    }

    return status;
}


function isPlatform(v) {
    var status = false;
    if ($.ua.platform.name === v) {
        status = true;
    }
    return status;
}

function isBrowser(v) {
    var status = false;
    if ($.ua.browser.name === v) {
        status = true;
    }

    return status;
}

function  isVersion(v) {
    var status = false;
    if (parseInt($.ua.browser.version) === v) {
        status = true;
    }
    
    return status;
}


function isIE8() {
    var is = false;
    
        
            if ((isBrowser("msie")) && 
                (isVersion(8)) && 
                (isPlatform("win"))) {
                is = true;    
            }
            
    return is;
}

function isIE9() {
    var is = false;
    
        
            if ((isBrowser("msie")) && 
                (isVersion(9)) && 
                (isPlatform("win"))) {
                is = true;    
            }
            
    return is;
}


function isIE10() {
    var is = false;
    
        
            if ((isBrowser("msie")) && 
                (isVersion(10)) && 
                (isPlatform("win"))) {
                is = true;    
            }
            
    return is;
}
