$(document).ready(function(){
var canvas = $('#canvas')[0];
var ctx = canvas.getContext("2d");
var rect = {};
var drag = false;
var imageObj = null;
var startX=0, startY=0, w=0, h=0;

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
        ctx.clearRect(0, 0, 500, 500);
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

function post_coordinates(startX, startY, w, h){
    var rect = {
        'startX': 10,
        'startY': 20,
        'w': 30,
        'h': 40
    };
    let csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
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
        data: {'rect': JSON.stringify(rect)},
        dataType: 'json',
        success:function(data){
            console.log('success');
        },
        error:function (xhr, textStatus, thrownError){
            console.log(thrownError);
        }
    });
}

$('button').click(function(e) {
    post_coordinates(rect.startX, rect.startY, rect.w, rect.h);
});

init();
});//document ready!
