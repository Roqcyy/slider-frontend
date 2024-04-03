
var choosedFile = null;
var choosedResult = null;
var downloadFile = null;
var downloadResult = null;
let lastColor = {};
let colorPickerElement = null;
let colorPickerButton = null;

$(function () {
    if(selectedObj) {
        changeSidebarElement();
        $("#spectrumColor").spectrum({
            containerClassName: "spectrum_theme",
            type: "flat",
            hideAfterPaletteSelect: true,
            showInitial: true,
            showButtons: false,
            allowEmpty: false,
            showPalette: true,
            showInput: true,
            showAlpha: true,
            preferredFormat: "hex",
            // color: ( colorPickerElement.value ? ""+ colorPickerElement.value : "#000000"),
            // color: "#000000",
            palette: [
                ['rgb(0,0,0)', 'rgb(255,255,255)', 'rgb(255,0,0)', 'rgb(255,192,0)', 'rgb(255,255,0)', 'rgb(146,208,80)', 'rgb(0,176,240)', 'rgb(38,89,255)'],
            ],
            showSelectionPalette: true,
            selectionPalette: ['rgb(209,192,165)', 'rgb(241,159,194)', 'rgb(241,159,194)', 'rgb(170,137,190)', 'rgb(137,171,218)', 'rgb(133,204,201)', 'rgb(49,177,108)', 'rgb(179,212,101)', 'rgb(236,104,65)'],
            maxSelectionSize: 8,
            localStorageKey: "selpubCreatorSpectrum",
            change: changeColor,
            move: changeColor,

        });
        $("#spectrumColorTwo").spectrum({
            containerClassName: "spectrum_theme",
            type: "flat",
            hideAfterPaletteSelect: true,
            showInitial: true,
            showButtons: false,
            allowEmpty: false,
            showPalette: true,
            showInput: true,
            showAlpha: true,
            preferredFormat: "hex",
            // color: ( colorPickerElement.value ? ""+ colorPickerElement.value : "#000000"),
            // color: "#000000",
            palette: [
                ['rgb(0,0,0)', 'rgb(255,255,255)', 'rgb(255,0,0)', 'rgb(255,192,0)', 'rgb(255,255,0)', 'rgb(146,208,80)', 'rgb(0,176,240)', 'rgb(38,89,255)'],
            ],
            showSelectionPalette: true,
            selectionPalette: ['rgb(209,192,165)', 'rgb(241,159,194)', 'rgb(241,159,194)', 'rgb(170,137,190)', 'rgb(137,171,218)', 'rgb(133,204,201)', 'rgb(49,177,108)', 'rgb(179,212,101)', 'rgb(236,104,65)'],
            maxSelectionSize: 8,
            localStorageKey: "selpubCreatorSpectrum",
            change: changeColor2,
            move: changeColor2,
        });
    }
});

$(".panel_setting_open").on("click", function (e) {
    var target = e.currentTarget.closest(".panel");
    $(target).toggleClass("active");
});

$(".select_toggle").on("click", (e) => {
    var target = e.currentTarget;
    $(".select_wrap .select_toggle").removeClass("on");
    $(".select_wrap .select_list").removeClass("show");
    $(target).addClass("on");
    $(target.nextElementSibling).toggleClass("show");
});

$(".select_color_picker").on("click", function (e) {
    colorPickerButton = e.currentTarget;
    colorPickerElement = colorPickerButton.firstElementChild;

    var type = $(colorPickerButton).attr('data')
    var color = selectedObj.style[type]
    if(type) {
        $("#spectrumColorTwo").spectrum("set", color ? color : "#70CCEB");
    }
    $(".spectrum_box").show();
});

$(".spectrum_box.extend").on("mouseleave", function (e) {
    $(".spectrum_box.extend").hide();
});


$("input[name='borderWidth']").on("keyup", function (e) {
    var value = e.target.value;
    if (checkNumber(value) !== false) {
        $('#'+selectedObj.id+"-background").css('border-width', value+'px');

        selectedObj.style['borderWidth'] = value
        changeElementStyle(selectedObj)
    }
});

$("input[name='shadowWidth']").on("keyup", function (e) {
    var value = e.target.value;

    if (checkNumber(value) !== false) {
        $('#'+selectedObj.id+"-background").css('box-shadow', "10px 10px 5px #fff !important;");

        selectedObj.style['shadowWidth'] = value
        changeElementStyle(selectedObj)
    }
});

$("input[name='borderRadius']").on("keyup", function (e) {
    var value = e.target.value;
    if (checkNumber(value) !== false) {
        $('#'+selectedObj.id+"-background").css('border-radius', value+'px');

        selectedObj.style['borderRadius'] = value
        changeElementStyle(selectedObj)
    }
});
$("input[name='height']").on("keyup", function (e) {
    var value = e.target.value;
    if (checkNumber(value) !== false) {
        $('#'+selectedObj.id).css('height', value+'px');

        selectedObj.style['height'] = value
        changeElementStyle(selectedObj)
    }
});
$("input[name='width']").on("keyup", function (e) {
    var value = e.target.value;
    if (checkNumber(value) !== false) {
        $('#'+selectedObj.id).css('width', value+'px');

        selectedObj.style['width'] = value
        changeElementStyle(selectedObj)
    }
});

$("input[name='left']").on("keyup", function (e) {
    var value = e.target.value;
    if (checkNumber(value) !== false) {
        $('#'+selectedObj.id).css('left', value+'px');

        selectedObj.style['left'] = value
        changeElementStyle(selectedObj)
    }
});
$("input[name='top']").on("keyup", function (e) {
    var value = e.target.value;
    if (checkNumber(value) !== false) {
        $('#'+selectedObj.id).css('top', value+'px');

        selectedObj.style['top'] = value
        changeElementStyle(selectedObj)
    }
});
$("input[name='clickEvent']").on("change", function (e) {
    var value = e.target.checked;
    selectedObj.style['clickEvent'] = value
    if(value)
    {
        $("#clickEventIcon").removeClass("blind");
        $('#'+selectedObj.id + ' .clickEvent').css("display", "flex");
    }
    else
    {
        $("#clickEventIcon").addClass("blind");
        $('#'+selectedObj.id + ' .clickEvent').css("display", "none");
        $('#'+selectedObj.id + '-background').removeClass('blind');
        $('#'+selectedObj.id + ' .cover_icon' ).removeClass("blind");
        $("input[name='iconShow']").prop("checked", false);
    }

    changeElementStyle(selectedObj)
});
$("input[name='iconShow']").on("change", function (e) {
    var value = e.target.checked;
    selectedObj.style['iconShow'] = value
    if(value)
    {
        $('#'+selectedObj.id + ' .cover_icon' ).addClass("blind");
    }
    else
    {
        $('#'+selectedObj.id + ' .cover_icon' ).removeClass("blind");
    }
    changeElementStyle(selectedObj)
});


function onChoosedFile(){
    if($('input[name=buttonStyleType]:checked').val() === 'image') {
        $("input[name='fileChooser']").click()
    }
}

function changeChoosedFile(result) {
    choosedResult = result;
    var button = $('#'+selectedObj.id).find('button')
    $(button[0]).css("background-image", "url(" + result + ")")
    $("input[name='fileChooserName']").val(choosedFile.name)

    var data = {
        backType: $("input[name='buttonStyleType']:checked").val(),
        backFileName: choosedFile.name,
        backFile: choosedFile,
    }
    selectedObj.datas = {...selectedObj.datas, ...data}
    changeElementData(selectedObj)
}

function changeStyle(style, value) {
    $('#'+selectedObj.id+" span").css(style, value);
}

function changeClass(name) {
    $('#'+selectedObj.id+" span").toggleClass(name);
}



function changeColor(color) {
    var prmColor;
    try {
        prmColor = color.toHexString(); // #ff0000
        if($.isEmptyObject(lastColor ) || !lastColor[selectedObj.id]){
            prmColor = color2Hex(prmColor)
            lastColor[selectedObj.id] = prmColor
            // changeStyle("color", prmColor);
            $('#'+selectedObj.id+"-background").css('background-color', prmColor);

            selectedObj.style['backgroundColor'] = prmColor
            changeElementStyle(selectedObj)
        }
        else if(lastColor[selectedObj.id] && lastColor[selectedObj.id] !== prmColor) {
            prmColor = color2Hex(prmColor)
            lastColor[selectedObj.id] = prmColor
            //changeStyle("color", prmColor);
            $('#'+selectedObj.id+"-background").css('background-color', prmColor);

            selectedObj.style['backgroundColor'] = prmColor
            changeElementStyle(selectedObj)
        }
    }
    catch(err) {
        // console.log(err);
        return false;
    }
}
function changeColor2(color) {
    var prmColor;
    try {
        prmColor = color.toHexString(); // #ff0000
        // console.log('color',colorPickerButton)
        if(($.isEmptyObject(lastColor ) || !lastColor[selectedObj.id]) ||
            (lastColor[selectedObj.id] && lastColor[selectedObj.id] !== prmColor)
        ){
            var type = $(colorPickerButton).attr('data')
            if(type) {
                if(type === 'borderColor') {
                    $('#'+selectedObj.id+"-background").css('border-color', prmColor);
                }

                selectedObj.style[type] = prmColor
                changeElementStyle(selectedObj)
            }
        }
    }
    catch(err) {
        return false;
    }
}

function changeSidebarElement() {
    // console.log(selectedObj)
    lastColor = {}
    var left = selectedObj.style.left ? selectedObj.style.left : 0
    var top = selectedObj.style.top ? selectedObj.style.top : 0
    var width = selectedObj.style.width ? selectedObj.style.width : 0
    var height = selectedObj.style.height ? selectedObj.style.height : 0
    var backgroundColor = selectedObj.style.backgroundColor ? selectedObj.style.backgroundColor : "#000000"
    var borderColor = selectedObj.style.borderColor ? selectedObj.style.borderColor : '#70CCEB'
    var borderWidth = selectedObj.style.borderWidth ? selectedObj.style.borderWidth : 0
    var shadowWidth = selectedObj.style.shadowWidth ? selectedObj.style.shadowWidth : 0
    var borderRadius = selectedObj.style.borderRadius ? selectedObj.style.borderRadius : 20
    var clickEvent = selectedObj.style.clickEvent ? selectedObj.style.clickEvent : false;
    var iconShow = selectedObj.style.iconShow ? selectedObj.style.iconShow : false;

    var datas = selectedObj.datas


    $("input[name='left']").val(left)
    $("input[name='top']").val(top)
    $("input[name='width']").val(width)
    $("input[name='height']").val(height)
    $("input[name='backgroundColor']").val(backgroundColor)

    $("span[data='borderColor']").find("path.active_color")[0].style.fill = borderColor;
    $("input[name='borderWidth']").val(borderWidth)
    $("input[name='shadowWidth']").val(shadowWidth)
    $("input[name='borderRadius']").val(borderRadius)

    $("input[name='clickEvent']").prop("checked",clickEvent);
    $("input[name='iconShow']").prop("checked", iconShow);

    if(clickEvent){
        $("#clickEventIcon").removeClass("blind");
        $('#' + selectedObj.id + ' .clickEvent').css("display", "flex");
    }
    else
    {
        $("#clickEventIcon").addClass("blind");
        $('#'+selectedObj.id + ' .clickEvent').css("display", "none");
    }
    if(iconShow)
    {
        $('#'+selectedObj.id + ' .cover_icon' ).addClass("blind")
    }
    else
    {
        $('#'+selectedObj.id + ' .cover_icon' ).removeClass("blind")
    }

}
