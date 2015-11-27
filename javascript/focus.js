(function ($) {

	$(document).ready(function () {

		$("a, button, .btn, details summary, input").click(function () {
			$("a, button, .btn, details summary, input").removeClass("selected");
			$(".info-section a .inner").removeClass("selected");
			$(this).addClass("selected");
		});

		$(".info-section a").click(function () {
			$("a, button, .btn, details summary, input").removeClass("selected");
			$(".info-section a .inner").removeClass("selected");
			$(this).find(".inner").addClass("selected");
		});


		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++)
		{
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == 'comments')
			{
				if (sParameterName[1] == 'true') {
					setTimeout(function() {
						$('body').animate({
							scrollTop: $('#comments').offset().top
						}, 500);
					}, 200);
				}

			}
		}
	});

})(jQuery);
