moveable = new Moveable(document.querySelector("#mainPage"), {
    target: [],
    draggable: true,
    scalable: false,
    resizable: true,
    rotatable: false,
    snappable: false,
    snapCenter: false,
});

let targets = [];
const helper = MoveableHelper.create();

moveable
    .on("dragStart", helper.onDragStart)
    .on("drag", helper.onDrag)
    .on("dragGroupStart", helper.onDragGroupStart)
    .on("dragGroup", helper.onDragGroup)
    .on("resizeStart", helper.onResizeStart)
    .on("resize", helper.onResize)
    .on("resizeGroupStart", helper.onResizeGroupStart)
    .on("resizeGroup", helper.onResizeGroup)

$("#mainPage").on("dragStart", (e) => {
    const target = e.inputEvent.target;
    if (
      target.nodeName === "A" ||
      moveable.isMoveableElement(target) ||
      targets.some((t) => t === target || t.contains(target))
    ) {
      e.stop();
    }
});

moveable.on("drag", ({
    target, transform,
    left, top, right, bottom,
    beforeDelta, beforeDist, delta, dist,
    clientX, clientY,
}) => {
    // console.log("onDrag left, top", left, top);
    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
}).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
    var left = target.style.left;
    var top = target.style.top;
    var inputLeft = $("input[name='left']")
    var inputTop = $("input[name='top']")
    if(top && inputTop){
        var value = top.substring(0, top.length-2)
        $(inputTop).val(value)

        selectedObj.style['top'] = value
        changeElementStyle(selectedObj)
    }
    if(left && inputLeft){
        var value = left.substring(0, left.length-2)
        $(inputLeft).val(value)

        selectedObj.style['left'] = value
        changeElementStyle(selectedObj)
    }
}).on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
    var width = target.style.width;
    var height = target.style.height;
    var inputWidth = $("input[name='width']")
    var inputHeight = $("input[name='height']")
    if(width && inputWidth){
        var value = width.substring(0, width.length-2)
        $(inputWidth).val(value)

        selectedObj.style['width'] = value
        changeElementStyle(selectedObj)
    }
    if(height && inputHeight){
        var value = height.substring(0, height.length-2)
        $(inputHeight).val(value)

        selectedObj.style['height'] = value
        changeElementStyle(selectedObj)
    }
});

function addMoveable(obj, isResizable=true) {
    obj.on("mousedown", (event) => {
        event.currentTarget.style.cursor = "all-scroll";
    })
    .on("mouseup", (event) => {
        event.currentTarget.style.cursor = "unset";
    })
    .on("click", (event) => {
        const target = event.currentTarget;
        if (moveable.target != target) {
            moveable.target = target;
            moveable.resizable = isResizable;
        }
        else {
            moveable.target = null;
        }
    });
}


function addDraggable(obj, isResizable = true, droppable = false) {
    let childList = [];
    if (isResizable) {
        obj.resizable({
            resize: function (event, ui) {
                console.log("orj bn")
                ui.size.height = Math.round(ui.size.height / 30) * 30;
            }
        });
        obj.resizable()
    }

    if (!droppable) {
        obj.draggable({
            start: function (event, ui) {
                $(this).css("cursor", "all-scroll");
            },
            stop: function (event, ui) {
                $(this).css("cursor", "unset");
            }
        });
    }

    if (droppable) {
        obj.draggable({
            drag: function (event, ui) {
                if (childList.length > 0) {
                    var dx = ui.position.left - ui.originalPosition.left;
                    var dy = ui.position.top - ui.originalPosition.top;
                    childList.forEach(function (child) {
                        var el = child.element;
                        var posX = child.position.left + dx;
                        var posY = child.position.top + dy;
                        $(el).css({
                            left: posX + "px",
                            top: posY + "px"
                        });
                    });
                }
            },
            stop: function (event, ui) {
                if (childList.length > 0) {
                    var dx = ui.position.left - ui.originalPosition.left;
                    var dy = ui.position.top - ui.originalPosition.top;
                    childList.forEach(function (child) {
                        var el = child.element;
                        var posX = child.position.left + dx;
                        var posY = child.position.top + dy;
                        $(el).css({
                            left: posX + "px",
                            top: posY + "px"
                        });
                        child.position.left = posX;
                        child.position.top = posY;
                    });
                }
            }
        });

        obj.droppable({
            drop: function (event, ui) {
                var el = ui.draggable[0];
                var position = ui.position;
                childList.push({ element: el, position: position });
                console.log("drop hiigdlee");
            },
            out: function (event, ui) {
                var outId = ui.draggable[0].id;
                childList = childList.filter(item => item.element.id !== outId);
            }
        });
    }
}
