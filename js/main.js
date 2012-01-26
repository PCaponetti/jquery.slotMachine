var pxPerSecond = 50;
var heights = new Array();
var stops = new Array();

$(document).ready(function () {
	if ($("#roller_container").length > 0) {
		setTimeout("setup()", 2000);
	}
});

//function log(v) {
//	$('#log').append(v + "<br />");
//}

function setup() {

	// add the style atribute to each ul and double it up
	// for buffer space when spinning
	var count = 0;
	$("#roller_container ul").each(function (intIndex) {
		var liheight = $(this).find("li:eq(0)").height();
		heights[count++] = $(this).find("li").length * liheight;
		$(this).attr("style", "");
		$(this).html($(this).html() + $(this).html());
	});

	$("#btn_shake").click(function () {
		// shake the things
		var count = 0;
		$("#roller_container ul").each(function (intIndex) {
			var liID = $(this).attr("id");
			stops[count] = false;
			setTimeout("stops[" + count + "] = true", 3000 + (1000 * count));
			roll(liID, count);
			count++;
		});
	});

}
function roll(liID, count) {
	$("#" + liID).animate({ "top": "-" + heights[count] + "px" },
                (heights[count] / pxPerSecond) * 100.0,
                "linear", function () {
                	$("#" + liID).css("top", 0);
                	if (!stops[count]) {
//                		log($("#output").text() + ", rerolling " + count + ", " + liID);
                		roll(liID, count);
                	} else {
                		easeToaStop(liID);
                	}
                });
}
function easeToaStop(liID) {
	var num = Math.floor(Math.random() * ($("#" + liID + " li").length / 2));
	var liheight = $("#" + liID).find("li:eq(0)").height();
//	log($("#output").html() + liID + " - length: " + ($("#" + liID + " li").length / 2) + " num: " + num + ", liheight: " + liheight + "<br />");
	liheight = liheight * num;
	$("#" + liID).animate({ "marginTop": "-" + liheight + "px" },
        (liheight / (pxPerSecond * 0.8)) * 100.0, "linear", function () {
//        	log(liID + " is done");
        });
}
