function setHotspotReel() {
    var setHotspot = function (frame, x, y, link) {
        hotspot = {
            link: {
                attr: {
                    'class': 'hotspot',
                    'data-fancybox-group': 'gallery',
                    'href': 'javascript:showPicture("' + link + '");',
                    'data-image': link,
                    'data-frame': frame,
                }
            },
            start: frame,
            end: frame,
            x: x,
            y: y
        };
        return hotspot;
    };

    var hotspot = null;
    if (getGrade() === "ls") { 
        hotspot = {
            //
           "hotspot_01_01": setHotspot(15, 526, 163, 'imagefile0=Roof_Rail', ''),
           "hotspot_01_02": setHotspot(16, 514, 172, 'imagefile0=Roof_Rail', ''),
           "hotspot_01_03": setHotspot(17, 488, 169, 'imagefile0=Roof_Rail', ''),
           "hotspot_01_04": setHotspot(18, 463, 160, 'imagefile0=Roof_Rail', ''),
           "hotspot_01_05": setHotspot(19, 438, 155, 'imagefile0=Roof_Rail', ''),
           "hotspot_01_06": setHotspot(20, 412, 146, 'imagefile0=Roof_Rail', ''),
           "hotspot_01_07": setHotspot(21, 390, 134, 'imagefile0=Roof_Rail', ''),
           "hotspot_01_08": setHotspot(22, 373, 126, 'imagefile0=Roof_Rail', ''),
           "hotspot_01_09": setHotspot(23, 367, 121, 'imagefile0=Roof_Rail', ''),

            //
            "hotspot_02_02": setHotspot(2, 588, 193, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_03": setHotspot(3, 541, 200, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_04": setHotspot(4, 497, 205, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_05": setHotspot(5, 444, 210, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_06": setHotspot(6, 395, 210, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_07": setHotspot(7, 352, 206, 'imagefile0=Side_View_Mirror', ''), 
            "hotspot_02_08": setHotspot(8, 309, 200, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_09": setHotspot(9, 284, 199, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_10": setHotspot(10, 274, 194, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_11": setHotspot(11, 279, 193, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_12": setHotspot(12, 298, 190, 'imagefile0=Side_View_Mirror', ''),
            
            //
            "hotspot_03_01": setHotspot(1, 345, 270, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_02": setHotspot(2, 255, 279, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_03": setHotspot(20, 783, 276, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_04": setHotspot(21, 750, 271, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_05": setHotspot(22, 683, 260, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_06": setHotspot(23, 576, 250, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_08": setHotspot(24, 458, 256, 'imagefile0=Projector_Head_Lamp', ''),
            //
            "hotspot_05_01": setHotspot(10, 748, 293, 'imagefile0=Rear_Combi_RHD', ''),
            "hotspot_05_02": setHotspot(11, 619, 327, 'imagefile0=Rear_Combi_RHD', ''),
            "hotspot_05_03": setHotspot(12, 469, 325, 'imagefile0=Rear_Combi_RHD', ''),
            "hotspot_05_04": setHotspot(13, 325, 306, 'imagefile0=Rear_Combi_RHD', ''),
            "hotspot_05_05": setHotspot(14, 220, 293, 'imagefile0=Rear_Combi_RHD', ''),
            "hotspot_05_06": setHotspot(15, 144, 275, 'imagefile0=Rear_Combi_RHD', ''),
            //
            "hotspot_06_02": setHotspot(10, 854, 345, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_03": setHotspot(11, 781, 384, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_04": setHotspot(12, 663, 392, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_05": setHotspot(13, 519, 384, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_06": setHotspot(14, 384, 372, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_07": setHotspot(15, 264, 357, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_08": setHotspot(16, 178, 340, 'imagefile0=Rear_bumper_RHD', ''),
            //
            "hotspot_08_01": setHotspot(3, 436, 393, 'imagefile0=18in_Alloy&imagefile1=16in_Alloy', ''),
            "hotspot_08_02": setHotspot(4, 359, 394, 'imagefile0=18in_Alloy&imagefile1=16in_Alloy', ''),
            "hotspot_08_03": setHotspot(5, 290, 391, 'imagefile0=18in_Alloy&imagefile1=16in_Alloy', ''),
            "hotspot_08_04": setHotspot(6, 235, 388, 'imagefile0=18in_Alloy&imagefile1=16in_Alloy', ''),
            "hotspot_08_05": setHotspot(7, 195, 381, 'imagefile0=18in_Alloy&imagefile1=16in_Alloy', ''),
            "hotspot_08_06": setHotspot(8, 178, 371, 'imagefile0=18in_Alloy&imagefile1=16in_Alloy', ''),
            "hotspot_08_07": setHotspot(9, 180, 358, 'imagefile0=18in_Alloy&imagefile1=16in_Alloy', ''),
            "hotspot_08_08": setHotspot(10, 201, 341, 'imagefile0=18in_Alloy&imagefile1=16in_Alloy', ''),

            //
            "hotspot_11_01": setHotspot(14, 583, 356, 'imagefile0=Side_Step_Crew', ''),
            "hotspot_11_02": setHotspot(15, 537, 363, 'imagefile0=Side_Step_Crew', ''),
            "hotspot_11_03": setHotspot(16, 500, 367, 'imagefile0=Side_Step_Crew', ''),
            "hotspot_11_04": setHotspot(17, 468, 362, 'imagefile0=Side_Step_Crew', ''),
            "hotspot_11_05": setHotspot(18, 423, 355, 'imagefile0=Side_Step_Crew', ''),
            "hotspot_11_06": setHotspot(19, 386, 352, 'imagefile0=Side_Step_Crew', ''),
            "hotspot_11_07": setHotspot(20, 359, 347, 'imagefile0=Side_Step_Crew', ''),
            "hotspot_11_08": setHotspot(21, 333, 342, 'imagefile0=Side_Step_Crew', ''),
            "hotspot_11_09": setHotspot(22, 318, 336, 'imagefile0=Side_Step_Crew', ''),
            "hotspot_11_10": setHotspot(23, 318, 328, 'imagefile0=Side_Step_Crew', ''),

            //
            "hotspot_12_01": setHotspot(1, 613, 301, 'imagefile0=Fog_Lamps', ''),
            "hotspot_12_02": setHotspot(2, 502, 310, 'imagefile0=Fog_Lamps', ''),
            "hotspot_12_03": setHotspot(3, 394, 320, 'imagefile0=Fog_Lamps', ''),
            "hotspot_12_04": setHotspot(4, 305, 320, 'imagefile0=Fog_Lamps', ''),
            "hotspot_12_05": setHotspot(5, 234, 320, 'imagefile0=Fog_Lamps', ''),
 
//            "hotspot_13_01": setHotspot(1, 467, 289, 'imagefile0=S02-Radiator-Grill-Front-Bumper', ''),
//            "hotspot_13_02": setHotspot(2, 349, 297, 'imagefile0=S02-Radiator-Grill-Front-Bumper', ''),
//            "hotspot_13_03": setHotspot(3, 258, 304, 'imagefile0=S02-Radiator-Grill-Front-Bumper', ''),
//            "hotspot_13_04": setHotspot(4, 199, 304, 'imagefile0=S02-Radiator-Grill-Front-Bumper', ''),
//            "hotspot_13_05": setHotspot(22, 789, 277, 'imagefile0=S02-Radiator-Grill-Front-Bumper', ''),
//            "hotspot_13_06": setHotspot(23, 710, 269, 'imagefile0=S02-Radiator-Grill-Front-Bumper', ''),
//            "hotspot_13_08": setHotspot(24, 600, 274, 'imagefile0=S02-Radiator-Grill-Front-Bumper', ''),
        } 
    }
 
    if (getCurrentModel() === "GEXP_RHD_EXTENDED_RBD") { 
        hotspot = { 
            // "hotspot_01_01": setHotspot(15, 526, 163, 'imagefile0=Roof_Rail', ''),
            // "hotspot_01_02": setHotspot(16, 514, 172, 'imagefile0=Roof_Rail', ''),
            // "hotspot_01_03": setHotspot(17, 488, 169, 'imagefile0=Roof_Rail', ''),
            // "hotspot_01_04": setHotspot(18, 463, 160, 'imagefile0=Roof_Rail', ''),
            // "hotspot_01_05": setHotspot(19, 438, 155, 'imagefile0=Roof_Rail', ''),
            // "hotspot_01_06": setHotspot(20, 412, 146, 'imagefile0=Roof_Rail', ''),
            // "hotspot_01_07": setHotspot(21, 390, 134, 'imagefile0=Roof_Rail', ''),
            // "hotspot_01_08": setHotspot(22, 373, 126, 'imagefile0=Roof_Rail', ''),
            // "hotspot_01_09": setHotspot(23, 367, 121, 'imagefile0=Roof_Rail', ''),

            "hotspot_02_02": setHotspot(2, 588, 192, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_03": setHotspot(3, 544, 200, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_04": setHotspot(4, 497, 205, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_05": setHotspot(5, 448, 207, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_06": setHotspot(6, 400, 206, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_07": setHotspot(7, 355, 202, 'imagefile0=Side_View_Mirror', ''), 
            "hotspot_02_08": setHotspot(8, 314, 200, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_09": setHotspot(9, 293, 196, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_10": setHotspot(10, 279, 191, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_11": setHotspot(11, 281, 186, 'imagefile0=Side_View_Mirror', ''),
            "hotspot_02_12": setHotspot(12, 300, 187, 'imagefile0=Side_View_Mirror', ''),

            "hotspot_03_01": setHotspot(1, 343, 263, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_02": setHotspot(2, 254, 276, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_03": setHotspot(3, 189, 284, 'imagefile0=Projector_Head_Lamp', ''), 
            "hotspot_03_04": setHotspot(21, 750, 263, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_05": setHotspot(22, 683, 257, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_06": setHotspot(23, 572, 247, 'imagefile0=Projector_Head_Lamp', ''),
            "hotspot_03_08": setHotspot(24, 454, 253, 'imagefile0=Projector_Head_Lamp', ''),

            "hotspot_05_01": setHotspot(10, 748, 293, 'imagefile0=Rear_Combi_RHD', ''),
            "hotspot_05_02": setHotspot(11, 619, 327, 'imagefile0=Rear_Combi_RHD', ''),
            "hotspot_05_03": setHotspot(12, 466, 325, 'imagefile0=Rear_Combi_RHD', ''),
            "hotspot_05_04": setHotspot(13, 325, 306, 'imagefile0=Rear_Combi_RHD', ''),
            "hotspot_05_05": setHotspot(14, 220, 293, 'imagefile0=Rear_Combi_RHD', ''),
            "hotspot_05_06": setHotspot(15, 144, 275, 'imagefile0=Rear_Combi_RHD', ''),

            "hotspot_06_02": setHotspot(10, 856, 347, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_03": setHotspot(11, 783, 380, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_04": setHotspot(12, 661, 393, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_05": setHotspot(13, 522, 384, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_06": setHotspot(14, 381, 372, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_07": setHotspot(15, 266, 353, 'imagefile0=Rear_bumper_RHD', ''),
            "hotspot_06_08": setHotspot(16, 134, 641, 'imagefile0=Rear_bumper_RHD', ''),

            "hotspot_10_01": setHotspot(3, 582, 275, 'imagefile0=SAP_RHD', ''),
            "hotspot_10_02": setHotspot(4, 566, 276, 'imagefile0=SAP_RHD', ''),
            "hotspot_10_03": setHotspot(5, 543, 280, 'imagefile0=SAP_RHD', ''),
            "hotspot_10_04": setHotspot(6, 518, 280, 'imagefile0=SAP_RHD', ''),
            "hotspot_10_05": setHotspot(7, 486, 280, 'imagefile0=SAP_RHD', ''),
            "hotspot_10_06": setHotspot(8, 451, 280, 'imagefile0=SAP_RHD', ''),
            "hotspot_10_07": setHotspot(9, 418, 280, 'imagefile0=SAP_RHD', ''),
            "hotspot_10_08": setHotspot(10, 387, 280, 'imagefile0=SAP_RHD', ''),
            "hotspot_10_09": setHotspot(11, 358, 280, 'imagefile0=SAP_RHD', ''),

            "hotspot_11_01": setHotspot(14, 587, 346, 'imagefile0=Side_Step_Extend', ''),
            "hotspot_11_02": setHotspot(15, 554, 354, 'imagefile0=Side_Step_Extend', ''),
            "hotspot_11_03": setHotspot(16, 516, 360, 'imagefile0=Side_Step_Extend', ''),
            "hotspot_11_04": setHotspot(17, 483, 359, 'imagefile0=Side_Step_Extend', ''),
            "hotspot_11_05": setHotspot(18, 443, 358, 'imagefile0=Side_Step_Extend', ''),
            "hotspot_11_06": setHotspot(19, 410, 353, 'imagefile0=Side_Step_Extend', ''),
            "hotspot_11_07": setHotspot(20, 374, 344, 'imagefile0=Side_Step_Extend', ''),
            "hotspot_11_08": setHotspot(21, 354, 336, 'imagefile0=Side_Step_Extend', ''),
            "hotspot_11_09": setHotspot(22, 332, 335, 'imagefile0=Side_Step_Extend', ''),
            "hotspot_11_10": setHotspot(23, 323, 331, 'imagefile0=Side_Step_Extend', ''),
  
            "hotspot_12_01": setHotspot(1, 614, 292, 'imagefile0=Fog_Lamps', ''),
            "hotspot_12_02": setHotspot(2, 498, 305, 'imagefile0=Fog_Lamps', ''),
            "hotspot_12_03": setHotspot(3, 394, 314, 'imagefile0=Fog_Lamps', ''),
            "hotspot_12_04": setHotspot(4, 305, 320, 'imagefile0=Fog_Lamps', ''),
            "hotspot_12_05": setHotspot(5, 235, 314, 'imagefile0=Fog_Lamps', ''),

            "hotspot_08_01": setHotspot(3, 436, 393, 'imagefile0=16in_Alloy_Extended', ''),
            "hotspot_08_02": setHotspot(4, 359, 394, 'imagefile0=16in_Alloy_Extended', ''),
            "hotspot_08_03": setHotspot(5, 290, 391, 'imagefile0=16in_Alloy_Extended', ''),
            "hotspot_08_04": setHotspot(6, 235, 388, 'imagefile0=16in_Alloy_Extended', ''),
            "hotspot_08_05": setHotspot(7, 195, 381, 'imagefile0=16in_Alloy_Extended', ''),
            "hotspot_08_06": setHotspot(8, 178, 371, 'imagefile0=16in_Alloy_Extended', ''),
            "hotspot_08_07": setHotspot(9, 180, 358, 'imagefile0=16in_Alloy_Extended', ''),
            "hotspot_08_08": setHotspot(10, 201, 341, 'imagefile0=16in_Alloy_Extended', ''),
        } 
    }

    if ((getCapType().attr('data-folder') === "regular")) {
        hotspot = null;
    }

    return hotspot;

    jQuery.each(hotspots, function (key, item) {
        item.x -= 18;
        item.y -= 18;
    });
    return (setting_show_hotspot) ? hotspots : {};
}