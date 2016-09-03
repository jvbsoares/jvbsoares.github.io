$(function() {

//    var raw_img = new Image();
//    raw_img.src = 's';

    function findPos(obj){
    var current_left = 0, current_top = 0;
    if (obj.offsetParent){
        do{
            current_left += obj.offsetLeft;
            current_top += obj.offsetTop;
        }while(obj = obj.offsetParent);
        return {x: current_left, y: current_top};
    }
    return undefined;
    }

    function updateTooltip(obj, e) {
      var position = findPos(obj);
      var x = e.pageX - position.x;
      var y = e.pageY - position.y;
      var coordinate = "x=" + x + ", y=" + y;
      //var canvas = $('#hiddenCanvas').getContext('2d');
      var canvas = document.getElementById('hiddenCanvas').getContext('2d');
      //var canvas = obj.getContext('2d');
      var p = canvas.getImageData(x - 0.5, y - 0.5, 1, 1).data;
      var tooltipX = e.pageX + 16;
      var tooltipY = e.pageY + 16;
      $('div.tooltip').remove();
      $('<div class="tooltip" style="position: absolute; background-color:yellow;"></div>')
          .appendTo('body');
      $('div.tooltip').css({top: tooltipY, left: tooltipX});
      var val = (p[0] * 256 * 256 + p[1] * 256 + p[2]);
      if (e.notAvailable) {
        $('div.tooltip').html("segment " + val.toString() + " not in table (discarded)");
      }
      else {
        $('div.tooltip').html("segment " + val.toString());
      }
    };

    function handleClick(obj, e) {
      var position = findPos(obj);
      var x = e.pageX - position.x;
      var y = e.pageY - position.y;
      var coordinate = "x=" + x + ", y=" + y;
      var canvas = document.getElementById('hiddenCanvas').getContext('2d');
      var p = canvas.getImageData(x - 0.5, y - 0.5, 1, 1).data;
      var tooltipX = e.pageX + 16;
      var tooltipY = e.pageY + 16;
      $('div.tooltip').remove();
      $('<div class="tooltip" style="position: absolute; background-color:yellow;"></div>')
          .appendTo('body');
      $('div.tooltip').css({top: tooltipY, left: tooltipX});
      var val = (p[0] * 256 * 256 + p[1] * 256 + p[2]);
      $('div.tooltip').html("segment " + val.toString());
      if ($("#" + val.toString()).length) {
		  if (e.which == 1) {
			  window.open($("#" + val.toString()).attr("href"), $("#" + val.toString()).attr("target"));
		  } else if (e.which == 2) {
			  e.preventDefault();
			  window.open($("#" + val.toString()).attr("href"), '_blank');
		  }
      }
      else {
        e.notAvailable = 1;
        updateTooltip(obj, e);
      }
//      $('#theFrame')[0].contentWindow.location.href="ruleTable1.html";
//      document.getElementsByName("theFrame")[0].contentWindow.location="ruleTable1.html";
//      parent.theFrame.location = $("a#3").attr("href");
//      window.location = $("a#3").attr("href");
//      eval($("#3").attr("href"));
//      $('#3').click();
//      $('#' + val.toString()).click();
//      window.location = "ruleTable0.html#segment" + val.toString();
    };

    window.onload = function(){
        var hidden_canvas = document.getElementById('hiddenCanvas');
        var width = hidden_canvas.getAttribute("width")
        var height = hidden_canvas.getAttribute("height")
        var filename = hidden_canvas.getAttribute("src");
        var raw_img = new Image();
//        raw_img.onload = function() {
//            context.drawImage(img, 0, 0, d, d);
//        }
        raw_img.src = filename;
        var hidden_context = hidden_canvas.getContext('2d');
//        hidden_context.patternQuality = "nearest";
        hidden_context.mozImageSmoothingEnabled=false;
//        hidden_context.imageSmoothingEnabled = false;
        hidden_context.drawImage(raw_img, 0, 0, width, height);
        $('canvas').each(function(i, canvas) {
            var filename = canvas.getAttribute("src");
            var context = canvas.getContext('2d');
            var img = new Image();
            img.onload = function() {
                context.drawImage(img, 0, 0, width, height);
            }
            img.src = filename;
            $(canvas).mousemove(function(e){
					updateTooltip(this, e);
            }).mouseenter(function(e){
	            updateTooltip(this, e);
            }).mouseleave(function(e){
	            $('div.tooltip').remove();
			}).on('mouseup', function(e) {
					if( e.which != 3 ) {
						handleClick(this, e);
					}
			});
        });

    };

});

// $(document).ready(function() {
// 		$("canvas").bind("click",function(e) {
// 				alert("e = " + e.button);
// 			});
// 		$(document).bind("click",function(e){
// 				if (e.button == 1) {
// 					e.preventDefault();
// 					return false;
// 				}
// 			});
// 	});

