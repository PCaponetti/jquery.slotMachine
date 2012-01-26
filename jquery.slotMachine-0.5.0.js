var pxPerSecond = 50;
var heights = new Array();
var stops = new Array();
var count = 0;

(function ($) {
	$.fn.slotMachine = function (options) {

		var settings = {
			'pxsPerSecond'         : 50,
			'button'			   : $("#btn_shake")
		};

		// If options exist, lets merge them
		// with our default settings
		if ( options ) { 
			$.extend( settings, options );
		}

		this.find("ul").each(function (intIndex) {
			// give it a unique ID to be able to access it later
			$(this).attr("id", "word" + count);
			var liheight = $(this).find("li:eq(0)").height();
			heights[count++] = $(this).find("li").length * liheight;
			$(this).attr("style", "");
			$(this).html($(this).html() + $(this).html());
		});

		settings.button.click(function () {
			// shake the things
			var count = 0;
			$("#roller_container ul").each(function (intIndex) {
				var liID = $(this).attr("id");
				stops[count] = false;
				setTimeout("stops[" + count + "] = true", 3000 + (1000 * count));
				roll(liID, count, settings.pxsPerSecond);
				count++;
			});
		});

		return this;
	};
})(jQuery);

function roll(liID, count, pxsPerSecond) {
	$("#" + liID).animate({ "top": "-" + heights[count] + "px" },
                (heights[count] / pxsPerSecond) * 100.0,
                "linear", function () {
                	$("#" + liID).css("top", 0);
                	if (!stops[count]) {
                		roll(liID, count, pxsPerSecond);
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
        (liheight / (pxPerSecond * 0.8)) * 100.0, "linear", null);
}
