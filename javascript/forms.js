(function ($) {

	var
		arrErrors = [],
		arrForms = {};


	/**
	 * Checks email address format
	 * @param emailAddress
	 * @returns {boolean} - true = valid
	 * No regex email address validator is perfect; this one leaves wiggle room for edge cases
	 */
	function isValidEmailAddress(emailAddress) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(emailAddress);
	}


	/**
	 * Adds an error to the arrErrors array for display at the top of the page, and to a span within the label, first creating the span if it doesn't already exist
	 * @param sID - form field ID
	 * @param oLabel - label object
	 * @param sError - error text
	 */
	function validateErrorAdd(sID, oLabel, sError) {
		var
			sAtom = validateLabelID(oLabel, sID),
			oSpan = oLabel.find('span.form-error'),
			sIcon = ' <br /><span class="sr-only">Error: </span><i class="fa fa-warning" aria-hidden="true"></i> ' + sError;

		arrErrors.push('<span class="form-error-item" data-field="' + sID + '" data-label="' + sAtom + '" role="link" tabindex="-1">' + sError + '</span>');
		if (oSpan.length === 0)
			oSpan = $('<span/>', {
				html: sIcon,
				"class": "form-error"
			}).appendTo(oLabel)
		else
			oSpan.html(sIcon);
	}


	/**
	 * Verifies that a required checkbox list has an item selected
	 * @param sID - form field ID
	 */
	function validateFieldCheckbox(sID) {
		// TODO - we need an example to construct this. The flag suggestion form's structure may be an aberration
	}


	/**
	 * Verifies that a required email input field is not empty and has content that generally matches that required for a well-formed email address
	 * @param sID - form field ID
	 */
	function validateFieldEmail(sID) {
		var
			sValue = $('#' + sID).val().trim(),
			bFail = (sValue === '' || !isValidEmailAddress(sValue)),
			oLabel = $("label[for='" + sID + "']");
		if (bFail) {
			var
				sAtom = validateLabelText(oLabel.html()),
				sError = 'Enter a valid email address in the <em>' + sAtom + '&nbsp;</em> field';
			validateErrorAdd(sID, oLabel, sError);
		}
	}


	/**
	 * Verifies that a file input field has a selected file
	 * @param sID - form field ID
	 */
	function validateFieldFile(sID) {
		var
			bFail = $('#' + sID).val().trim() === '',
			oLabel = $("label[for='" + sID + "']");
		if (bFail) {
			var
				sAtom = validateLabelText(oLabel.html()),
				sError = 'Select a file for <em>' + sAtom + '&nbsp;</em>';
			validateErrorAdd(sID, oLabel, sError);
		}
	}


	/**
	 * Verifies that a generic required field (including text, textarea) is not empty
	 * @param sID - form field ID
	 */
	function validateFieldGeneric(sID) {
		var
			bFail = $('#' + sID).val().trim() === '',
			oLabel = $("label[for='" + sID + "']");
		if (bFail) {
			var
				sAtom = validateLabelText(oLabel.html()),
				sError = 'The <em>' + sAtom + '&nbsp;</em> field cannot be empty';
			validateErrorAdd(sID, oLabel, sError);
		}
	}


	/**
	 * Verifies that a required select element has an item selected
	 * TODO Need an example or two to fine-tune this
	 * TODO Currently assumes that the initial selection has no text, which may not be correct in all cases
	 * TODO Could check for a selected attribute or, if there's none, check against the first option value
	 * @param sID - form field ID
	 */
	function validateFieldSelect(sID) {
		var
			bFail = $('#' + sID).val() === '',
			oLabel = $("label[for='" + sID + "']");
		if (bFail) {
			var
				sAtom = validateLabelText(oLabel.html()),
				sError = 'Select an option for the <em>' + sAtom + '&nbsp;</em> field';
			validateErrorAdd(sID, oLabel, sError);
		}
	}


	/**
	 * Iterates the arrForms[sForm] entries and verifies that each one is populated
	 * @param sForm - name of the form
	 * @returns {boolean} - true = form is valid
	 */
	function validateForm(sForm) {
		// Clear existing errors
		arrErrors = [];
		$(".form-error").html("");

		// Iterate through required fields
		$.each(arrForms[sForm], function (key, value) {
			switch (value) {
				case 'checkbox':
					validateFieldCheckbox(key);
					break;
				case 'email':
					validateFieldEmail(key);
					break;
				case 'file':
					validateFieldFile(key);
					break;
				// TODO We may also require a radio option
				case 'select':
					validateFieldSelect(key);
					break;
				// Default includes input[text, number, etc] and textarea
				default:
					validateFieldGeneric(key);
			}
		});

		// Display any errors and return
		validateFormShowErrors(sForm);
		return (arrErrors.length === 0);
	}


	/**
	 *  Displays any found errors in a div at the top of the form, creating the div if it doesn't already exist
	 * @param sForm - form name
	 */
	function validateFormShowErrors(sForm) {
		var
			oCallout = $('#' + sForm).find(".messages-block.bad-msg.callout-alert").first();

		oCallout.empty();

		// If there are errors ...
		if (arrErrors.length > 0) {
			var
				sPlural = (arrErrors.length === 1) ? '' : 's',
				sMsg = '<h2 tabindex="-1">Please correct the following error' + sPlural + ' and try again:</h2><ul>';

			jQuery.each(arrErrors, function (index, item) {
				sMsg += '<li>' + item + '</li>';
			});
			sMsg += '</ul>';

			// Add the errors to the callout div, creating it if it doesn't already exist
			if (oCallout.length) {
				oCallout.html(sMsg);
			}
			else
				oCallout = $('<div/>', {
					html: sMsg,
					"class": "messages-block bad-msg callout-alert"
				}).prependTo('#' + sForm);

			// Scroll the errors into view and give then focus
			var offset = oCallout.offset();
			$('html, body').animate({
				scrollTop: offset.top,
				scrollLeft: offset.left
			});
			oCallout.find('h2').focus();
		}
	}


	/**
	 * 1. Parses all forms on the page other than Search and Inline Feedback
	 * 2. Removes native HTML5 browser form validation
	 * 3. Removes Silverstripe javascript validation
	 * 4. Iterates form fields, adding required fields to the arrForms[sForm] object where sForm is the name of the form, and removing the required attributes
	 * 5. Intercepts form submission to apply custom validation
	 */
	function validateInit() {
		// Remove HTML5 browser validation
		$("form").each(function (iIndex) {
			// For the moment this functionality deliberately omits the search form and the inline feedback form
			if ($(this).attr("id") !== 'search-form' && $(this).attr("id") !== 'Form_InlineFeedbackForm') {
				// Remove browser form validation
				var sForm = $(this).attr("id");
				$(this).noValidate = true;

				// Remove Silverstripe (browser) form validation; store required fields and error messages
				arrForms[sForm] = {};
				$(this).find(":input").each(function () {
					if ($(this).attr('required') === "required") {
						$(this).removeAttr('required');
						arrForms[sForm][$(this).attr("id")] = $(this).attr('type') || $(this).prop("tagName").toLowerCase();
					}
				});

				/*  -----------------------------------------------------------
				 We should be able to intercept and suppress form validation here.
				 Unfortunately Silverstripe forms don't cooperate; instead we must intercept each ":submit" element.
				 The coming revision of Silverstripe forms may let us reinstate this call and remove the ones below.
				 -----------------------------------------------------------
				 $(this).submit(function(event){
				 return validateForm($(this));
				 });
				 */

				// Handle form :submit elements - there may be more than one
				$(this).find(":submit").each(function (iIndex) {
					$(this).attr('formnovalidate', 'true');

					// Do our own validation when the form is submitted - eventually it would nice to remove this
					$(this).on("click", function (event) {
						return validateForm(sForm);
					});
				});
			}
		});
	}


	/**
	 * Retrieves or creates an ID for a form field label
	 * @param oLabel - label object
	 * @param sField - ID of field the label is for
	 * @returns {*} - the label ID
	 */
	function validateLabelID(oLabel, sField) {
		var
			sID = oLabel.attr("id");
		//oAnchor = oLabel.find("a");

		// If the label doesn't have an ID, we add one
		if (typeof sID === "undefined") {
			sID = sField + '_' + 'UrlAtomLabel';
			oLabel.attr("id", sID);
		}

		return sID;
	}


	/**
	 * Returns the field name from the text of the field's label
	 * @param sText - innerHTML of field label
	 * @returns {*} - the trimmed first atom of the label, stopping at nested HTML or a bracket - the latter is usually "(required)"
	 */
	function validateLabelText(sText) {
		var
			arrText = sText.split('('),
			arrAtom = arrText[0].split('<');

		return arrAtom[0].trim();
	}


	/**
	 * Called when an error listing is clicked in the summary at the top of the form
	 * Scrolls the label into view and sets focus to the corresponding field
	 * @param oLink
	 */
	function validateScrollToError(oLink) {
		var
			sField = $(oLink).data("field"),
			sLabel = $(oLink).data("label"),
			offset = $("#" + sLabel).offset();

		$('html, body').animate({
			scrollTop: offset.top,
			scrollLeft: offset.left
		});
		$("#" + sField).focus();
	}

	var counterImpl = function (event) {
		var $event = $(event.target);

		// get the textarea. We'd generally expect it's the event target itself.
		var $textarea = $event.closest('textarea');
		var limit = parseInt($textarea.attr('data-max-words'), 10);
		if (!limit) {
			limit = 200;
		}

		// get it's container
		var $textareaContainer = $textarea.closest('.field');

		// the label is the next component, unless that next component doesn't have the 
		// word-count class.
		var $countLabel = $textareaContainer.next();
		if (!$countLabel.hasClass('word-count')) {
			return;
		}

		var value = $textarea.val();

		var wordCount;
		if (value.length == 0) {
			wordCount = 0;
		} else {
			// actually count the words.
			var regex = /\s+/gi;
			wordCount = value.trim().replace(regex, ' ').split(' ').length;
		}

		var color = 'black';
		if (wordCount > limit) {
			color = 'red';
		}

		var html = '<span style="color:' + color + '">' + wordCount + '</span> words (' + limit + ' max)';
		$countLabel.html(html);
	};

	// The counter function is used to update the counter. The event target is used to determine
	// which textarea and counter update are to be used, which allows for multiple textareas
	// on the form. counterImpl is what does the work, but counter() rate limits it because 
	// on a keypress multiple events fire, and counterImpl() is slow enough it is noticeable.
	// pending maps textarea ID values to whether they have an outstanding request.
	var pending = {};
	var counter = function (event) {
		// if a counter update is already pending, discard this request.
		if (pending[event.target.id]) {
			return;
		}

		// flag a request as pending.
		pending[event.target.id] = true;
		setTimeout(function () {
			// actually update the counter
			counterImpl(event);

			// and we're not pending anymore. The next counter event will get handled.
			pending[event.target.id] = false;
		}, 250);
	};

	$(document).ready(function () {

		validateInit();

		$(document).on("click", ".form-error-item", function () {
			validateScrollToError(this);
		});

		$(document).on("keypress", ".form-error-item", function () {
			validateScrollToError(this);
		});

		$('#count').click(counter);
		$('textarea').change(counter);
		$('textarea').keydown(counter);
		$('textarea').keypress(counter);
		$('textarea').keyup(counter);
		$('textarea').blur(counter);
		$('textarea').focus(counter);

		// If any textareas have values on load, we need to call counter with a fake
		// event object that has the textarea as a target.
		$('textarea').each(function (i, el) {
			counter({target: el});
		});
	});

})(jQuery);
