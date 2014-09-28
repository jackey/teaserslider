(function ($) {
	"use strict;"

	$.fn.teaserslider = function (options) {
		var default_values = {
			speed: 1 * 1000, // 动画时间 默认1s
			autoplay: true, // 是否自动播放
			autotime: 1* 1500, // 自动播放循环时间
			navigation: false, // 是否有导航
			easing: "swing",
		};

		$.extend(default_values, options);
		var container = $(this),
		items = $(".slider-items", container),
		autoplay_handler = null;

		items.width(100 * $(".slider-item", items).size() + "%");

		// Next button
		var next_btn = $("<div class='btn next-btn'>Next</div>"),
		// Previous button
			prev_btn = $("<div class='btn prev-btn'>Prev</div>");
		container.append(next_btn).append(prev_btn);

		// Slide next
		$(next_btn).click(function () {
			if (autoplay_handler) {
				clearInterval(autoplay_handler);
				autoplay_handler = false;
			}
			var item_w = $(".slider-item", items).width();
			var index = container.data("index");
			if (typeof index == "undefined") index = 0;
			// It's last item
			if (parseInt(index) + 1 + 1 > $(".slider-item", items).size()) {
				return;
			}

			index += 1;
			container.data("index", index);

			items.animate({
				"margin-left": parseInt(- (index * item_w)) + "px",
			}, default_values["speed"]);
		});

		// Slide Prev
		$(prev_btn).click(function () {
			if (autoplay_handler) {
				clearInterval(autoplay_handler);
				autoplay_handler = false;
			}
			var item_w = $(".slider-item", items).width();
			var index = container.data("index");
			if (typeof index == "undefined") index = 0;
			// It's last item
			if (parseInt(index) < 1 ) {
				return;
			}

			index -= 1;
			container.data("index", index);

			items.animate({
				"margin-left": parseInt(- (index * item_w)) + "px",
			}, default_values["speed"]);
		});

		// 循环播放
		if (default_values["autoplay"]) {
			function auto_play_fn () {
				var item_w = $(".slider-item", items).width(),
					index = container.data("index");
				if (typeof index == "undefined") index = 0;
				if (parseInt(index) + 1 + 1 > $(".slider-item", items).size()) {
					index = -1;
				}

				index += 1;
				container.data("index", index);
				items.animate({
					"margin-left": parseInt(- (index * item_w)) + "px",
				}, default_values["speed"]);
			}
			autoplay_handler = setInterval(auto_play_fn, default_values['autotime']);

			setInterval(function (){
				if (autoplay_handler == false) {
					autoplay_handler = setInterval(auto_play_fn, default_values['autotime']);
				}
			}, 2000);

		}
	}
})(jQuery);






























