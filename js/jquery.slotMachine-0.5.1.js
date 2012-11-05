(function ($) {
	$.fn.slotMachine = function (options) {
		var heights = new Array();
		var count = 0;
		var machine = this;

		var settings = {
			'pxsPerSecond': 50,
			'button': $("#btn_shake"),
			'stops': []
		};

		// If options exist, lets merge them
		// with our default settings
		if (options) {
			$.extend(settings, options);
		}

		// get the CSS right
		this.attr("class", "roller_container");
		this.html('<div class="roller_container_inner">' + this.html() + '</div>');
		// double each list for a buffer when it is spinning
		this.find("ul").each(function () {
			// give it a unique ID to be able to access it later
			$(this).attr("id", "word" + count);
			var liheight = $(this).find("li:eq(0)").height();
			heights[count++] = $(this).find("li").length * liheight;
			$(this).attr("style", "");
			$(this).html($(this).html() + $(this).html());
		});

		settings.button.click(function () {
			// shake the things
			count = 0;
			machine.find("ul").each(function () {
				settings.stops[count] = false;
				setTimeout(function () {
					settings.stops[count++] = true;
				}, 3000 + (1000 * count));
				roll($(this), count++);
			});
			count = 0;
		});

		function roll(ul, count) {
			ul.animate(
				{ "top": "-" + heights[count] + "px" },
                (heights[count] / settings.pxsPerSecond) * 100.0,
                "linear",
				function () {
					ul.css("top", 0);
					if (!settings.stops[count]) {
						roll(ul, count);
					} else {
						// ease to a stop
						var num = Math.floor(Math.random() * (ul.find("li").length / 2));
						var liheight = ul.find("li:eq(0)").height();
						liheight = liheight * num;
						ul.animate({ "top": "-" + liheight + "px" }, (liheight / settings.pxsPerSecond * 0.8) * 100.0, "linear", null);
						var _x;
					}
				});
		}

		return this;
	};
})(jQuery);

