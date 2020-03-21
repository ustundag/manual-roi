$(document).ready(function(){
var canvas = $('canvas')[0];
var ctx = canvas.getContext("2d");
var rect = {};
var drag = false;
var imageObj = null;

function init() {
    imageObj = new Image();
    imageObj.onload = function () { ctx.drawImage(imageObj, 0, 0); };
    imageObj.src = $('img').attr('src');
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup'  , mouseUp  , false);
    canvas.addEventListener('mousemove', mouseMove, false);
}

// mouse listeners
function mouseDown(e) {
    rect.startX = e.pageX - this.offsetLeft;
    rect.startY = e.pageY - this.offsetTop;
    drag = true;
}
function mouseUp() { drag = false; }
function mouseMove(e) {
    if (drag) {
        ctx.clearRect(0, 0, 600, 600);
        ctx.lineWidth = '3';
        ctx.drawImage(imageObj, 0, 0);
        rect.w = (e.pageX - this.offsetLeft) - rect.startX;
        rect.h = (e.pageY - this.offsetTop) - rect.startY;
        ctx.strokeStyle = 'red';
        ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
        startX = rect.startX;
        startY = rect.startY;
        w = rect.w;
        h = rect.h;
    }
}

function print_preds(objects) {
    // objects = {'0': "37.99%: lynx", '1': "22.35%: Egyptian_cat", '2': "13.46%: tiger_cat", '3': "12.88%: tabby", '4': "5.93%: cougar"};
    // cnn_model provides the rank-5 predictions
    $('#object_first').text(objects['0']);
    // loop over json object to print other 4 predictions
    let id,p ='';
    for (let i=1; i<5; i++) {
        id = '#object_other_'.concat(i.toString());
        p  = objects[i.toString()];
        $(id).text(p);
    }
}

// TODO error thrown in case rectangle-drawing direction is not across the south-east
function post_coordinates(startX, startY, w, h) {
    var rect = {
        'startX': startX,
        'startY': startY,
        'w': w,
        'h': h
    };
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            // if not safe, set csrf_token
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    $.ajax({
        url:"",
        type: "POST",
        headers: [{name: 'X-CSRFToken', value: '{{ csrf_token }}'}],
        data: {
            'img_src': JSON.stringify($('img').attr('src')),
            'rect': JSON.stringify(rect)
        },
        dataType: 'json',
        success:function(objects){
            console.log('success');
            print_preds(objects)
        },
        error:function (xhr, textStatus, thrownError){
            console.log(thrownError);
        }
    });
}

$('button').click(function(e) {
    console.log('width: ', rect.w, ', height: ', rect.h)
    console.log((rect.w && rect.h))
    if (rect.w && rect.h) {
        console.log('Recognition process has started...')
        console.log('width: ', rect.w, ', height: ', rect.h)
        console.log((rect.w && rect.h))
        post_coordinates(rect.startX, rect.startY, rect.w, rect.h);
    }
    else {
        console.log('Width and height values are NOT convenient!')
        console.log('width: ', rect.w, ', height: ', rect.h)
        console.log((rect.w && rect.h))
    }
});

init();
});//document ready!
