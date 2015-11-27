$(document).ready(function () {

	//drop a search bar down on mobile when the search icon is clicked
	$(document).on("click", ".mobile-search-toggle", function (e) {

		var headerSearch = $('#header-search');
		var searchToggle = $('.mobile-search-toggle');

		var homepage = $('.content').hasClass('home-content');

		if (searchToggle.hasClass('active')) {
			searchToggle.attr('aria-label', 'Show search');
		} else {
			searchToggle.attr('aria-label', 'Hide search');
		}

		if (homepage) {
			if ($('.feature-image').hasClass('show-search')) {
				$('.feature-image').removeClass('show-search');
				searchToggle.removeClass('active');
			} else {
				$('.feature-image').addClass('show-search');
				searchToggle.addClass('active');
			}
			//toggle search controls
			if (headerSearch.hasClass('active')) {
				headerSearch.removeClass('active');
			} else {
				headerSearch.addClass('active');
			}
		}
		else {
			if ($('.banner-link').hasClass('show-search')) {
				$('.banner-link').removeClass('show-search');
				searchToggle.removeClass('active');
			} else {
				$('.banner-link').addClass('show-search');
				searchToggle.addClass('active');
			}

			//toggle search controls
			if (headerSearch.hasClass('active')) {
				headerSearch.removeClass('active');
				$('.banner-link').removeClass('show-search');
			} else {
				headerSearch.addClass('active');
				$('.banner-link').addClass('show-search');
			}
		}


		e.preventDefault();
	});

	//copy the value in the main search input to the mobile search input
	var mainSearchTerm = $('#searchterm2').val();
	$('#searchterm').val(mainSearchTerm);


	/*------- Search field placeholders -------*/

	// when page is loaded
	if ($('.header-search-form #searchterm').val()) {
		$('.header-search-form .search-label').addClass('entered');
	} else {
		$('.header-search-form .search-label').removeClass('entered');
	}

	//when exiting search field (header)
	$(document).on("blur", "#searchterm", function (e) {
		if ($('.header-search-form #search-form #searchterm').val()) {
			$('.header-search-form #search-form .search-label').addClass('entered');
		} else {
			$('.header-search-form #search-form .search-label').removeClass('entered');
		}
		e.preventDefault();
	});

	//when exiting search field (search page)
	$(document).on("blur", "#searchterm2", function (e) {
		if ($('#search-form2 #searchterm2').val()) {
			$('#search-form2 .search-label').addClass('entered');
		} else {
			$('#search-form2 .search-label').removeClass('entered');
			$('#search-form2 .search-label').text('Search govt.nz');
		}
		e.preventDefault();
	});

});
